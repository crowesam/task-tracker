// hooks/useTaskManager.ts

"use client"
import { useCallback, useEffect, useState } from "react";
import { fetchTasks as fetchAPI, createTask as createAPI, updateTask, deleteTask as deleteAPI } from "@/lib/api";
import { NotificationManager } from "@/utils/notifications";
import { getDueDateStatus } from "@/utils/dateHelpers";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  category: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string | null;
  order: number;
}

export interface DashboardUser {
  displayName?: string | null;
  primaryEmail?: string | null;
}

export const useTaskManager = (user: DashboardUser | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>>({
    title: "",
    description: "",
    priority: "MEDIUM",
    category: "General",
    dueDate: "",
    order: 0
  });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: 'all',
    category: '',
    sortBy: 'created-desc',
    dueDate: 'all'
  });

  const fetchTasks = useCallback(async () => {
    const result = await fetchAPI(advancedFilters);
    setTasks(result.sort((a, b) => a.order - b.order));
  }, [advancedFilters]);

  const createTask = async () => {
    if (!newTask.title.trim()) return;
    setLoading(true);
    try {
      await createAPI({ ...newTask, dueDate: newTask.dueDate || null });
      setNewTask({ title: "", description: "", priority: "MEDIUM", category: "General", dueDate: "", order: tasks.length });
      await fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("An error occurred while creating the task. Please try again.");
    }
    setLoading(false);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
      await fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  const updateTaskDetails = async (id: string, updatedFields: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      await updateTask(id, updatedFields);
      await fetchTasks();
    } catch (err) {
      console.error("Error updating task fields:", err);
      alert("Could not update task. Please try again.");
    }
  };

  const reorderTasks = async (orderedIds: string[]) => {
    try {
      await Promise.all(
        orderedIds.map((id, index) => updateTask(id, { order: index }))
      );
      await fetchTasks();
    } catch (err) {
      console.error("Error reordering tasks:", err);
      alert("Could not reorder tasks. Please try again.");
    }
  };

  const deleteTask = async (id: string) => {
    if (confirm("Delete this task?")) {
      try {
        await deleteAPI(id);
        await fetchTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
        alert("Could not delete task. Please try again.");
      }
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => {
    const newVal = !prev;
    localStorage.setItem("darkMode", newVal.toString());
    return newVal;
  });

  useEffect(() => {
    if (notificationsEnabled && tasks.length) {
      const lastOverdue = +localStorage.getItem("lastOverdueNotification") || 0;
      const now = Date.now();
      if (now - lastOverdue > 60 * 60 * 1000) {
        NotificationManager.checkOverdueTasks(tasks);
        localStorage.setItem("lastOverdueNotification", now.toString());
      }

      const today = new Date().toDateString();
      const lastToday = localStorage.getItem("lastTodayNotification");
      if (today !== lastToday) {
        NotificationManager.checkTodayTasks(tasks);
        localStorage.setItem("lastTodayNotification", today);
      }
    }
  }, [tasks, notificationsEnabled]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    setIsDarkMode(savedTheme === "true" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches));
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted");
    }
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [fetchTasks, user]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && getDueDateStatus(t.dueDate, t.completed) === "overdue").length
  };

  const requestNotifications = async () => {
    const granted = await NotificationManager.requestPermission();
    setNotificationsEnabled(granted);
    if (granted) {
      NotificationManager.showNotification("Notifications enabled!", {
        body: "You'll now receive task alerts.",
        tag: "enabled"
      });
    }
  };

  return {
    tasks,
    newTask,
    setNewTask,
    fetchTasks,
    createTask,
    deleteTask,
    toggleTask,
    updateTaskDetails,
    reorderTasks,
    isDarkMode,
    toggleDarkMode,
    notificationsEnabled,
    requestNotifications,
    filter,
    setFilter,
    advancedFilters,
    setAdvancedFilters,
    filteredTasks,
    stats,
    loading
  };
};

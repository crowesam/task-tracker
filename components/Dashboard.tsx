// components/Dashboard.tsx

"use client";

import { useTaskManager, DashboardUser } from "../hooks/useTaskManager";

import TaskList from "./TaskList";
import { DashboardUser } from "@/hooks/useTaskManager";

interface DashboardProps {
  user: DashboardUser;
  onSignOut?: () => void;
}

export default function Dashboard({ user, onSignOut }: DashboardProps) {
  const {
    tasks,
    toggleTask,
    deleteTask,
    reorderTasks,
    updateTaskDetails,
    isDarkMode,
  } = useTaskManager(user);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}!
        </h1>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="text-sm text-blue-500 hover:underline"
          >
            Sign Out
          </button>
        )}
      </div>
      <TaskList
        tasks={tasks}
        isDarkMode={isDarkMode}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        reorderTasks={reorderTasks}
        updateTaskDetails={updateTaskDetails}
      />
    </div>
  );
}

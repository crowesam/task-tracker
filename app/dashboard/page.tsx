// app/dashboard/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { TaskList } from '@/src/components/features/TaskList';
import { TaskForm } from '@/src/components/features/TaskForm';
import { Card } from '@/src/components/ui';
import { Task, PriorityType } from '@/src/types';
import { combineClasses } from '@/src/utils';
import { TRANSITIONS } from '@/src/constants';


export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  
  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [groupByCompletion, setGroupByCompletion] = useState(true);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  // Load tasks from localStorage (temporary - replace with API later)
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [user]);

  // Save tasks to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  // Task operations
  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleReorderTasks = (fromIndex: number, toIndex: number) => {
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, movedTask);
    setTasks(newTasks);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('dragIndex', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData('dragIndex'));
    if (dragIndex !== dropIndex) {
      handleReorderTasks(dragIndex, dropIndex);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={combineClasses(
      'min-h-screen',
      TRANSITIONS.default,
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
    )}>
      {/* Header */}
      <Header
        title="Task Dashboard"
        subtitle={`Welcome back, ${user.displayName || user.primaryEmail}`}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        showThemeToggle={true}
        actions={
          <button
            onClick={() => router.push('/sign-out')}
            className={combineClasses(
              'px-4 py-2 rounded-lg',
              'bg-white/10 backdrop-blur-md border border-white/20',
              'text-white hover:bg-white/20',
              TRANSITIONS.default
            )}
          >
            Sign Out
          </button>
        }
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card darkMode={darkMode} className="text-center">
            <h3 className="text-2xl font-bold text-white">{tasks.length}</h3>
            <p className="text-white/70">Total Tasks</p>
          </Card>
          <Card darkMode={darkMode} className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {tasks.filter(t => t.completed).length}
            </h3>
            <p className="text-white/70">Completed</p>
          </Card>
          <Card darkMode={darkMode} className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {tasks.filter(t => !t.completed).length}
            </h3>
            <p className="text-white/70">In Progress</p>
          </Card>
          <Card darkMode={darkMode} className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {tasks.filter(t => t.priority === 'high' && !t.completed).length}
            </h3>
            <p className="text-white/70">High Priority</p>
          </Card>
        </div>

        {/* Task Form */}
        {showForm ? (
          <Card darkMode={darkMode} className="m-4">
            <TaskForm onSubmit={handleAddTask} />
          </Card>
        ) : (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className={combineClasses(
                'px-4 py-2 rounded-lg',
                'bg-white/10 backdrop-blur-md border border-white/20',
                'text-white hover:bg-white/20',
                TRANSITIONS.default
              )}
            >
              Add Task
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
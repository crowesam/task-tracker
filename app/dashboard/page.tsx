// app/dashboard/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { TaskList } from '@/src/components/features/TaskList';
import { TaskForm } from '@/src/components/features/TaskForm';
import { Task } from '@/src/types';
import { combineClasses } from '@/src/utils';
import { Sparkles, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  
  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCompleted] = useState(true);
  const [groupByCompletion] = useState(true);

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

  const playSound = (type: string) => {
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => console.log(`Playing ${type} sound`));
    } catch {
      console.log(`Playing ${type} sound`);
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
          : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
      } flex items-center justify-center`}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const completedTasks = tasks.filter(t => t.completed).length;
  const inProgressTasks = tasks.filter(t => !t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;

  return (
    <div className={combineClasses(
      'min-h-screen transition-all duration-500',
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
        : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
    )}>
      {/* Header Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Medilios
              </h1>
              <p className="text-white/70 text-sm">Task Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Header
              title=""
              subtitle=""
              darkMode={darkMode}
              onToggleTheme={() => setDarkMode(!darkMode)}
              showThemeToggle={true}
              actions={
                <button
                  onClick={() => {
                    playSound('click');
                    router.push('/sign-out');
                  }}
                  className={`px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  Sign Out
                </button>
              }
            />
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back,
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              {user.displayName || user.primaryEmail?.split('@')[0] || 'User'}
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Stay organized and productive with your beautiful task management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/20 border-white/30 hover:bg-white/30'
            }`}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(20,184,166,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(20,184,166,0.2) 50%, rgba(255,255,255,0.25) 100%)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{tasks.length}</h3>
                <p className="text-white/70 font-medium">Total Tasks</p>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/20 border-white/30 hover:bg-white/30'
            }`}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(34,197,94,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(34,197,94,0.2) 50%, rgba(255,255,255,0.25) 100%)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{completedTasks}</h3>
                <p className="text-white/70 font-medium">Completed</p>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/20 border-white/30 hover:bg-white/30'
            }`}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(251,191,36,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(251,191,36,0.2) 50%, rgba(255,255,255,0.25) 100%)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{inProgressTasks}</h3>
                <p className="text-white/70 font-medium">In Progress</p>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/20 border-white/30 hover:bg-white/30'
            }`}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(239,68,68,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(239,68,68,0.2) 50%, rgba(255,255,255,0.25) 100%)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{highPriorityTasks}</h3>
                <p className="text-white/70 font-medium">High Priority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              playSound('click');
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       text-white rounded-full hover:scale-105 transition-all duration-300 shadow-xl 
                       hover:shadow-orange-500/25 font-semibold text-lg"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        </div>

        {/* Task Form */}
        <TaskForm
          darkMode={darkMode}
          onAddTask={handleAddTask}
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onReorderTasks={handleReorderTasks}
          darkMode={darkMode}
          showCompleted={showCompleted}
          groupByCompletion={groupByCompletion}
        />
      </div>
    </div>
  );
}

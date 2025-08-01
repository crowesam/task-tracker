// app/dashboard/page.tsx - Fixed Logo Implementation
'use client'

import { BackgroundEffects } from '@/src/components/layout/BackgroundEffects';
import React, { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { FrontendTask } from '@/src/types';
import { combineClasses } from '@/src/utils';
import {  CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import TaskGrid from '@/src/components/ui/TaskGrid';
import TaskForm from '@/src/components/ui/TaskForm';
import AddTaskButton from '@/src/components/ui/AddTaskButton';
import TaskModal from '@/src/components/ui/TaskModal';
import Image from 'next/image'; // ✅ Add this import

type FilterType = 'all' | 'completed' | 'inProgress' | 'highPriority';

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  
  // State
  const [tasks, setTasks] = useState<FrontendTask[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<FrontendTask | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

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

  // Load tasks from localStorage
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        const tasksWithDates = parsedTasks.map((task: FrontendTask & { createdAt: string; updatedAt?: string; dueDate?: string }) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(tasksWithDates);
      } else {
        // Load sample data if no saved tasks
        import('@/src/constants/sampleData').then(({ SAMPLE_TASKS }) => {
          setTasks(SAMPLE_TASKS);
        });
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
  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Modal functions
  const handleCreateTask = (taskData: Omit<FrontendTask, 'id' | 'createdAt'>) => {
    const newTask: FrontendTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateTask = (taskData: Omit<FrontendTask, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : task
      ));
      setIsEditModalOpen(false);
      setEditingTask(null);
    }
  };

  // Filter functions
  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'inProgress':
        return tasks.filter(t => !t.completed);
      case 'highPriority':
        return tasks.filter(t => t.priority === 'high' && !t.completed);
      default:
        return tasks;
    }
  };

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Loading state
  if (!user) {
    return (
      <div className={combineClasses(
        'min-h-screen transition-all duration-500 flex items-center justify-center',
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
          : 'bg-gradient-to-br from-yellow-400 via-green-400 via-teal-500 to-purple-600'
      )}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Calculate stats
  const completedTasks = tasks.filter(t => t.completed).length;
  const inProgressTasks = tasks.filter(t => !t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const filteredTasks = getFilteredTasks();

  // Get filter title for display
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'completed':
        return 'Completed Tasks';
      case 'inProgress':
        return 'In Progress Tasks';
      case 'highPriority':
        return 'High Priority Tasks';
      default:
        return 'All Tasks';
    }
  };

  return (
    <div className={combineClasses(
      'min-h-screen transition-all duration-500',
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
        : 'bg-gradient-to-br from-yellow-400 via-green-400 via-teal-500 to-purple-600'
    )}> 
      {/* Background Effects */}
      <BackgroundEffects darkMode={darkMode} variant="enhanced" animated={true} />
      
      {/* Header Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Medilios"
                width={60}
                height={60}
                className="w-8 h-8 object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Medilios
              </h1>
              <p className="text-white/70 text-sm">by Sam Crowe</p>
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
                  onClick={() => router.push('/sign-out')}
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
            {getFilterTitle()}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {activeFilter === 'all' 
              ? 'Beautiful glassmorphism task cards with priority indicators'
              : `Showing ${filteredTasks.length} ${activeFilter === 'completed' ? 'completed' : activeFilter === 'inProgress' ? 'in progress' : 'high priority'} tasks`
            }
          </p>
        </div>

        {/* Interactive Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Tasks */}
          <button
            onClick={() => handleFilterClick('all')}
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 text-left w-full ${
              activeFilter === 'all'
                ? 'bg-white/20 border-white/40 shadow-lg shadow-blue-500/20'
                : 'bg-white/10 border-white/20 hover:bg-white/15'
            }`}
            aria-label="Show all tasks"
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
          </button>

          {/* Completed Tasks */}
          <button
            onClick={() => handleFilterClick('completed')}
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 text-left w-full ${
              activeFilter === 'completed'
                ? 'bg-white/20 border-white/40 shadow-lg shadow-green-500/20'
                : 'bg-white/10 border-white/20 hover:bg-white/15'
            }`}
            aria-label="Show completed tasks"
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
          </button>

          {/* In Progress Tasks */}
          <button
            onClick={() => handleFilterClick('inProgress')}
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 text-left w-full ${
              activeFilter === 'inProgress'
                ? 'bg-white/20 border-white/40 shadow-lg shadow-yellow-500/20'
                : 'bg-white/10 border-white/20 hover:bg-white/15'
            }`}
            aria-label="Show in progress tasks"
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
          </button>

          {/* High Priority Tasks */}
          <button
            onClick={() => handleFilterClick('highPriority')}
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 text-left w-full ${
              activeFilter === 'highPriority'
                ? 'bg-white/20 border-white/40 shadow-lg shadow-red-500/20'
                : 'bg-white/10 border-white/20 hover:bg-white/15'
            }`}
            aria-label="Show high priority tasks"
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
          </button>
        </div>

        {/* Add Task Button */}
        <div className="flex justify-center mb-12">
          <AddTaskButton 
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>

        {/* Task Grid */}
        <TaskGrid
          tasks={filteredTasks}
          onToggleComplete={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeFilter === 'all' 
                ? 'No tasks yet'
                : `No ${activeFilter === 'completed' ? 'completed' : activeFilter === 'inProgress' ? 'in progress' : 'high priority'} tasks`
              }
            </h3>
            <p className="text-white/70 mb-6">
              {activeFilter === 'all' 
                ? 'Create your first task to get started!'
                : 'Try switching to a different filter or create a new task.'
              }
            </p>
            {activeFilter !== 'all' && (
              <button
                onClick={() => handleFilterClick('all')}
                className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                Show All Tasks
              </button>
            )}
          </div>
        )}

        {/* Modals */}
        <TaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Task"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </TaskModal>

        <TaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          title="Edit Task"
        >
          <TaskForm
            task={editingTask || undefined}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingTask(null);
            }}
          />
        </TaskModal>
      </div>
    </div>
  );
}
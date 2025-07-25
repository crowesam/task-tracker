'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, Check, Moon, Sun, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  order: number;
}

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: "Welcome to your beautiful task tracker!",
      description: "This is your first task. Try editing, completing, or reordering it.",
      category: "Getting Started",
      dueDate: "2025-07-30",
      completed: false,
      priority: "high",
      order: 0
    },
    {
      id: '2',
      title: "Explore the glassmorphism interface",
      description: "Notice the beautiful glass-like transparency and smooth animations.",
      category: "Tutorial",
      dueDate: "2025-07-31",
      completed: false,
      priority: "medium",
      order: 1
    }
  ]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

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

  // Priority indicator colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Play sound effect
  const playSound = (type: string) => {
    try {
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.log(`Playing ${type} sound`);
      });
    } catch {
      console.log(`Playing ${type} sound`);
    }
  };

  // Calculate urgency glow based on due date
  const getUrgencyGlow = (dueDate: string, completed: boolean) => {
    if (completed) return '';
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'shadow-red-500/50 ring-red-500/30';
    if (diffDays <= 1) return 'shadow-orange-500/40 ring-orange-500/20';
    if (diffDays <= 3) return 'shadow-yellow-500/30 ring-yellow-500/15';
    return '';
  };

  const toggleTask = (id: string) => {
    playSound('toggle');
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast.success(task.completed ? 'Task reopened!' : 'Task completed! 🎉');
    }
  };

  const deleteTask = (id: string) => {
    playSound('delete');
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted!');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    playSound('edit');
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
    toast.success('Task updated!');
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    playSound('click');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedOver(null);
  };

  const handleDragOver = (e: React.DragEvent, task: Task) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedTask && task.id !== draggedTask.id) {
      setDraggedOver(task.id);
    }
  };

  const handleDrop = (e: React.DragEvent, dropTask: Task) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === dropTask.id) return;

    playSound('toggle');
    
    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(task => task.id === draggedTask.id);
    const dropIndex = newTasks.findIndex(task => task.id === dropTask.id);
    
    const [removed] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, removed);
    
    setTasks(newTasks);
    setDraggedTask(null);
    setDraggedOver(null);
    toast.success('Task reordered!');
  };

  const addTask = () => {
    if (newTask.trim()) {
      playSound('add');
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        description: '',
        category: 'General',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        priority: 'medium',
        order: tasks.length
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setShowAddForm(false);
      toast.success('Task added!');
    }
  };

  const handleSignOut = () => {
    playSound('click');
    user?.signOut();
    router.push('/');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.category.toLowerCase() === filter.toLowerCase();
  });

  const categories = ['all', 'pending', 'completed', ...new Set(tasks.map(task => task.category))];

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
          : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
      }`}>
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' 
        : 'bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Welcome back, {user.displayName || user.primaryEmail}
            </h1>
            <p className="text-white/70 mt-2">Your beautiful task dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border ${
              darkMode 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-white/20 border-white/30 text-white'
            }`}>
              <User size={16} />
              <span className="text-sm">{user.displayName || 'User'}</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playSound('click');
                setDarkMode(!darkMode);
              }}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/20 text-white hover:bg-white/30 shadow-black/20'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 ${
                darkMode 
                  ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30' 
                  : 'bg-red-500/20 text-red-100 hover:bg-red-500/30'
              }`}
              aria-label="Sign out"
            >
              <LogOut size={20} />
            </button>

            {/* Add Task Button */}
            <button
              onClick={() => {
                playSound('click');
                setShowAddForm(!showAddForm);
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full 
                         backdrop-blur-md hover:scale-105 transition-all duration-300 
                         shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 font-medium
                         focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Add new task"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className={`mb-6 p-6 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-2xl shadow-black/30 ${
            darkMode 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/20 border border-white/20'
          }`}>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className={`flex-1 p-3 rounded-xl backdrop-blur-md border transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white placeholder-white/50'
                    : 'bg-white/25 border-white/20 text-white placeholder-white/70'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl 
                           hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25
                           focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label="Add task"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                playSound('click');
                setFilter(category);
              }}
              className={`px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 capitalize shadow-lg 
                         focus:outline-none focus:ring-2 focus:ring-white/30 ${
                filter === category
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/25'
                  : darkMode
                    ? 'bg-white/10 text-white/70 hover:bg-white/20 shadow-black/20'
                    : 'bg-white/20 text-white/80 hover:bg-white/30 shadow-black/20'
              }`}
              aria-label={`Filter by ${category}`}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, task)}
              onDrop={(e) => handleDrop(e, task)}
              className={`group relative p-6 rounded-2xl backdrop-blur-md cursor-move border 
                         shadow-lg transition-all duration-500 ease-out
                         hover:shadow-2xl hover:border-white/40
                         ${draggedTask?.id === task.id ? 'opacity-50 scale-95 rotate-3' : ''}
                         ${draggedOver === task.id ? 'ring-2 ring-orange-400 ring-opacity-50' : ''}
                         ${getUrgencyGlow(task.dueDate, task.completed)} ${
                darkMode 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-white/30 border-white/40 hover:bg-white/40'
              }`}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(20,184,166,0.15) 50%, rgba(255,255,255,0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(20,184,166,0.25) 50%, rgba(255,255,255,0.35) 100%)'
              }}
              onMouseEnter={(e) => {
                if (!draggedTask) {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) translateZ(0)';
                  e.currentTarget.style.boxShadow = darkMode 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.1)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!draggedTask) {
                  e.currentTarget.style.transform = 'translateY(0px) scale(1) translateZ(0)';
                  e.currentTarget.style.boxShadow = darkMode
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              {/* Priority Indicator & Drag Handle */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)} 
                                shadow-lg opacity-80`}
                     title={`${task.priority} priority`}>
                </div>
                <div className={`w-2 h-6 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-60 ${
                  darkMode ? 'bg-white' : 'bg-white'
                }`} 
                     style={{
                       background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, currentColor 2px, currentColor 4px)'
                     }}
                     title="Drag to reorder">
                </div>
              </div>

              {/* Task Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg transition-all duration-300 drop-shadow-sm pr-6 ${
                    task.completed 
                      ? `line-through ${darkMode ? 'text-white/50' : 'text-white/60'}` 
                      : darkMode ? 'text-white' : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm mt-2 drop-shadow-sm pr-6 ${
                      darkMode ? 'text-white/70' : 'text-white/80'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium drop-shadow-sm ${
                      darkMode ? 'bg-white/15 text-white/90' : 'bg-white/40 text-white'
                    }`}>
                      {task.category}
                    </span>
                    <span className={`text-xs drop-shadow-sm ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    task.completed
                      ? 'bg-green-500/30 text-green-100 hover:bg-green-500/40 shadow-lg'
                      : 'bg-orange-500/30 text-orange-100 hover:bg-orange-500/40 shadow-lg'
                  }`}
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <Check size={16} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('edit');
                    setEditingTask(task);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    darkMode
                      ? 'bg-blue-500/30 text-blue-100 hover:bg-blue-500/40 shadow-lg'
                      : 'bg-blue-500/30 text-blue-100 hover:bg-blue-500/40 shadow-lg'
                  }`}
                  aria-label="Edit task"
                >
                  <Edit3 size={16} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    darkMode
                      ? 'bg-red-500/30 text-red-100 hover:bg-red-500/40 shadow-lg'
                      : 'bg-red-500/30 text-red-100 hover:bg-red-500/40 shadow-lg'
                  }`}
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
            <p className="text-xl drop-shadow-sm">No tasks found</p>
            <p className="text-sm mt-2 drop-shadow-sm">Add a new task to get started!</p>
          </div>
        )}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-2xl backdrop-blur-md border ${
            darkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/30 border-white/40'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>
              Edit Task
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
                  Title
                </label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className={`w-full p-3 rounded-xl backdrop-blur-md border transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/50'
                      : 'bg-white/25 border-white/20 text-white placeholder-white/70'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
                  Description
                </label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                  rows={3}
                  className={`w-full p-3 rounded-xl backdrop-blur-md border transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/50'
                      : 'bg-white/25 border-white/20 text-white placeholder-white/70'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
                  Priority
                </label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({...editingTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className={`w-full p-3 rounded-xl backdrop-blur-md border transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-white/25 border-white/20 text-white'
                  }`}
                >
                  <option value="low" className="bg-teal-800 text-white">Low Priority</option>
                  <option value="medium" className="bg-teal-800 text-white">Medium Priority</option>
                  <option value="high" className="bg-teal-800 text-white">High Priority</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-white/90'}`}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                  className={`w-full p-3 rounded-xl backdrop-blur-md border transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-white/25 border-white/20 text-white'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateTask(editingTask.id, editingTask)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl 
                           hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25
                           focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
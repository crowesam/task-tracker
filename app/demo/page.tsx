import React, { useState, useEffect } from 'react';
import { CheckCircle, Plus, X, Moon, Sun, Grip } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

type PriorityType = 'high' | 'medium' | 'low';

const GlassmorphismDemo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Welcome to the demo!", completed: true, priority: "high" },
    { id: 2, text: "Try adding a new task", completed: false, priority: "medium" },
    { id: 3, text: "Toggle dark mode", completed: false, priority: "low" },
    { id: 4, text: "Drag tasks to reorder", completed: false, priority: "high" },
    { id: 5, text: "Mark tasks as complete", completed: false, priority: "medium" }
  ]);
  
  const [newTask, setNewTask] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (): void => {
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: "medium" as PriorityType
      };
      
      setTasks(prevTasks => [...prevTasks, newTaskItem]);
      setNewTask('');
      setShowForm(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (id: number): void => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    setDraggedItem(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number): void => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const dragIndex = draggedItem;
    const newTasks = [...tasks];
    const draggedTask = newTasks[dragIndex];
    
    if (!draggedTask) return;
    
    newTasks.splice(dragIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    
    setTasks(newTasks);
    setDraggedItem(null);
  };

  const getPriorityColor = (priority: PriorityType): string => {
    switch (priority) {
      case 'high': 
        return 'from-red-400/20 to-pink-400/20 border-red-300/30';
      case 'medium': 
        return 'from-blue-400/20 to-cyan-400/20 border-blue-300/30';
      case 'low': 
        return 'from-green-400/20 to-emerald-400/20 border-green-300/30';
      default: 
        return 'from-gray-400/20 to-gray-400/20 border-gray-300/30';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  const handleShowForm = (): void => {
    setShowForm(true);
  };

  const handleHideForm = (): void => {
    setShowForm(false);
    setNewTask('');
  };

  const handleDarkModeToggle = (): void => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
      role="main"
      aria-label="Task Manager Demo Application"
    >
      
      {/* Background Effects - Decorative only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-30 ${
          darkMode ? 'bg-purple-500' : 'bg-blue-300'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-500' : 'bg-purple-300'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-25 ${
          darkMode ? 'bg-pink-500' : 'bg-cyan-300'
        }`} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className={`backdrop-blur-md rounded-2xl border p-8 mb-8 ${
          darkMode 
            ? 'bg-white/10 border-white/20 text-white' 
            : 'bg-white/60 border-white/30 text-gray-800'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Task Manager Demo
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Experience glassmorphism design in action
              </p>
            </div>
            
            <button
              onClick={handleDarkModeToggle}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20 focus:ring-offset-gray-900' 
                  : 'bg-white/60 border-white/30 text-gray-700 hover:bg-white/80 focus:ring-offset-white'
              }`}
              type="button"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        {/* Add Task Section */}
        <section 
          className={`backdrop-blur-md rounded-2xl border p-6 mb-8 ${
            darkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/60 border-white/30'
          }`}
          aria-label="Add new task"
        >
          {!showForm ? (
            <button
              onClick={handleShowForm}
              aria-label="Open form to add new task"
              className={`w-full p-4 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                darkMode 
                  ? 'border-white/30 text-white/70 hover:border-white/50 hover:bg-white/5 focus:ring-offset-gray-900' 
                  : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-white/50 focus:ring-offset-white'
              }`}
              type="button"
            >
              <Plus size={20} aria-hidden="true" />
              Add New Task
            </button>
          ) : (
            <div className="flex gap-3" role="form" aria-label="New task form">
              <label htmlFor="new-task-input" className="sr-only">
                Task description
              </label>
              <input
                id="new-task-input"
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="What needs to be done?"
                className={`flex-1 p-3 rounded-xl backdrop-blur-md border outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-offset-gray-900' 
                    : 'bg-white/60 border-white/30 text-gray-800 placeholder-gray-500 focus:border-gray-400 focus:ring-offset-white'
                }`}
                onKeyDown={handleKeyPress}
                autoFocus
                aria-describedby="task-input-help"
              />
              <div id="task-input-help" className="sr-only">
                Enter a task description and press Enter or click Add to create the task
              </div>
              <button
                onClick={addTask}
                aria-label="Add this task to the list"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="button"
              >
                Add
              </button>
              <button
                onClick={handleHideForm}
                aria-label="Cancel adding task and close form"
                className={`px-3 py-3 rounded-xl backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-offset-gray-900' 
                    : 'bg-white/60 border-white/30 text-gray-700 hover:bg-white/80 focus:ring-offset-white'
                }`}
                type="button"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        {/* Tasks List */}
        <section aria-label="Task list">
          <h2 className="sr-only">Your Tasks</h2>
          <div className="space-y-4" role="list">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                role="listitem"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`backdrop-blur-md rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] cursor-move bg-gradient-to-r ${getPriorityColor(task.priority)} ${
                  darkMode ? 'hover:bg-white/10' : 'hover:bg-white/70'
                } ${task.completed ? 'opacity-75' : ''}`}
                aria-label={`Task: ${task.text}. Priority: ${task.priority}. Status: ${task.completed ? 'completed' : 'incomplete'}. Drag to reorder.`}
                tabIndex={0}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`${darkMode ? 'text-white/40' : 'text-gray-400'}`} 
                    aria-hidden="true"
                    title="Drag handle"
                  >
                    <Grip size={20} />
                  </div>
                  
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.completed ? `Mark "${task.text}" as incomplete` : `Mark "${task.text}" as complete`}
                    className={`flex-shrink-0 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                      task.completed 
                        ? 'text-green-500' 
                        : darkMode ? 'text-white/50 hover:text-green-400' : 'text-gray-400 hover:text-green-500'
                    } ${darkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
                    type="button"
                  >
                    <CheckCircle size={24} fill={task.completed ? 'currentColor' : 'none'} />
                  </button>
                  
                  <span 
                    className={`flex-1 transition-all duration-300 ${
                      task.completed 
                        ? `line-through ${darkMode ? 'text-white/50' : 'text-gray-500'}` 
                        : darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                    aria-live="polite"
                  >
                    {task.text}
                  </span>
                  
                  <div 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : task.priority === 'medium' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}
                    aria-label={`Priority: ${task.priority}`}
                  >
                    {task.priority}
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete task: ${task.text}`}
                    className={`flex-shrink-0 p-1 rounded-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      darkMode 
                        ? 'text-white/50 hover:text-red-400 hover:bg-red-500/20 focus:ring-offset-gray-900' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 focus:ring-offset-white'
                    }`}
                    type="button"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {tasks.length === 0 && (
          <div 
            className={`text-center py-12 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}
            role="status"
            aria-live="polite"
          >
            <p className="text-lg">No tasks yet. Add one above to get started!</p>
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-12 text-center ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
          <p>✨ Try dragging tasks, toggling dark mode, and adding new items!</p>
        </footer>
      </div>
    </div>
  );
};

export default GlassmorphismDemo;
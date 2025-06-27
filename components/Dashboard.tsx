"use client"
import { useEffect, useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "LOW" | "MEDIUM" | "HIGH"
  category: string
  createdAt: string
  updatedAt: string
  dueDate?: string | null
}

interface AdvancedFilters {
  priority: string
  category: string
  sortBy: string
}

interface DashboardProps {
  user: {
    displayName?: string
    primaryEmail?: string
  } | null
  onSignOut: () => void
}

// Dark Mode Toggle Component
const DarkModeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDark ? 'bg-blue-600' : 'bg-gray-200'
      }`}
      role="switch"
      aria-checked={isDark}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        {isDark ? (
          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>
    </button>
  );
};

// Advanced Filters Component with Dark Mode
const AdvancedFilters = ({ onFilterChange, currentFilters, tasks, isDark }) => {
  const [localFilters, setLocalFilters] = useState({
    priority: currentFilters?.priority || 'all',
    category: currentFilters?.category || '',
    sortBy: currentFilters?.sortBy || 'created-desc'
  });

  // Get unique categories from tasks for suggestions
  const uniqueCategories = [...new Set(tasks.map(task => task.category))].filter(Boolean);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAdvancedFilters = () => {
    const defaultFilters = {
      priority: 'all',
      category: '',
      sortBy: 'created-desc'
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-wrap gap-4 items-end">
        
        {/* Priority Filter */}
        <div className="flex flex-col min-w-[140px]">
          <label className={`text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Priority</label>
          <select
            value={localFilters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className={`px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col min-w-[180px]">
          <label className={`text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Category</label>
          <input
            type="text"
            placeholder="Filter by category..."
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={`px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
          {uniqueCategories.length > 0 && (
            <div className={`mt-1 text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Suggestions: {uniqueCategories.slice(0, 3).join(', ')}
              {uniqueCategories.length > 3 ? '...' : ''}
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex flex-col min-w-[160px]">
          <label className={`text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Sort By</label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className={`px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          >
            <option value="created-desc">Newest First</option>
            <option value="created-asc">Oldest First</option>
            <option value="priority-desc">High Priority First</option>
            <option value="priority-asc">Low Priority First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>

        {/* Clear Advanced Filters Button */}
        <div>
          <button
            onClick={clearAdvancedFilters}
            className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
              isDark 
                ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600' 
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(localFilters.priority !== 'all' || localFilters.category) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {localFilters.priority !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Priority: {localFilters.priority}
              <button onClick={() => handleFilterChange('priority', 'all')} className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100">×</button>
            </span>
          )}
          {localFilters.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Category: {localFilters.category}
              <button onClick={() => handleFilterChange('category', '')} className="ml-1 text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced Dashboard Component with Advanced Filters and Dark Mode
export default function Dashboard({ user, onSignOut }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
    category: "General"
  })
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    priority: 'all',
    category: '',
    sortBy: 'created-desc'
  })

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true')
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  // Update document class when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  // Fetch tasks when component mounts or when advanced filters change
  useEffect(() => {
    fetchTasks()
  }, [advancedFilters])

  // Don't render if no user
  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-lg">Please sign in to view your tasks.</div>
      </div>
    )
  } 

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      
      // Add advanced filter parameters
      if (advancedFilters.priority && advancedFilters.priority !== 'all') {
        params.append('priority', advancedFilters.priority.toLowerCase());
      }
      if (advancedFilters.category && advancedFilters.category.trim()) {
        params.append('category', advancedFilters.category.trim());
      }
      if (advancedFilters.sortBy && advancedFilters.sortBy !== 'created-desc') {
        params.append('sortBy', advancedFilters.sortBy);
      }

      const queryString = params.toString();
      const url = `/api/tasks${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      } else {
        console.error("Failed to fetch tasks:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim()) return
    
    setLoading(true)
    
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      })

      if (response.ok) {
        setNewTask({ title: "", description: "", priority: "MEDIUM", category: "General" })
        await fetchTasks()
      } else {
        const errorData = await response.json()
        console.error("Failed to create task:", errorData)
        alert(`Failed to create task: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error creating task:", error)
      alert("Error creating task. Please try again.")
    }
    setLoading(false)
  }

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      })

      if (response.ok) {
        await fetchTasks()
      } else {
        console.error("Failed to update task:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return
    
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        await fetchTasks()
      } else {
        console.error("Failed to delete task:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  // Apply basic filter (all/pending/completed) to the already fetched and sorted tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  }

  const handleAdvancedFilterChange = (newFilters: AdvancedFilters) => {
    setAdvancedFilters(newFilters);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <nav className={`shadow-sm border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Task Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Dark Mode</span>
                <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
              </div>
              <span className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Welcome, {user?.displayName || user?.primaryEmail}
              </span>
              <button
                onClick={onSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`overflow-hidden shadow rounded-lg transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.total}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className={`text-sm font-medium truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Total Tasks
                      </dt>
                      <dd className={`text-lg font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stats.total}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className={`overflow-hidden shadow rounded-lg transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.completed}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className={`text-sm font-medium truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Completed
                      </dt>
                      <dd className={`text-lg font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stats.completed}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className={`overflow-hidden shadow rounded-lg transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.pending}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className={`text-sm font-medium truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Pending
                      </dt>
                      <dd className={`text-lg font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stats.pending}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Creation Section */}
          <div className={`overflow-hidden shadow rounded-lg mb-6 transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="px-4 py-5 sm:p-6">
              <h3 className={`text-lg leading-6 font-medium mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Create New Task
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"})}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                    >
                      <option value="LOW">Low Priority</option>
                      <option value="MEDIUM">Medium Priority</option>
                      <option value="HIGH">High Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g., Work, Personal, Shopping"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter task description (optional)"
                  />
                </div>
                
                <button
                  onClick={createTask}
                  disabled={loading || !newTask.title.trim() || !newTask.category.trim()}
                  className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters 
            onFilterChange={handleAdvancedFilterChange}
            currentFilters={advancedFilters}
            tasks={tasks}
            isDark={isDarkMode}
          />

          {/* Filter Tabs */}
          <div className={`overflow-hidden shadow rounded-lg transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { key: "all", label: "All Tasks", count: stats.total },
                  { key: "pending", label: "Pending", count: stats.pending },
                  { key: "completed", label: "Completed", count: stats.completed }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as "all" | "completed" | "pending")}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      filter === tab.key
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : `border-transparent hover:border-gray-300 ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-gray-300' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Task List */}
            <div className={`divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {filteredTasks.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {filter === "all" 
                      ? "No tasks match your current filters." 
                      : `No ${filter} tasks match your current filters.`
                    }
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id, task.completed)}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            task.completed 
                              ? `line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}` 
                              : `${isDarkMode ? 'text-white' : 'text-gray-900'}`
                          }`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className={`text-sm ${
                              task.completed 
                                ? `${isDarkMode ? 'text-gray-600' : 'text-gray-400'}` 
                                : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`
                            }`}>
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              Created {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                            <span className={`text-xs ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>•</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              isDarkMode 
                                ? 'text-blue-400 bg-blue-900/50' 
                                : 'text-blue-600 bg-blue-50'
                            }`}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === 'HIGH' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400' 
                            : task.priority === 'MEDIUM' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className={`text-sm transition-colors duration-200 ${
                            isDarkMode 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
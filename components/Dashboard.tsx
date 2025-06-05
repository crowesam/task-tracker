"use client"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "LOW" | "MEDIUM" | "HIGH"
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH"
  })
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session) router.push("/login")
  }, [session, status, router])

  // Fetch tasks on mount
  useEffect(() => {
    if (session) {
      fetchTasks()
    }
  }, [session])

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Don't render if no session
  if (!session) {
    return null
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
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
        setNewTask({ title: "", description: "", priority: "MEDIUM" })
        await fetchTasks()
      }
    } catch (error) {
      console.error("Error creating task:", error)
    }
    setLoading(false)
  }

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      })

      if (response.ok) {
        await fetchTasks()
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
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
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
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.total}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Tasks
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.total}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.completed}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completed
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.completed}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{stats.pending}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.pending}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Creation Form */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Create New Task
              </h3>
              
              <form onSubmit={createTask} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority-select" className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      id="priority-select"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as "LOW" | "MEDIUM" | "HIGH"})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                    >
                      <option value="LOW">Low Priority</option>
                      <option value="MEDIUM">Medium Priority</option>
                      <option value="HIGH">High Priority</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                    placeholder="Enter task description (optional)"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !newTask.title.trim()}
                  className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </form>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { key: "all", label: "All Tasks", count: stats.total },
                  { key: "pending", label: "Pending", count: stats.pending },
                  { key: "completed", label: "Completed", count: stats.completed }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as "all" | "completed" | "pending")}
                    className={`${
                      filter === tab.key
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Task List */}
            <div className="divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500">
                    {filter === "all" 
                      ? "No tasks yet. Create your first task above!" 
                      : `No ${filter} tasks.`
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
                          title={`Mark task "${task.title}" as ${task.completed ? "incomplete" : "completed"}`}
                        />
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            task.completed 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className={`text-sm ${
                              task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Created {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === 'HIGH' 
                            ? 'bg-red-100 text-red-800' 
                            : task.priority === 'MEDIUM' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
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
// src/utils/taskUtils.ts
import { FrontendTask, PriorityType, convertTaskToBackend, CreateTaskData } from '../types';

// Simple UUID-like ID generator for frontend tasks
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTask = (
  text: string, 
  priority: PriorityType = 'medium',
  category?: string
): FrontendTask => ({
  id: generateId(), // Generate proper string ID
  text: text.trim(),
  completed: false,
  priority,
  createdAt: new Date(),
  category: category || 'General',
  tags: [],
});

export const toggleTaskCompletion = (tasks: FrontendTask[], taskId: string): FrontendTask[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (tasks: FrontendTask[], taskId: string): FrontendTask[] => {
  return tasks.filter(task => task.id !== taskId);
};

export const reorderTasks = (
  tasks: FrontendTask[], 
  fromIndex: number, 
  toIndex: number
): FrontendTask[] => {
  const newTasks = [...tasks];
  const [draggedTask] = newTasks.splice(fromIndex, 1);
  newTasks.splice(toIndex, 0, draggedTask);
  return newTasks;
};

export const getTasksByCompletion = (tasks: FrontendTask[]) => ({
  completed: tasks.filter(task => task.completed),
  incomplete: tasks.filter(task => !task.completed),
});

// Utility to prepare task data for API calls
export const prepareTaskForAPI = (task: Partial<FrontendTask>): CreateTaskData => {
  const backendData = convertTaskToBackend(task);
  return {
    title: backendData.title || '',
    description: backendData.description,
    priority: backendData.priority || 'MEDIUM',
    category: backendData.category || 'General',
    dueDate: backendData.dueDate,
  };
};

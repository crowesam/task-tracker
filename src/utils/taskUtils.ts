// src/utils/taskUtils.ts
import { Task, PriorityType } from '../types';

export const createTask = (
  text: string, 
  priority: PriorityType = 'medium',
  category?: string
): Task => ({
  id: Date.now(),
  text: text.trim(),
  completed: false,
  priority,
  createdAt: new Date(),
  category,
});

export const toggleTaskCompletion = (tasks: Task[], taskId: number): Task[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (tasks: Task[], taskId: number): Task[] => {
  return tasks.filter(task => task.id !== taskId);
};

export const reorderTasks = (
  tasks: Task[], 
  fromIndex: number, 
  toIndex: number
): Task[] => {
  const newTasks = [...tasks];
  const [draggedTask] = newTasks.splice(fromIndex, 1);
  newTasks.splice(toIndex, 0, draggedTask);
  return newTasks;
};

export const getTasksByCompletion = (tasks: Task[]) => ({
  completed: tasks.filter(task => task.completed),
  incomplete: tasks.filter(task => !task.completed),
});

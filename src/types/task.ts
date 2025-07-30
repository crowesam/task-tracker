// src/types/task.ts
import { Task as PrismaTask, Priority as PrismaPriority, Category as PrismaCategory } from '@prisma/client';

// Use Prisma-generated types as the source of truth
export type Priority = PrismaPriority; // 'HIGH' | 'MEDIUM' | 'LOW'
export type Task = PrismaTask;
export type Category = PrismaCategory;

// Frontend display types (for backward compatibility)
export type PriorityType = 'high' | 'medium' | 'low';

export interface TaskFormData {
  text: string;
  priority: PriorityType;
  dueDate?: Date;
  category?: string;
}

export interface TaskFilters {
  search: string;
  priority?: PriorityType;
  category?: string;
  completed?: boolean;
  overdue?: boolean;
  dueToday?: boolean;
}

export type ViewMode = 'list' | 'grid';

// Category-related types
export interface CategoryFormData {
  name: string;
  color: string;
}

export interface CreateCategoryData {
  name: string;
  color: string;
}

export interface UpdateCategoryData {
  name?: string;
  color?: string;
}

// Default categories with colors
export const DEFAULT_CATEGORIES = [
  { name: 'General', color: '#6B7280' },
  { name: 'Work', color: '#3B82F6' },
  { name: 'Personal', color: '#10B981' },
  { name: 'Shopping', color: '#F59E0B' },
  { name: 'Health', color: '#EF4444' },
  { name: 'Learning', color: '#8B5CF6' },
] as const;

// Mapping between frontend display values and database enum values
export const PRIORITY_DISPLAY: Record<Priority, PriorityType> = {
  HIGH: 'high',
  MEDIUM: 'medium', 
  LOW: 'low'
} as const;

export const PRIORITY_VALUE: Record<PriorityType, Priority> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW'
} as const;

// For API requests (without database-specific fields)
export type CreateTaskData = {
  title: string;
  description?: string;
  priority: Priority;
  category: string;
  dueDate?: string | Date | null;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  priority?: Priority;
  category?: string;
  completed?: boolean;
  dueDate?: string | Date | null;
};

// Frontend task interface for components that expect the old structure
export interface FrontendTask {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  priority: PriorityType;
  dueDate?: Date;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

// Utility functions to convert between frontend and backend formats
export const convertTaskToFrontend = (task: Task): FrontendTask => ({
  id: task.id,
  text: task.title,
  completed: task.completed,
  priority: PRIORITY_DISPLAY[task.priority],
  dueDate: task.dueDate || undefined,
  category: task.category,
  tags: task.tags || [],
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

export const convertTaskToBackend = (task: Partial<FrontendTask>): Partial<CreateTaskData> => ({
  title: task.text,
  description: undefined,
  priority: task.priority ? PRIORITY_VALUE[task.priority] : 'MEDIUM',
  category: task.category || 'General',
  dueDate: task.dueDate,
});

// types/task.ts
import { Task as PrismaTask, Priority as PrismaPriority } from '@prisma/client';

// Use Prisma-generated types
export type Priority = PrismaPriority; // 'HIGH' | 'MEDIUM' | 'LOW'
export type Task = PrismaTask;

export interface FilterState {
  priority: Priority | 'all';
  category: string;
}

// For the frontend components, we'll map between display and database values
export const PRIORITY_DISPLAY: Record<Priority, string> = {
  HIGH: 'high',
  MEDIUM: 'medium', 
  LOW: 'low'
} as const;

export const PRIORITY_VALUE: Record<string, Priority> = {
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
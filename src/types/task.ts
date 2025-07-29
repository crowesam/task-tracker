// src/types/task.ts
export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: PriorityType;
  dueDate?: Date;
  category?: string;
  createdAt: Date;
  updatedAt?: Date;
}

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

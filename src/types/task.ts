// src/types/task.ts
export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: PriorityType;
}

export type PriorityType = 'high' | 'medium' | 'low';

export interface TaskFormData {
  text: string;
  priority: PriorityType;
}
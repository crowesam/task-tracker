// src/types/index.ts - Central export
export type { 
  Task, 
  PriorityType, 
  TaskFormData, 
  FrontendTask, 
  CreateTaskData, 
  UpdateTaskData,
  Priority,
  Category,
  CategoryFormData,
  CreateCategoryData,
  UpdateCategoryData
} from './task';

export { 
  PRIORITY_DISPLAY,
  PRIORITY_VALUE,
  convertTaskToFrontend,
  convertTaskToBackend,
  DEFAULT_CATEGORIES
} from './task';

export type { ThemeMode, ThemeContextType } from './theme';
export type { AccessibilityProps } from './accessibility';
export type { TaskFilters, FilterState } from './filters';

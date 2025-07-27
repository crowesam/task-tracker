// src/utils/accessibility.ts
import { AccessibilityProps } from '../types';

export const createTaskAriaLabel = (
  text: string, 
  priority: string, 
  completed: boolean
): string => {
  const status = completed ? 'completed' : 'incomplete';
  return `Task: ${text}. Priority: ${priority}. Status: ${status}. Drag to reorder.`;
};

export const createButtonAriaLabel = {
  toggle: (taskText: string, completed: boolean) =>
    completed 
      ? `Mark "${taskText}" as incomplete` 
      : `Mark "${taskText}" as complete`,
  
  delete: (taskText: string) => `Delete task: ${taskText}`,
  
  darkMode: (isDark: boolean) => 
    isDark ? "Switch to light mode" : "Switch to dark mode",
  
  addTask: "Open form to add new task",
  submitTask: "Add this task to the list",
  cancelTask: "Cancel adding task and close form",
};

export const screenReaderOnly = "sr-only";

export const createAccessibilityProps = (
  label?: string,
  describedBy?: string,
  live?: 'polite' | 'assertive' | 'off',
  hidden?: boolean
): AccessibilityProps => ({
  ...(label && { 'aria-label': label }),
  ...(describedBy && { 'aria-describedby': describedBy }),
  ...(live && { 'aria-live': live }),
  ...(hidden && { 'aria-hidden': hidden }),
});
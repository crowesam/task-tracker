// src/constants/sampleData.ts
import { Task } from '../types';

export const SAMPLE_TASKS: Task[] = [
  { 
    id: 1, 
    text: "Welcome to the demo!", 
    completed: true, 
    priority: "high" 
  },
  { 
    id: 2, 
    text: "Try adding a new task", 
    completed: false, 
    priority: "medium" 
  },
  { 
    id: 3, 
    text: "Toggle dark mode", 
    completed: false, 
    priority: "low" 
  },
  { 
    id: 4, 
    text: "Drag tasks to reorder", 
    completed: false, 
    priority: "high" 
  },
  { 
    id: 5, 
    text: "Mark tasks as complete", 
    completed: false, 
    priority: "medium" 
  }
];

export const DEMO_INSTRUCTIONS = [
  "✨ Try dragging tasks to reorder them",
  "🌙 Toggle between light and dark modes", 
  "✅ Click the circle to mark tasks complete",
  "➕ Add your own tasks to the list",
  "🗑️ Delete tasks you no longer need"
];
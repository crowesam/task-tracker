// src/constants/sampleData.ts
import { Task } from '../types';

export const SAMPLE_TASKS: Task[] = [
  { 
    id: 1, 
    text: "Welcome to the demo!", 
    completed: true, 
    priority: "high",
    createdAt: new Date('2024-01-01T10:00:00Z'),
    category: "Demo"
  },
  { 
    id: 2, 
    text: "Try adding a new task", 
    completed: false, 
    priority: "medium",
    createdAt: new Date('2024-01-01T11:00:00Z'),
    category: "Demo"
  },
  { 
    id: 3, 
    text: "Toggle dark mode", 
    completed: false, 
    priority: "low",
    createdAt: new Date('2024-01-01T12:00:00Z'),
    category: "UI"
  },
  { 
    id: 4, 
    text: "Drag tasks to reorder", 
    completed: false, 
    priority: "high",
    createdAt: new Date('2024-01-01T13:00:00Z'),
    category: "Demo"
  },
  { 
    id: 5, 
    text: "Mark tasks as complete", 
    completed: false, 
    priority: "medium",
    createdAt: new Date('2024-01-01T14:00:00Z'),
    category: "Demo"
  }
];

export const DEMO_INSTRUCTIONS = [
  "✨ Try dragging tasks to reorder them",
  "🌙 Toggle between light and dark modes", 
  "✅ Click the circle to mark tasks complete",
  "➕ Add your own tasks to the list",
  "🗑️ Delete tasks you no longer need"
];

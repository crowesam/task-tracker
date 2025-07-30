// src/constants/sampleData.ts
import { FrontendTask } from '../types';

export const SAMPLE_TASKS: FrontendTask[] = [
  { 
    id: "1", 
    text: "Complete project proposal", 
    completed: false, 
    priority: "high",
    createdAt: new Date('2024-01-15T14:30:00Z'),
    category: "WORK",
    tags: ["urgent", "client"],
    dueDate: new Date('2024-01-20T17:00:00Z'),
    description: "Finalize quarterly project proposal with budget estimates and timeline."
  },
  { 
    id: "2", 
    text: "Plan weekend trip", 
    completed: false, 
    priority: "medium",
    createdAt: new Date('2024-01-14T09:15:00Z'),
    category: "PERSONAL",
    tags: ["travel", "fun"],
    dueDate: new Date('2024-01-25T12:00:00Z'),
    description: "Research destinations, book accommodations, and create itinerary for weekend getaway."
  },
  { 
    id: "3", 
    text: "Buy groceries", 
    completed: false, 
    priority: "low",
    createdAt: new Date('2024-01-16T11:45:00Z'),
    category: "SHOPPING",
    tags: ["weekly", "routine"],
    dueDate: new Date('2024-01-18T18:00:00Z'),
    description: "Weekly grocery shopping including fresh produce, dairy, and household essentials."
  },
  { 
    id: "4", 
    text: "Schedule doctor appointment", 
    completed: true, 
    priority: "medium",
    createdAt: new Date('2024-01-10T15:20:00Z'),
    category: "HEALTH",
    tags: ["health", "annual"],
    description: "Annual checkup and routine blood work with primary care physician."
  },
  { 
    id: "5", 
    text: "Review quarterly reports", 
    completed: false, 
    priority: "high",
    createdAt: new Date('2024-01-12T08:30:00Z'),
    category: "WORK",
    tags: ["review", "quarterly"],
    dueDate: new Date('2024-01-22T17:00:00Z'),
    description: "Analyze Q4 performance metrics and prepare summary for leadership team."
  }
];

export const DEMO_INSTRUCTIONS = [
  "✨ Try dragging tasks to reorder them",
  "🌙 Toggle between light and dark modes", 
  "✅ Click the circle to mark tasks complete",
  "➕ Add your own tasks to the list",
  "🗑️ Delete tasks you no longer need"
];

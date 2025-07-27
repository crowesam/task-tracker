// src/components/index.ts - Main component exports

// UI Components
export * from './ui';

// Feature Components  
export * from './features';

// Layout Components
export * from './layout';

// Organized re-exports for clarity
export {
  // UI Library
  Button,
  Card, 
  Input,
  Badge,
} from './ui';

export {
  // Feature Components
  TaskItem,
  TaskForm,
  TaskList,
  ThemeToggle,
} from './features';

export {
  // Layout Components
  Header,
  BackgroundEffects,
} from './layout';
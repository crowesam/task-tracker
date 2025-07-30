// src/constants/index.ts
export * from './styles';
export * from './sampleData';
// Add this to src/constants/index.ts
export const FLOATING_EFFECTS = {
  particles: {
    enabled: true,
    count: 50,
    color: 'rgba(255, 255, 255, 0.1)',
    size: {
      min: 1,
      max: 4
    },
    speed: {
      min: 0.5,
      max: 2
    }
  },
  bubbles: {
    enabled: true,
    count: 20,
    color: 'rgba(255, 255, 255, 0.05)',
    size: {
      min: 10,
      max: 40
    },
    speed: {
      min: 1,
      max: 3
    }
  },
  floatingShapes: {
    enabled: true,
    count: 15,
    shapes: ['circle', 'triangle', 'square'],
    colors: [
      'rgba(255, 165, 0, 0.1)',  // Orange
      'rgba(0, 255, 255, 0.1)',  // Cyan
      'rgba(255, 255, 0, 0.1)',  // Yellow
      'rgba(128, 0, 128, 0.1)'   // Purple
    ],
    size: {
      min: 20,
      max: 60
    },
    speed: {
      min: 0.3,
      max: 1.5
    }
  },
  animation: {
    duration: {
      min: 10,
      max: 30
    },
    easing: 'ease-in-out'
  }
};
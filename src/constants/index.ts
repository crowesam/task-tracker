// src/constants/index.ts
export * from './styles';
export * from './sampleData';
// Add this to src/constants/index.ts
// Replace the FLOATING_EFFECTS in src/constants/index.ts with this:
// In src/constants/index.ts - COMPLETE FIX:
export const FLOATING_EFFECTS = {
  light: {
    primary: 'bg-gradient-to-br from-orange-400 to-orange-600',    // Orange blob
    secondary: 'bg-gradient-to-br from-cyan-400 to-cyan-600',     // Cyan blob  
    accent: 'bg-gradient-to-br from-purple-400 to-purple-600',    // Purple blob
    particles: {
      enabled: true,
      count: 50,
      color: 'rgba(255, 255, 255, 0.3)',
      size: { min: 1, max: 4 },
      speed: { min: 0.5, max: 2 }
    },
    bubbles: {
      enabled: true,
      count: 20,
      color: 'rgba(255, 255, 255, 0.2)',
      size: { min: 10, max: 40 },
      speed: { min: 1, max: 3 }
    },
    floatingShapes: {
      enabled: true,
      count: 15,
      shapes: ['circle', 'triangle', 'square'],
      colors: [
        'rgba(255, 165, 0, 0.2)',
        'rgba(0, 255, 255, 0.15)',
        'rgba(255, 255, 0, 0.15)',
        'rgba(128, 0, 128, 0.1)'
      ],
      size: { min: 20, max: 60 },
      speed: { min: 0.3, max: 1.5 }
    },
    animation: {
      duration: { min: 10, max: 30 },
      easing: 'ease-in-out'
    }
  },
  dark: {
    primary: 'bg-gradient-to-br from-orange-500/20 to-orange-700/20',    // Dim orange blob
    secondary: 'bg-gradient-to-br from-cyan-500/15 to-cyan-700/15',     // Dim cyan blob
    accent: 'bg-gradient-to-br from-purple-500/15 to-purple-700/15',    // Dim purple blob
    particles: {
      enabled: true,
      count: 40,
      color: 'rgba(255, 255, 255, 0.1)',
      size: { min: 1, max: 3 },
      speed: { min: 0.3, max: 1.5 }
    },
    bubbles: {
      enabled: true,
      count: 15,
      color: 'rgba(255, 255, 255, 0.05)',
      size: { min: 15, max: 50 },
      speed: { min: 0.8, max: 2.5 }
    },
    floatingShapes: {
      enabled: true,
      count: 10,
      shapes: ['circle', 'triangle', 'square'],
      colors: [
        'rgba(255, 165, 0, 0.08)',
        'rgba(0, 255, 255, 0.06)',
        'rgba(255, 255, 0, 0.06)',
        'rgba(128, 0, 128, 0.05)'
      ],
      size: { min: 25, max: 70 },
      speed: { min: 0.2, max: 1.0 }
    },
    animation: {
      duration: { min: 15, max: 40 },
      easing: 'ease-in-out'
    }
  }
};
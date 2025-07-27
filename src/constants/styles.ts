// src/constants/styles.ts
import { PriorityType } from '../types';

// Base glassmorphism effects
export const GLASS_EFFECTS = {
  card: {
    light: 'backdrop-blur-md bg-white/60 border border-white/30',
    dark: 'backdrop-blur-md bg-white/10 border border-white/20',
  },
  button: {
    light: 'backdrop-blur-md bg-white/60 border border-white/30 hover:bg-white/80',
    dark: 'backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20',
  },
  input: {
    light: 'backdrop-blur-md bg-white/60 border border-white/30 focus:border-gray-400',
    dark: 'backdrop-blur-md bg-white/10 border border-white/20 focus:border-white/40',
  }
} as const;

// Background gradients
export const BACKGROUNDS = {
  light: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  dark: 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900',
} as const;

// Priority color mappings
export const PRIORITY_COLORS: Record<PriorityType, string> = {
  high: 'from-red-400/20 to-pink-400/20 border-red-300/30',
  medium: 'from-blue-400/20 to-cyan-400/20 border-blue-300/30',
  low: 'from-green-400/20 to-emerald-400/20 border-green-300/30',
} as const;

// Priority badge colors
export const PRIORITY_BADGES: Record<PriorityType, string> = {
  high: 'bg-red-500/20 text-red-400 border border-red-500/30',
  medium: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  low: 'bg-green-500/20 text-green-400 border border-green-500/30',
} as const;

// Text colors
export const TEXT_COLORS = {
  primary: {
    light: 'text-gray-800',
    dark: 'text-white',
  },
  secondary: {
    light: 'text-gray-600',
    dark: 'text-gray-300',
  },
  muted: {
    light: 'text-gray-500',
    dark: 'text-white/60',
  },
} as const;

// Focus states for accessibility
export const FOCUS_STATES = {
  light: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white',
  dark: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900',
} as const;

// Transitions
export const TRANSITIONS = {
  default: 'transition-all duration-300',
  scale: 'hover:scale-105',
  scaleSmall: 'hover:scale-[1.02]',
} as const;

// Gradient text
export const GRADIENT_TEXT = 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent';

// Helper functions
export const getGlassClasses = (
  variant: keyof typeof GLASS_EFFECTS,
  darkMode: boolean
): string => {
  return GLASS_EFFECTS[variant][darkMode ? 'dark' : 'light'];
};

export const getTextClasses = (
  variant: keyof typeof TEXT_COLORS,
  darkMode: boolean
): string => {
  return TEXT_COLORS[variant][darkMode ? 'dark' : 'light'];
};

export const getFocusClasses = (darkMode: boolean): string => {
  return FOCUS_STATES[darkMode ? 'dark' : 'light'];
};
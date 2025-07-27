// src/utils/styleUtils.ts
import { 
  getGlassClasses, 
  getTextClasses, 
  getFocusClasses,
  PRIORITY_COLORS,
  PRIORITY_BADGES,
  TRANSITIONS 
} from '../constants/styles';
import { PriorityType } from '../types';

export const combineClasses = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const createCardClasses = (darkMode: boolean, completed = false): string => {
  const baseClasses = getGlassClasses('card', darkMode);
  const transitions = TRANSITIONS.default;
  const hover = TRANSITIONS.scaleSmall;
  const opacity = completed ? 'opacity-75' : '';
  
  return combineClasses(baseClasses, transitions, hover, opacity);
};

export const createButtonClasses = (
  darkMode: boolean,
  variant: 'primary' | 'secondary' | 'danger' = 'secondary'
): string => {
  const baseClasses = getGlassClasses('button', darkMode);
  const focusClasses = getFocusClasses(darkMode);
  const transitions = TRANSITIONS.default;
  
  if (variant === 'primary') {
    return combineClasses(
      'px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl',
      transitions,
      TRANSITIONS.scale,
      'font-medium',
      focusClasses
    );
  }
  
  return combineClasses(baseClasses, focusClasses, transitions);
};

export const createInputClasses = (darkMode: boolean): string => {
  const baseClasses = getGlassClasses('input', darkMode);
  const focusClasses = getFocusClasses(darkMode);
  const textClasses = getTextClasses('primary', darkMode);
  const placeholderClasses = darkMode 
    ? 'placeholder-white/50' 
    : 'placeholder-gray-500';
  
  return combineClasses(
    baseClasses,
    focusClasses,
    textClasses,
    placeholderClasses,
    'p-3 rounded-xl outline-none',
    TRANSITIONS.default
  );
};

export const getPriorityClasses = (priority: PriorityType): string => {
  return PRIORITY_COLORS[priority];
};

export const getPriorityBadgeClasses = (priority: PriorityType): string => {
  return PRIORITY_BADGES[priority];
};
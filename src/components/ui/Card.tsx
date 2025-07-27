// src/components/ui/Card.tsx
import React from 'react';
import { combineClasses, createCardClasses } from '@/src/utils';
import { getGlassClasses, TRANSITIONS } from '@/src/constants';
import { AccessibilityProps } from '@/src/types';

interface CardProps extends AccessibilityProps {
  children: React.ReactNode;
  darkMode?: boolean;
  variant?: 'default' | 'interactive' | 'elevated';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  gradient?: boolean;
  backgroundOpacity?: 'light' | 'medium' | 'heavy';
}

export const Card: React.FC<CardProps> = ({
  children,
  darkMode = false,
  variant = 'default',
  padding = 'md',
  className,
  onClick,
  as: Component = 'div',
  gradient = false,
  backgroundOpacity = 'medium',
  role,
  'aria-label': ariaLabel,
  ...accessibilityProps
}) => {
  const getVariantClasses = (): string => {
    const baseGlass = getGlassClasses('card', darkMode);
    
    switch (variant) {
      case 'interactive':
        return combineClasses(
          baseGlass,
          TRANSITIONS.default,
          TRANSITIONS.scaleSmall,
          'cursor-pointer',
          darkMode ? 'hover:bg-white/15' : 'hover:bg-white/80'
        );
      case 'elevated':
        return combineClasses(
          baseGlass,
          'shadow-xl',
          darkMode ? 'shadow-black/20' : 'shadow-gray-200/50'
        );
      default:
        return baseGlass;
    }
  };

  const getPaddingClasses = (): string => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-12';
      default: // md
        return 'p-6';
    }
  };

  const getBackgroundOpacity = (): string => {
    if (!gradient) return '';
    
    switch (backgroundOpacity) {
      case 'light':
        return darkMode 
          ? 'bg-gradient-to-br from-white/5 to-white/10'
          : 'bg-gradient-to-br from-white/30 to-white/50';
      case 'heavy':
        return darkMode
          ? 'bg-gradient-to-br from-white/15 to-white/25'
          : 'bg-gradient-to-br from-white/70 to-white/90';
      default: // medium
        return darkMode
          ? 'bg-gradient-to-br from-white/8 to-white/15'
          : 'bg-gradient-to-br from-white/50 to-white/70';
    }
  };

  const cardClasses = combineClasses(
    // Base glassmorphism
    'rounded-2xl border',
    // Variant styles
    getVariantClasses(),
    // Padding
    getPaddingClasses(),
    // Background gradient
    getBackgroundOpacity(),
    // Custom classes
    className
  );

  const componentProps = {
    className: cardClasses,
    onClick: variant === 'interactive' ? onClick : undefined,
    role: onClick ? 'button' : role,
    'aria-label': ariaLabel,
    tabIndex: onClick ? 0 : undefined,
    onKeyDown: onClick 
      ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }
      : undefined,
    ...accessibilityProps,
  };

  return <Component {...componentProps}>{children}</Component>;
};

export default Card;

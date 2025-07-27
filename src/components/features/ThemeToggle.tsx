// src/components/features/ThemeToggle.tsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/src/components/ui';
import { createButtonAriaLabel } from '@/src/utils';
import { combineClasses } from '@/src/utils';
import { TRANSITIONS } from '@/src/constants';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'icon' | 'switch';
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  onToggle,
  size = 'md',
  variant = 'icon',
  className,
  showLabel = false,
}) => {
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 28 : 24;

  if (variant === 'switch') {
    return (
      <div className={combineClasses('flex items-center gap-3', className)}>
        {showLabel && (
          <span className={`text-sm font-medium ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        )}
        
        <button
          onClick={onToggle}
          className={combineClasses(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            TRANSITIONS.default,
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            darkMode 
              ? 'bg-blue-600 focus:ring-offset-gray-900' 
              : 'bg-gray-200 focus:ring-offset-white'
          )}
          role="switch"
          aria-checked={darkMode}
          aria-label={createButtonAriaLabel.darkMode(darkMode)}
          type="button"
        >
          <span
            className={combineClasses(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              TRANSITIONS.default,
              darkMode ? 'translate-x-6' : 'translate-x-1'
            )}
          >
            <span className="sr-only">
              {darkMode ? 'Dark' : 'Light'} mode
            </span>
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <Button
        onClick={onToggle}
        variant="secondary"
        size={size}
        darkMode={darkMode}
        aria-label={createButtonAriaLabel.darkMode(darkMode)}
        className={className}
        icon={darkMode ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      >
        {showLabel && (darkMode ? 'Light Mode' : 'Dark Mode')}
      </Button>
    );
  }

  // Default: icon variant
  return (
    <button
      onClick={onToggle}
      aria-label={createButtonAriaLabel.darkMode(darkMode)}
      className={combineClasses(
        'p-3 rounded-xl backdrop-blur-md border transition-all duration-300',
        'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        darkMode 
          ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20 focus:ring-offset-gray-900' 
          : 'bg-white/60 border-white/30 text-gray-700 hover:bg-white/80 focus:ring-offset-white',
        className
      )}
      type="button"
    >
      {darkMode ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      
      {showLabel && (
        <span className="sr-only">
          {createButtonAriaLabel.darkMode(darkMode)}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;

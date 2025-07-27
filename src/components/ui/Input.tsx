// src/components/ui/Input.tsx
import React, { forwardRef } from 'react';
import { combineClasses, createInputClasses } from '@/src/utils';
import { getFocusClasses, getTextClasses } from '@/src/constants';
import { AccessibilityProps } from '@/src/types';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, AccessibilityProps {
  darkMode?: boolean;
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  darkMode = false,
  label,
  error,
  helpText,
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  className,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;
  
  const describedBy = combineClasses(
    ariaDescribedBy,
    errorId,
    helpId
  );

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-4 py-4 text-lg';
      default: // md
        return 'px-3 py-3';
    }
  };

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'filled':
        return darkMode
          ? 'bg-white/15 border-white/30'
          : 'bg-gray-50 border-gray-200';
      case 'outline':
        return darkMode
          ? 'bg-transparent border-white/40'
          : 'bg-transparent border-gray-300';
      default:
        return createInputClasses(darkMode);
    }
  };

  const inputClasses = combineClasses(
    // Base styles
    'w-full rounded-xl outline-none transition-all duration-300',
    // Size
    getSizeClasses(),
    // Variant styles
    getVariantClasses(),
    // Text styles
    getTextClasses('primary', darkMode),
    // Placeholder styles
    darkMode ? 'placeholder-white/50' : 'placeholder-gray-500',
    // Focus styles
    getFocusClasses(darkMode),
    // Error state
    error && (darkMode 
      ? 'border-red-400 focus:ring-red-400' 
      : 'border-red-500 focus:ring-red-500'
    ),
    // Icon padding
    icon && iconPosition === 'left' && 'pl-10',
    icon && iconPosition === 'right' && 'pr-10',
    // Custom classes
    className
  );

  const containerClasses = 'relative w-full';

  const iconClasses = combineClasses(
    'absolute top-1/2 transform -translate-y-1/2 pointer-events-none',
    iconPosition === 'left' ? 'left-3' : 'right-3',
    darkMode ? 'text-white/50' : 'text-gray-400'
  );

  const labelClasses = combineClasses(
    'block text-sm font-medium mb-2',
    getTextClasses('primary', darkMode)
  );

  const errorClasses = combineClasses(
    'mt-1 text-sm',
    darkMode ? 'text-red-400' : 'text-red-600'
  );

  const helpClasses = combineClasses(
    'mt-1 text-sm',
    getTextClasses('secondary', darkMode)
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        {icon && (
          <div className={iconClasses} aria-hidden="true">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-describedby={describedBy || undefined}
          aria-label={ariaLabel}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
      </div>

      {error && (
        <div id={errorId} className={errorClasses} role="alert">
          {error}
        </div>
      )}

      {helpText && (
        <div id={helpId} className={helpClasses}>
          {helpText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
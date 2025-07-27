// src/components/ui/Button.tsx
import React from 'react';
import { combineClasses, createButtonClasses } from '@/src/utils';
import { getFocusClasses, TRANSITIONS } from '@/src/constants';
import { AccessibilityProps } from '@/src/types';

interface ButtonProps extends AccessibilityProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  darkMode?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  darkMode = false,
  className,
  type = 'button',
  icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...accessibilityProps
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0';
      case 'danger':
        return darkMode
          ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
          : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100';
      case 'ghost':
        return darkMode
          ? 'bg-transparent text-white/70 border-white/20 hover:bg-white/10'
          : 'bg-transparent text-gray-600 border-gray-200 hover:bg-gray-50';
      default: // secondary
        return createButtonClasses(darkMode, 'secondary');
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default: // md
        return 'px-6 py-3';
    }
  };

  const buttonClasses = combineClasses(
    // Base classes
    'inline-flex items-center justify-center gap-3 rounded-xl border font-medium',
    // Size classes
    getSizeClasses(),
    // Variant classes  
    getVariantClasses(),
    // Interactive states
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : combineClasses(
          TRANSITIONS.default,
          TRANSITIONS.scale,
          getFocusClasses(darkMode),
          'cursor-pointer'
        ),
    // Custom classes
    className
  );

  const iconElement = icon && (
    <span className="flex-shrink-0" aria-hidden="true">
      {icon}
    </span>
  );

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...accessibilityProps}
    >
      {iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export default Button;

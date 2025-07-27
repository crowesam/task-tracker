// src/components/ui/Badge.tsx
import React from 'react';
import { combineClasses } from '@/src/utils';
import { getPriorityBadgeClasses } from '@/src/utils';
import { PriorityType } from '@/src/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: PriorityType | 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
  className?: string;
  icon?: React.ReactNode;
  'aria-label'?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  darkMode = false,
  className,
  icon,
  'aria-label': ariaLabel,
}) => {
  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default: // md
        return 'px-3 py-1 text-xs';
    }
  };

  const getVariantClasses = (): string => {
    // Handle priority variants
    if (variant === 'high' || variant === 'medium' || variant === 'low') {
      return getPriorityBadgeClasses(variant);
    }

    // Handle other variants
    switch (variant) {
      case 'success':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return darkMode
          ? 'bg-white/10 text-white border border-white/20'
          : 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const badgeClasses = combineClasses(
    // Base styles
    'inline-flex items-center gap-1 rounded-full font-medium',
    // Size classes
    getSizeClasses(),
    // Variant classes
    getVariantClasses(),
    // Custom classes
    className
  );

  return (
    <div className={badgeClasses} aria-label={ariaLabel}>
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export default Badge;
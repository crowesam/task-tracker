// src/components/layout/BackgroundEffects.tsx
import React from 'react';
import { FLOATING_EFFECTS } from '@/src/constants';

interface BackgroundEffectsProps {
  darkMode: boolean;
  variant?: 'default' | 'minimal' | 'enhanced';
  animated?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  darkMode,
  variant = 'default',
  animated = true,
}) => {
  const effects = FLOATING_EFFECTS[darkMode ? 'dark' : 'light'];

  const getAnimationClasses = (index: number): string => {
    if (!animated) return '';
    
    const animations = [
      'animate-pulse',
      'animate-bounce',
      'animate-ping',
    ];
    
    return `${animations[index % animations.length]} animation-delay-${index * 2}s`;
  };

  const baseEffectClasses = 'absolute rounded-full blur-3xl pointer-events-none';

  const getEffectSize = (type: 'small' | 'medium' | 'large'): string => {
    switch (type) {
      case 'small':
        return 'w-48 h-48';
      case 'large':
        return 'w-96 h-96';
      default:
        return 'w-72 h-72';
    }
  };

  const getOpacity = (): string => {
    switch (variant) {
      case 'minimal':
        return 'opacity-10';
      case 'enhanced':
        return 'opacity-40';
      default:
        return 'opacity-30';
    }
  };

  const effectConfigs = [
    {
      color: effects.primary,
      size: 'medium' as const,
      position: 'top-20 left-20',
      opacity: getOpacity(),
    },
    {
      color: effects.secondary,
      size: 'large' as const,
      position: 'bottom-20 right-20',
      opacity: 'opacity-20',
    },
    {
      color: effects.accent,
      size: 'medium' as const,
      position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      opacity: 'opacity-25',
    },
  ];

  if (variant === 'enhanced') {
    effectConfigs.push(
      {
        color: effects.primary,
        size: 'small' as const,
        position: 'top-1/4 right-1/4',
        opacity: 'opacity-20',
      },
      {
        color: effects.accent,
        size: 'small' as const,
        position: 'bottom-1/4 left-1/4',
        opacity: 'opacity-15',
      }
    );
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      aria-hidden="true"
      role="presentation"
    >
      {effectConfigs.map((effect, index) => (
        <div
          key={index}
          className={`
            ${baseEffectClasses}
            ${effect.position}
            ${getEffectSize(effect.size)}
            ${effect.opacity}
            ${effect.color}
            ${getAnimationClasses(index)}
          `}
          style={{
            animationDuration: `${4 + index * 2}s`,
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}
      
      {/* Additional ambient glow effect */}
      {variant === 'enhanced' && (
        <div className={`
          absolute inset-0 
          bg-gradient-to-br 
          ${darkMode 
            ? 'from-purple-900/10 via-transparent to-blue-900/10' 
            : 'from-blue-100/20 via-transparent to-purple-100/20'
          }
          pointer-events-none
        `} />
      )}
    </div>
  );
};

export default BackgroundEffects;

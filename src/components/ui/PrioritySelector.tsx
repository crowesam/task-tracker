'use client';

import React from 'react';

interface PrioritySelectorProps {
  selectedPriority: 'high' | 'medium' | 'low';
  onPriorityChange: (priority: 'high' | 'medium' | 'low') => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ 
  selectedPriority, 
  onPriorityChange 
}) => {
  const priorities = [
    { 
      value: 'high' as const, 
      label: 'High', 
      gradient: 'from-red-500 to-red-600',
      shadow: 'hover:shadow-red-500/25',
      activeShadow: 'shadow-red-500/40'
    },
    { 
      value: 'medium' as const, 
      label: 'Medium', 
      gradient: 'from-yellow-500 to-yellow-600',
      shadow: 'hover:shadow-yellow-500/25',
      activeShadow: 'shadow-yellow-500/40'
    },
    { 
      value: 'low' as const, 
      label: 'Low', 
      gradient: 'from-green-500 to-green-600',
      shadow: 'hover:shadow-green-500/25',
      activeShadow: 'shadow-green-500/40'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-white font-semibold text-sm tracking-wide uppercase">
        Priority Level
      </label>
      
      <div className="grid grid-cols-3 gap-4">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onPriorityChange(priority.value)}
            className={`
              relative px-6 py-4 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r ${priority.gradient}
              transition-all duration-300 ease-out
              hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${priority.shadow}
              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
              ${selectedPriority === priority.value 
                ? `scale-105 -translate-y-1 shadow-xl ${priority.activeShadow} ring-2 ring-white/30` 
                : ''
              }
            `}
            style={{
              background: selectedPriority === priority.value 
                ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to)), linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`
                : undefined
            }}
          >
            {/* Priority indicator dot */}
            <div className={`
              absolute top-3 left-3 w-2 h-2 rounded-full
              ${selectedPriority === priority.value ? 'bg-white/80' : 'bg-white/50'}
              transition-all duration-300
            `} />
            
            {/* Button text */}
            <span className="relative z-10 tracking-wide">
              {priority.label}
            </span>
            
            {/* Selected state glow */}
            {selectedPriority === priority.value && (
              <div className={`
                absolute inset-0 rounded-xl opacity-30
                bg-gradient-to-r ${priority.gradient}
                blur-sm scale-110 -z-10
                animate-pulse
              `} />
            )}
            
            {/* Hover glow effect */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
              bg-gradient-to-r ${priority.gradient}
              blur-md scale-110 -z-10
              transition-opacity duration-300
            `} />
          </button>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="text-white/60 text-xs mt-2">
        Priority affects the colored corner indicator on your task card
      </p>
    </div>
  );
};

export default PrioritySelector;
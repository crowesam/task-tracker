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
      {/* SINGLE ROW LAYOUT - COMPACT */}
      <div className="flex gap-3">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onPriorityChange(priority.value)}
            className={`
              flex-1 px-4 py-3 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r ${priority.gradient}
              transition-all duration-300 ease-out
              hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg ${priority.shadow}
              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
              border-2 border-transparent
              ${selectedPriority === priority.value 
                ? `scale-105 -translate-y-0.5 shadow-lg ${priority.activeShadow} ring-2 ring-white/30 border-white/50` 
                : ''
              }
            `}
          >
            {/* Priority indicator dot */}
            <div className={`
              w-2 h-2 rounded-full mx-auto mb-1
              ${selectedPriority === priority.value ? 'bg-white/80' : 'bg-white/50'}
              transition-all duration-300
            `} />
            
            {/* Button text */}
            <span className="text-xs font-bold tracking-wide uppercase">
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
          </button>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="text-gray-600 text-xs">
        Priority affects the colored corner indicator on your task card
      </p>
    </div>
  );
};

export default PrioritySelector;
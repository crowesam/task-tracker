// src/components/ui/TrophyCaseButton.tsx
'use client'

import React from 'react';
import { Trophy } from 'lucide-react';

interface TrophyCaseButtonProps {
  onClick: () => void;
  badgeCount: number;
  className?: string;
}

const TrophyCaseButton: React.FC<TrophyCaseButtonProps> = ({ 
  onClick, 
  badgeCount, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-3 px-6 py-3 
                 bg-gradient-to-r from-yellow-500 to-yellow-600 
                 hover:from-yellow-600 hover:to-yellow-700
                 text-white rounded-full font-semibold
                 transition-all duration-300 hover:scale-105 
                 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25
                 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 
                 active:scale-95 ${className}`}
      aria-label={`View trophy case with ${badgeCount} badges`}
    >
      <Trophy className="w-5 h-5" />
      <span>Trophy Case</span>
      
      {/* Badge Counter */}
      {badgeCount > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white 
                        rounded-full flex items-center justify-center text-xs font-bold
                        animate-pulse">
          {badgeCount}
        </div>
      )}
    </button>
  );
};

export default TrophyCaseButton;
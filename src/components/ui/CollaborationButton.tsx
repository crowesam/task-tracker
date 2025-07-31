'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface CollaborationButtonProps {
  onClick: () => void;
  className?: string;
}

const CollaborationButton: React.FC<CollaborationButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 px-8 py-4 
                 bg-gradient-to-r from-purple-500 to-purple-600 
                 hover:from-purple-600 hover:to-purple-700
                 text-white rounded-full font-semibold text-lg
                 transition-all duration-300 hover:scale-105 
                 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25
                 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                 active:scale-95 ${className}`}
      aria-label="Open collaboration features"
    >
      <Users className="w-5 h-5" />
      Collaboration
    </button>
  );
};

export default CollaborationButton;
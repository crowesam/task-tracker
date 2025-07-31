'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersButtonProps {
  onClick: () => void;
  className?: string;
}

const FiltersButton: React.FC<FiltersButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 px-8 py-4 
                 bg-gradient-to-r from-blue-500 to-blue-600 
                 hover:from-blue-600 hover:to-blue-700
                 text-white rounded-full font-semibold text-lg
                 transition-all duration-300 hover:scale-105 
                 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                 active:scale-95 ${className}`}
      aria-label="Open filters"
    >
      <Filter className="w-5 h-5" />
      Filters
    </button>
  );
};

export default FiltersButton;
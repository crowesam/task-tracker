'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
  className?: string;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-3 px-8 py-4 
                   bg-gradient-to-r from-orange-500 to-orange-600 
                   hover:from-orange-600 hover:to-orange-700
                   text-white rounded-full font-semibold text-lg
                   transition-all duration-300 hover:scale-105 
                   shadow-xl hover:shadow-2xl hover:shadow-orange-500/25
                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                   active:scale-95"
        aria-label="Add new task"
      >
        <Plus className="w-5 h-5" />
        Add New Task
      </button>
    </div>
  );
};

export default AddTaskButton;
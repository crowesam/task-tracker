'use client';

import React, { useState } from 'react';
import { Trash2, Clock, Edit } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  description?: string;
  category?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  tags: string[];
}

interface GlassTaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;  // New edit handler
}

const GlassTaskCard: React.FC<GlassTaskCardProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  const formatDueDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });
  };

  return (
    <div 
      className={`
        task-card relative w-full h-[400px] rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md border border-white/20
        transition-all duration-500 ease-out cursor-pointer group
        ${isHovered ? 'scale-[1.02] -translate-y-2 bg-white/15 shadow-2xl shadow-black/20' : 'hover:scale-[1.02] hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority Corner Indicator */}
      <div className="absolute top-0 left-0 overflow-hidden rounded-tl-2xl">
        <div 
          className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(task.priority)} transform rotate-45 -translate-x-6 -translate-y-6`}
        />
      </div>

      {/* Header with Category and Completion Button */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="text-orange-500 font-bold text-sm tracking-wider uppercase">
          {task.category || 'CATEGORY'}
        </div>
        
        {/* Animated Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className={`
            relative w-8 h-8 rounded-full border-2 transition-all duration-300
            ${task.completed 
              ? 'bg-green-500 border-green-500 scale-110' 
              : 'bg-white/20 border-white/40 hover:border-white/60 hover:bg-white/30'
            }
          `}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <div className={`
            absolute inset-0 rounded-full transition-all duration-300
            ${task.completed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}>
            <svg 
              className="w-full h-full text-white p-1.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Task Content */}
      <div className="px-6 pb-4 space-y-4">
        <h3 className="text-white text-xl font-bold leading-tight">
          {task.text}
        </h3>
        
        {task.description && (
          <p className="text-white/80 text-sm leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Created Date */}
        <div className="text-white/60 text-xs font-medium">
          CREATED: {formatDate(task.createdAt)}
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/20 text-white/90 text-xs font-medium rounded-full border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Section with Edit + Delete Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
        {/* Due Date */}
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            DUE DATE: <span className="text-white">{formatDueDate(task.dueDate) || 'Not set'}</span>
          </span>
        </div>

        {/* Action Buttons - Edit + Delete */}
        <div className="flex items-center space-x-2">
          {/* Edit Button - NEW! */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task.id);
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
                       flex items-center justify-center shadow-lg transition-all duration-300 
                       hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                       flex items-center justify-center shadow-lg transition-all duration-300 
                       hover:scale-110 hover:shadow-xl hover:shadow-red-500/25"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Animated Border Effect on Hover */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500
        ${isHovered ? 'bg-gradient-to-r from-transparent via-white/5 to-transparent' : ''}
      `} />
    </div>
  );
};

export default GlassTaskCard;
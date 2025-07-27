// src/components/features/TaskItem.tsx
import React from 'react';
import { CheckCircle, X, Grip } from 'lucide-react';
import { Card, Button, Badge } from '@/src/components/ui';
import { combineClasses } from '@/src/utils';
import { createButtonAriaLabel, createTaskAriaLabel } from '@/src/utils';
import { getPriorityClasses, TRANSITIONS } from '@/src/constants';
import { Task } from '@/src/types';

interface TaskItemProps {
  task: Task;
  index: number;
  darkMode: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  isDragging?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  darkMode,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
}) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      handleDelete();
    }
  };

  const cardClasses = combineClasses(
    'cursor-move bg-gradient-to-r',
    getPriorityClasses(task.priority),
    task.completed && 'opacity-75',
    isDragging && 'scale-105 rotate-2 z-50'
  );

  const textClasses = combineClasses(
    'flex-1 transition-all duration-300',
    task.completed 
      ? `line-through ${darkMode ? 'text-white/50' : 'text-gray-500'}` 
      : darkMode ? 'text-white' : 'text-gray-800'
  );

  const toggleButtonClasses = combineClasses(
    'flex-shrink-0 p-1 rounded-lg transition-all duration-300',
    TRANSITIONS.default,
    'hover:scale-110',
    task.completed 
      ? 'text-green-500' 
      : darkMode 
        ? 'text-white/50 hover:text-green-400' 
        : 'text-gray-400 hover:text-green-500'
  );

  const deleteButtonClasses = combineClasses(
    'flex-shrink-0 p-1 rounded-lg transition-all duration-300',
    TRANSITIONS.default,
    'hover:scale-110',
    darkMode 
      ? 'text-white/50 hover:text-red-400 hover:bg-red-500/20' 
      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
  );

  return (
    <Card
      variant="interactive"
      darkMode={darkMode}
      className={cardClasses}
      padding="md"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      aria-label={createTaskAriaLabel(task.text, task.priority, task.completed)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="listitem"
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <div 
          className={`${darkMode ? 'text-white/40' : 'text-gray-400'} cursor-grab active:cursor-grabbing`} 
          aria-hidden="true"
          title="Drag to reorder"
        >
          <Grip size={20} />
        </div>
        
        {/* Toggle Complete Button */}
        <button
          onClick={handleToggle}
          className={toggleButtonClasses}
          aria-label={createButtonAriaLabel.toggle(task.text, task.completed)}
          type="button"
        >
          <CheckCircle 
            size={24} 
            fill={task.completed ? 'currentColor' : 'none'} 
          />
        </button>
        
        {/* Task Text */}
        <span className={textClasses} aria-live="polite">
          {task.text}
        </span>
        
        {/* Priority Badge */}
        <Badge 
          variant={task.priority}
          size="sm"
          aria-label={`Priority: ${task.priority}`}
        >
          {task.priority}
        </Badge>
        
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={deleteButtonClasses}
          aria-label={createButtonAriaLabel.delete(task.text)}
          type="button"
        >
          <X size={18} />
        </button>
      </div>
    </Card>
  );
};

export default TaskItem;
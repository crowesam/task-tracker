'use client';

import React, { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import PrioritySelector from './PrioritySelector';
import TagInput from './TagInput';

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

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

// Move FormInput component OUTSIDE the main component
const FormInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  icon: Icon,
  error,
  fieldName,
  maxLength,
  focusedField,
  onFocus,
  onBlur,
  ...props 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  fieldName: string;
  maxLength?: number;
  focusedField: string | null;
  onFocus: (fieldName: string) => void;
  onBlur: () => void;
}) => (
  <div className="space-y-3 mb-6">
    <label className="block text-black font-semibold text-sm tracking-wide uppercase">
      {label}
    </label>
    
    <div 
      className={`
        relative flex items-center border-2 transition-all duration-300
        ${focusedField === fieldName
          ? 'border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.01]' 
          : error 
            ? 'border-red-500'
            : 'border-gray-300 hover:border-gray-400'
        }
      `}
      style={{ 
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)'
      }}
    >
      {Icon && fieldName !== 'title' && (
        <Icon className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocus(fieldName)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          flex-1 px-4 py-3 bg-transparent text-gray-700 placeholder-gray-400
          focus:outline-none text-sm font-medium
          ${Icon && fieldName !== 'title' ? 'pl-2' : ''}
        `}
        style={{ borderRadius: '12px' }}
        {...props}
      />
    </div>
    
    {error && (
      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

// Move FormTextarea component OUTSIDE the main component
const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  fieldName,
  maxLength,
  rows = 3,
  focusedField,
  onFocus,
  onBlur
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  fieldName: string;
  maxLength?: number;
  rows?: number;
  focusedField: string | null;
  onFocus: (fieldName: string) => void;
  onBlur: () => void;
}) => (
  <div className="space-y-3 mb-6">
    <label className="block text-black font-semibold text-sm tracking-wide uppercase">
      {label}
    </label>
    
    <div 
      className={`
        relative border-2 transition-all duration-300
        ${focusedField === fieldName
          ? 'border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.01]' 
          : error 
            ? 'border-red-500'
            : 'border-gray-300 hover:border-gray-400'
        }
      `}
      style={{ 
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocus(fieldName)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full px-4 py-3 bg-transparent text-gray-700 placeholder-gray-400
                   focus:outline-none text-sm font-medium resize-none"
        style={{ borderRadius: '12px' }}
      />
    </div>
    
    {error && (
      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  // Form state
  const [title, setTitle] = useState(task?.text || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState(task?.category || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(task?.priority || 'medium');
  const [tags, setTags] = useState<string[]>(task?.tags || []);
  const [dueDate, setDueDate] = useState<string>(
    task?.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );

  // Focus states for enhanced UX
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form validation
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const isEditing = !!task;

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (category && category.length > 20) {
      newErrors.category = 'Category must be less than 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      text: title.trim(),
      description: description.trim() || undefined,
      category: category.trim().toUpperCase() || undefined,
      priority,
      completed: task?.completed || false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags,
      updatedAt: new Date()
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Task Title */}
      <FormInput
        label="Task Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter task title..."
        error={errors.title}
        fieldName="title"
        maxLength={100}
        focusedField={focusedField}
        onFocus={setFocusedField}
        onBlur={() => setFocusedField(null)}
      />

      {/* Task Description */}
      <FormTextarea
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Add a detailed description (optional)..."
        error={errors.description}
        fieldName="description"
        maxLength={500}
        rows={4}
        focusedField={focusedField}
        onFocus={setFocusedField}
        onBlur={() => setFocusedField(null)}
      />

      {/* Category and Due Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <FormInput
          label="Category"
          value={category}
          onChange={setCategory}
          placeholder="e.g., WORK, PERSONAL..."
          icon={FileText}
          error={errors.category}
          fieldName="category"
          maxLength={20}
          focusedField={focusedField}
          onFocus={setFocusedField}
          onBlur={() => setFocusedField(null)}
        />

        {/* Due Date */}
        <FormInput
          label="Due Date"
          value={dueDate}
          onChange={setDueDate}
          type="date"
          icon={Calendar}
          fieldName="dueDate"
          focusedField={focusedField}
          onFocus={setFocusedField}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Priority Selector */}
      <div className="space-y-2">
        <label className="block text-black font-semibold text-sm tracking-wide uppercase">
          Priority Level
        </label>
        <PrioritySelector
          selectedPriority={priority}
          onPriorityChange={setPriority}
        />
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <label className="block text-black font-semibold text-sm tracking-wide uppercase">
          Tags (Max 8)
        </label>
        <TagInput
          tags={tags}
          onTagsChange={setTags}
          maxTags={8}
          maxTagLength={8}
        />
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-semibold text-gray-700
                     bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400
                     transition-all duration-300 hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title.trim()}
          className={`
            px-8 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-orange-500 to-orange-600
            hover:from-orange-600 hover:to-orange-700
            transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25
            focus:outline-none focus:ring-2 focus:ring-orange-500/50
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${title.trim() ? 'shadow-lg' : ''}
          `}
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>

      {/* Form Helper */}
      <div className="text-center">
        <p className="text-gray-500 text-xs">
          {isEditing ? 'Edit your task details above' : 'Fill in the details to create your new task'}
        </p>
      </div>
    </form>
  );
};

export default TaskForm;
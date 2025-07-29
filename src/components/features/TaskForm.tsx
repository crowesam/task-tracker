// src/components/features/TaskForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Card, Button, Input } from '@/src/components/ui';
import { combineClasses } from '@/src/utils';
import { createTask } from '@/src/utils';
import { PriorityType, Task } from '@/src/types';

interface TaskFormProps {
  darkMode: boolean;
  onAddTask: (task: Task) => void;
  showForm: boolean;
  onToggleForm: () => void;
  placeholder?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  darkMode,
  onAddTask,
  showForm,
  onToggleForm,
  placeholder = "What needs to be done?"
}) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<PriorityType>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  const handleSubmit = async () => {
    if (!taskText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const newTask = createTask(taskText.trim(), priority);
      onAddTask(newTask);
      
      // Reset form
      setTaskText('');
      setPriority('medium');
      onToggleForm(); // Close form after successful add
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setTaskText('');
    setPriority('medium');
    onToggleForm();
  };

  const priorityOptions: { value: PriorityType; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'text-green-400' },
    { value: 'medium', label: 'Medium', color: 'text-blue-400' },
    { value: 'high', label: 'High', color: 'text-red-400' },
  ];

  if (!showForm) {
    return (
      <Card darkMode={darkMode} padding={'md' as const}>
        <Button
          onClick={onToggleForm}
          variant="ghost"
          darkMode={darkMode}
          aria-label="Open form to add new task"
          className="w-full border-2 border-dashed"
          icon={<Plus size={20} />}
        >
          Add New Task
        </Button>
      </Card>
    );
  }

  return (
    <Card 
      darkMode={darkMode} 
      padding={'md' as const}
      role="form" 
      aria-label="New task form"
    >
      <div className="space-y-4">
        {/* Task Input */}
        <Input
          ref={inputRef}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          darkMode={darkMode}
          label="Task Description"
          size="lg"
          aria-describedby="task-input-help"
          disabled={isSubmitting}
        />
        
        <div id="task-input-help" className="sr-only">
          Enter a task description and press Enter or click Add to create the task
        </div>

        {/* Priority Selector */}
        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Priority
          </label>
          <div className="flex gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPriority(option.value)}
                disabled={isSubmitting}
                className={combineClasses(
                  'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  'border backdrop-blur-md',
                  priority === option.value
                    ? darkMode
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/80 border-gray-400 text-gray-800'
                    : darkMode
                      ? 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                      : 'bg-white/40 border-white/30 text-gray-600 hover:bg-white/60',
                  option.color
                )}
                type="button"
                aria-pressed={priority === option.value ? 'true' : 'false'}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={!taskText.trim() || isSubmitting}
            aria-label="Add this task to the list"
            className="flex-1"
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
          
          <Button
            onClick={handleCancel}
            variant="ghost"
            darkMode={darkMode}
            disabled={isSubmitting}
            aria-label="Cancel adding task and close form"
            icon={<X size={20} />}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskForm;

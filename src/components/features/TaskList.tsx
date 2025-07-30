// src/components/features/TaskList.tsx
import React from 'react';
import { TaskItem } from './TaskItem';
import { Card } from '@/src/components/ui';
import { FrontendTask } from '@/src/types';
import { FilterState } from '@/src/types/filters';

interface TaskListProps {
  tasks: FrontendTask[];
  darkMode: boolean;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateDueDate?: (id: string, dueDate: Date | null) => void;
  filters: FilterState;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  darkMode,
  onToggleTask,
  onDeleteTask,
  onUpdateDueDate,
  filters,
}) => {
  // Apply filters to tasks
  const filteredTasks = tasks.filter(task => {
    // Category filter
    if (filters.selectedCategory && task.category !== filters.selectedCategory) {
      return false;
    }

    // Tags filter (show if task has ANY of the selected tags)
    if (filters.selectedTags.length > 0) {
      const hasSelectedTag = filters.selectedTags.some(selectedTag => 
        task.tags.includes(selectedTag)
      );
      if (!hasSelectedTag) {
        return false;
      }
    }

    // Search filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        task.text.toLowerCase().includes(searchLower) ||
        task.category?.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) {
        return false;
      }
    }

    // Completion filter
    if (!filters.showCompleted && task.completed) {
      return false;
    }

    return true;
  });

  const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div className="col-span-full">
      <Card 
        darkMode={darkMode} 
        padding="xl" 
        className="text-center backdrop-blur-md"
        role="status"
        aria-live="polite"
      >
        <div className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
          <p className="text-lg">{message}</p>
        </div>
      </Card>
    </div>
  );

  // Handle empty states
  if (tasks.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-3">
        <EmptyState message="No tasks yet. Add one above to get started!" />
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-3">
        <EmptyState message="No tasks match your current filters." />
      </div>
    );
  }

  return (
    <section aria-label="Task list">
      <h2 className="sr-only">Your Tasks</h2>
      
      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            darkMode={darkMode}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onUpdateDueDate={onUpdateDueDate}
          />
        ))}
      </div>

      {/* Task Statistics */}
      <div className={`mt-8 text-center text-sm ${
        darkMode ? 'text-white/60' : 'text-gray-500'
      }`}>
        <p>
          Showing {filteredTasks.length} of {tasks.length} tasks
          {filteredTasks.filter(t => t.completed).length > 0 && (
            <span> • {filteredTasks.filter(t => t.completed).length} completed</span>
          )}
        </p>
      </div>
    </section>
  );
};

export default TaskList;

// src/components/features/TaskList.tsx
import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { Card } from '@/src/components/ui';
import { getTasksByCompletion } from '@/src/utils';
import { Task } from '@/src/types';

interface TaskListProps {
  tasks: Task[];
  darkMode: boolean;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onReorderTasks: (fromIndex: number, toIndex: number) => void;
  showCompleted?: boolean;
  groupByCompletion?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  darkMode,
  onToggleTask,
  onDeleteTask,
  onReorderTasks,
  showCompleted = true,
  groupByCompletion = false,
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    setDraggedItem(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number): void => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const fromIndex = draggedItem;
    if (fromIndex !== dropIndex) {
      onReorderTasks(fromIndex, dropIndex);
    }
    
    setDraggedItem(null);
  };

  const handleDragEnd = (): void => {
    setDraggedItem(null);
  };

  // Filter tasks based on showCompleted
  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  // Group tasks if requested
  const taskGroups = groupByCompletion 
    ? getTasksByCompletion(filteredTasks)
    : { all: filteredTasks };

  const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <Card 
      darkMode={darkMode} 
      padding="xl" 
      className="text-center"
      role="status"
      aria-live="polite"
    >
      <div className={`${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
        <p className="text-lg">{message}</p>
      </div>
    </Card>
  );

  const TaskSection: React.FC<{ 
    title?: string;
    tasks: Task[];
    startIndex: number;
  }> = ({ title, tasks: sectionTasks, startIndex }) => (
    <div>
      {title && (
        <h3 className={`text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {title} ({sectionTasks.length})
        </h3>
      )}
      
      <div className="space-y-4" role="list">
        {sectionTasks.map((task, index) => {
          const actualIndex = startIndex + index;
          return (
            <TaskItem
              key={task.id}
              task={task}
              index={actualIndex}
              darkMode={darkMode}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedItem === actualIndex}
            />
          );
        })}
      </div>
    </div>
  );

  // Handle empty states
  if (tasks.length === 0) {
    return (
      <EmptyState message="No tasks yet. Add one above to get started!" />
    );
  }

  if (filteredTasks.length === 0 && !showCompleted) {
    return (
      <EmptyState message="No incomplete tasks! 🎉" />
    );
  }

  return (
    <section aria-label="Task list" onDragEnd={handleDragEnd}>
      <h2 className="sr-only">Your Tasks</h2>
      
      <div className="space-y-6">
        {groupByCompletion ? (
          <>
            {/* Incomplete Tasks */}
            {taskGroups.incomplete && taskGroups.incomplete.length > 0 && (
              <TaskSection
                title="To Do"
                tasks={taskGroups.incomplete}
                startIndex={0}
              />
            )}
            
            {/* Completed Tasks */}
            {showCompleted && taskGroups.completed && taskGroups.completed.length > 0 && (
              <TaskSection
                title="Completed"
                tasks={taskGroups.completed}
                startIndex={taskGroups.incomplete?.length || 0}
              />
            )}
          </>
        ) : (
          <TaskSection
            tasks={filteredTasks}
            startIndex={0}
          />
        )}
      </div>

      {/* Task Statistics */}
      <div className={`mt-8 text-center text-sm ${
        darkMode ? 'text-white/60' : 'text-gray-500'
      }`}>
        <p>
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
        </p>
      </div>
    </section>
  );
};

export default TaskList;
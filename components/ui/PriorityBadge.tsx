// components/ui/PriorityBadge.tsx
import React from "react";
type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = '' }) => {
  const colors: Record<Priority, string> = {
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const icons: Record<Priority, string> = {
    HIGH: '🔴',
    MEDIUM: '🟡',
    LOW: '🟢'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[priority]} ${className}`}>
      <span>{icons[priority]}</span>
      {priority.toLowerCase()}
    </span>
  );
};
// components/SortableTaskItem.tsx

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/hooks/useTaskManager";
import { useState } from "react";

interface SortableTaskItemProps {
  task: Task;
  isDarkMode: boolean;
  toggleTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  updateTaskDetails: (id: string, fields: Partial<Task>) => void;
}

export default function SortableTaskItem({
  task,
  isDarkMode,
  toggleTask,
  deleteTask,
  updateTaskDetails,
}: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);

  const handleTitleBlur = () => {
    setEditingTitle(false);
    if (titleValue !== task.title) {
      updateTaskDetails(task.id, { title: titleValue });
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 flex items-start justify-between"
    >
      <div className="flex gap-3 items-start flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id, task.completed)}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <div className="flex-1">
          {editingTitle ? (
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleTitleBlur}
              autoFocus
              className={`w-full text-sm border-b bg-transparent outline-none ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            />
          ) : (
            <h4
              className={`text-sm font-medium cursor-pointer ${
                task.completed
                  ? "line-through text-gray-500"
                  : isDarkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
              onClick={() => setEditingTitle(true)}
            >
              {task.title}
            </h4>
          )}

          {task.description && (
            <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className={`ml-4 text-sm ${
          isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"
        }`}
      >
        Delete
      </button>
    </li>
  );
}

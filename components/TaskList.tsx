// components/TaskList.tsx

"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Task } from "@/hooks/useTaskManager";
import SortableTaskItem from "./SortableTaskItem";

interface TaskListProps {
  tasks: Task[];
  isDarkMode: boolean;
  toggleTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (orderedIds: string[]) => void;
  updateTaskDetails: (id: string, fields: Partial<Task>) => void;
}

export default function TaskList({
  tasks,
  isDarkMode,
  toggleTask,
  deleteTask,
  reorderTasks,
  updateTaskDetails,
}: TaskListProps) {
  const [orderedIds, setOrderedIds] = useState<string[]>([]);

  useEffect(() => {
    setOrderedIds(tasks.map((task) => task.id));
  }, [tasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(active.id as string);
      const newIndex = orderedIds.indexOf(over.id as string);
      const newOrder = arrayMove(orderedIds, oldIndex, newIndex);
      setOrderedIds(newOrder);
      reorderTasks(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {orderedIds.map((id) => {
            const task = tasks.find((t) => t.id === id);
            return (
              task && (
                <SortableTaskItem
                  key={task.id}
                  task={task}
                  isDarkMode={isDarkMode}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  updateTaskDetails={updateTaskDetails}
                />
              )
            );
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
// src/components/ui/TaskGrid.tsx - ADD onEdit prop
import GlassTaskCard from './GlassTaskCard';
import { FrontendTask } from '@/src/types';

interface TaskGridProps {
   tasks: FrontendTask[];  
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;  // 👈 ADD THIS
}
 
const TaskGrid: React.FC<TaskGridProps> = ({
  tasks, 
  onToggleComplete, 
  onDelete, 
  onEdit  // 👈 ADD THIS
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {tasks.map((task) => (
          <div key={task.id} className="w-full">
            <GlassTaskCard
              task={task}
              onToggle={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}  // 👈 ADD THIS
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 

export default TaskGrid;

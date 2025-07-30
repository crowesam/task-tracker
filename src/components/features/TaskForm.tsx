// // src/components/features/TaskForm.tsx
// KEEPING FORREFERENCE
// import React, { useState } from 'react';
// import { Plus, Calendar, Tag, Folder } from 'lucide-react';
// import { FrontendTask, PriorityType } from '@/src/types';

// interface TaskFormProps {
//   darkMode: boolean;
//   onAddTask: (task: FrontendTask) => void;
//   showForm: boolean;
//   onToggleForm: () => void;
// }

// export const TaskForm: React.FC<TaskFormProps> = ({
//   darkMode,
//   onAddTask,
//   showForm,
//   onToggleForm,
// }) => {
//   const [text, setText] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState<PriorityType>('medium');
//   const [dueDate, setDueDate] = useState('');
//   const [category, setCategory] = useState('General');
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     const newTask: FrontendTask = {
//       id: Date.now().toString(),
//       text: text.trim(),
//       description: description.trim() || undefined,
//       completed: false,
//       priority,
//       dueDate: dueDate ? new Date(dueDate) : undefined,
//       category,
//       tags,
//       createdAt: new Date(),
//     };

//     onAddTask(newTask);
    
//     // Reset form
//     setText('');
//     setDescription('');
//     setPriority('medium');
//     setDueDate('');
//     setCategory('General');
//     setTags([]);
//     setTagInput('');
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   const handleTagKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   // Enhanced Add Task Button with glassmorphism
//   const addButtonClasses = `
//     inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
//     bg-gradient-to-r from-blue-500 to-blue-600 text-white
//     backdrop-blur-md border border-blue-400/30
//     transition-all duration-300 hover:scale-105 active:scale-95
//     hover:shadow-2xl hover:shadow-blue-500/25
//     hover:from-blue-400 hover:to-blue-500
//     focus:outline-none focus:ring-2 focus:ring-blue-500/20
//     relative overflow-hidden group
//   `;

//   // Glassmorphism form container
//   const formClasses = `
//     backdrop-blur-md rounded-2xl p-8 border transition-all duration-500 mb-8
//     ${darkMode 
//       ? 'bg-white/10 border-white/20' 
//       : 'bg-white/25 border-white/30'
//     }
//     ${showForm ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
//   `;

//   // Input styling with proper spacing and glassmorphism
//   const inputClasses = `
//     w-full px-4 py-3 rounded-2xl border transition-all duration-200 backdrop-blur-sm
//     ${darkMode
//       ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/15'
//       : 'bg-white/30 border-white/40 text-gray-800 placeholder-gray-500 focus:border-white/60 focus:bg-white/40'
//     }
//     focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:scale-[1.02]
//   `;

//   // Textarea styling
//   const textareaClasses = `
//     w-full px-4 py-3 rounded-2xl border transition-all duration-200 backdrop-blur-sm resize-none
//     ${darkMode
//       ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/15'
//       : 'bg-white/30 border-white/40 text-gray-800 placeholder-gray-500 focus:border-white/60 focus:bg-white/40'
//     }
//     focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:scale-[1.02]
//   `;

//   // Priority button styling - same size with floating glassmorphism effect
//   const priorityButtonClasses = (isSelected: boolean, priorityType: PriorityType) => {
//     const colors = {
//       low: isSelected ? 'from-green-500 to-green-600 shadow-green-500/30' : 'from-green-400/20 to-green-500/20',
//       medium: isSelected ? 'from-yellow-500 to-yellow-600 shadow-yellow-500/30' : 'from-yellow-400/20 to-yellow-500/20',
//       high: isSelected ? 'from-red-500 to-red-600 shadow-red-500/30' : 'from-red-400/20 to-red-500/20'
//     };

//     return `
//       flex-1 px-4 py-3 rounded-2xl font-semibold text-sm uppercase tracking-wide
//       bg-gradient-to-r ${colors[priorityType]}
//       backdrop-blur-md border transition-all duration-300
//       ${isSelected 
//         ? `text-white shadow-lg scale-105 ${darkMode ? 'border-white/30' : 'border-white/40'}` 
//         : `${darkMode ? 'text-white/70 border-white/20 hover:border-white/30' : 'text-gray-700 border-white/30 hover:border-white/50'} hover:scale-105`
//       }
//       hover:shadow-lg active:scale-95 cursor-pointer
//       focus:outline-none focus:ring-2 focus:ring-orange-500/20
//     `;
//   };

//   // Submit button styling
//   const submitButtonClasses = `
//     w-full px-6 py-4 rounded-2xl font-semibold text-lg
//     bg-gradient-to-r from-orange-500 to-orange-600 text-white
//     backdrop-blur-md border border-orange-400/30
//     transition-all duration-300 hover:scale-[1.02] active:scale-95
//     hover:shadow-xl hover:shadow-orange-500/25
//     hover:from-orange-400 hover:to-orange-500
//     focus:outline-none focus:ring-2 focus:ring-orange-500/20
//     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
//   `;

//   // Tag styling
//   const tagClasses = `
//     px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border
//     ${darkMode 
//       ? 'bg-white/20 text-white/90 border-white/30' 
//       : 'bg-white/40 text-gray-700 border-white/50'
//     }
//     transition-all duration-200 hover:scale-105
//   `;

//   return (
//     <div className="text-center mb-8">
//       {/* Enhanced Add Task Button */}
//       <button
//         onClick={onToggleForm}
//         className={addButtonClasses}
//       >
//         <Plus size={20} />
//         {showForm ? 'Cancel' : 'Add New Task'}
        
//         {/* Glassmorphism shimmer effect */}
//         <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
//       </button>

//       {/* Glassmorphism Form */}
//       <div className={formClasses}>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title Input */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//               Task Title
//             </label>
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Enter task title..."
//               className={inputClasses}
//               required
//             />
//           </div>

//           {/* Description Input */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//               Description (Optional)
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Add task description..."
//               rows={3}
//               className={textareaClasses}
//             />
//           </div>

//           {/* Priority Selection - Same Size Boxes with Floating Effect */}
//           <div>
//             <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//               Priority Level
//             </label>
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => setPriority('low')}
//                 className={priorityButtonClasses(priority === 'low', 'low')}
//               >
//                 Low
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setPriority('medium')}
//                 className={priorityButtonClasses(priority === 'medium', 'medium')}
//               >
//                 Medium
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setPriority('high')}
//                 className={priorityButtonClasses(priority === 'high', 'high')}
//               >
//                 High
//               </button>
//             </div>
//           </div>

//           {/* Category and Due Date Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Category Selection */}
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//                 <Folder size={16} className="inline mr-2" />
//                 Category
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className={inputClasses}
//                 title="Select category"
//               >
//                 <option value="General">General</option>
//                 <option value="Work">Work</option>
//                 <option value="Personal">Personal</option>
//                 <option value="Shopping">Shopping</option>
//                 <option value="Health">Health</option>
//                 <option value="Learning">Learning</option>
//               </select>
//             </div>

//             {/* Due Date */}
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//                 <Calendar size={16} className="inline mr-2" />
//                 Due Date (Optional)
//               </label>
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className={inputClasses}
//                 title="Select due date"
//               />
//             </div>
//           </div>

//           {/* Tags Section */}
//           <div>
//             <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
//               <Tag size={16} className="inline mr-2" />
//               Tags (Optional)
//             </label>
//             <div className="flex gap-2 mb-3">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleTagKeyPress}
//                 placeholder="Add a tag..."
//                 className={`${inputClasses} flex-1`}
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className={`px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-200 hover:scale-105 ${
//                   darkMode
//                     ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
//                     : 'bg-white/30 border-white/40 text-gray-800 hover:bg-white/40'
//                 }`}
//               >
//                 Add
//               </button>
//             </div>
            
//             {/* Display Tags */}
//             {tags.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag, index) => (
//                   <span key={index} className={tagClasses}>
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveTag(tag)}
//                       className="ml-2 text-red-400 hover:text-red-300"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={!text.trim()}
//             className={submitButtonClasses}
//           >
//             Create Task
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;

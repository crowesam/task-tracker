// src/components/features/FilterBar.tsx
import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { FrontendTask } from '@/src/types';
import { FilterState } from '@/src/types/filters';

interface FilterBarProps {
  tasks: FrontendTask[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  darkMode: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  tasks,
  filters,
  onFiltersChange,
  darkMode,
}) => {
  // Get unique categories and tags from tasks
  const uniqueCategories = Array.from(new Set(tasks.map(task => task.category).filter(Boolean)));
  const uniqueTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      selectedCategory: category === 'all' ? undefined : category,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    
    onFiltersChange({
      ...filters,
      selectedTags: newTags,
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      searchQuery: search,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      selectedCategory: undefined,
      selectedTags: [],
      searchQuery: '',
      showCompleted: filters.showCompleted,
    });
  };

  const hasActiveFilters = filters.selectedCategory || filters.selectedTags.length > 0 || filters.searchQuery;

  // Glassmorphism container matching counter boxes
  const containerClasses = `
    backdrop-blur-md rounded-2xl p-6 mb-6 border transition-all duration-300
    ${darkMode 
      ? 'bg-white/10 border-white/20 text-white' 
      : 'bg-white/25 border-white/30 text-gray-800'
    }
  `;

  // Rounded input styling with glassmorphism
  const inputClasses = `
    w-full px-4 py-3 pr-12 rounded-2xl border transition-all duration-200 backdrop-blur-sm
    ${darkMode
      ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/15'
      : 'bg-white/30 border-white/40 text-gray-800 placeholder-gray-500 focus:border-white/60 focus:bg-white/40'
    }
    focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:scale-[1.02]
  `;

  // Rounded select styling with glassmorphism
  const selectClasses = `
    px-4 py-3 rounded-2xl border transition-all duration-200 cursor-pointer backdrop-blur-sm
    ${darkMode
      ? 'bg-white/10 border-white/20 text-white focus:border-white/40 focus:bg-white/15'
      : 'bg-white/30 border-white/40 text-gray-800 focus:border-white/60 focus:bg-white/40'
    }
    focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:scale-[1.02] hover:scale-[1.01]
  `;

  // Enhanced tag button styling
  const tagButtonClasses = (isSelected: boolean) => `
    px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer backdrop-blur-sm
    ${isSelected
      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/30 scale-105'
      : darkMode
        ? 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
        : 'bg-white/30 text-gray-600 hover:bg-white/40 border border-white/40'
    }
    hover:scale-105 active:scale-95
  `;

  // Clear button styling
  const clearButtonClasses = `
    px-4 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 backdrop-blur-sm
    ${darkMode
      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
      : 'bg-red-100/50 text-red-600 hover:bg-red-200/50 border border-red-200/50'
    }
    hover:scale-105 active:scale-95
  `;

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 mb-6">
        <Filter size={20} className={darkMode ? 'text-white/60' : 'text-gray-500'} />
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className={clearButtonClasses}
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search with icon on the right */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={inputClasses}
          />
          <Search 
            size={20} 
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
              darkMode ? 'text-white/40' : 'text-gray-400'
            }`} 
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filters.selectedCategory || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={selectClasses}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Completion Toggle with glassmorphism */}
        <div className="flex items-center gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showCompleted}
              onChange={(e) => onFiltersChange({
                ...filters,
                showCompleted: e.target.checked,
              })}
              className="sr-only"
            />
            <div className={`
              w-14 h-7 rounded-full transition-all duration-300 relative backdrop-blur-sm border
              ${filters.showCompleted 
                ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400/30 shadow-green-500/20' 
                : darkMode 
                  ? 'bg-white/20 border-white/30' 
                  : 'bg-white/40 border-white/50'
              }
              shadow-lg hover:scale-105
            `}>
              <div className={`
                w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg
                ${filters.showCompleted ? 'left-8' : 'left-1'}
              `} />
            </div>
            <span className="ml-3 font-medium">Show Completed</span>
          </label>
        </div>
      </div>

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div className="mt-6">
          <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={tagButtonClasses(filters.selectedTags.includes(tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-white/10' : 'border-white/20'}`}>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`text-sm font-medium ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
              Active filters:
            </span>
            {filters.selectedCategory && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full shadow-lg backdrop-blur-sm">
                Category: {filters.selectedCategory}
              </span>
            )}
            {filters.selectedTags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full shadow-lg backdrop-blur-sm">
                Tag: {tag}
              </span>
            ))}
            {filters.searchQuery && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full shadow-lg backdrop-blur-sm">
                Search: &ldquo;{filters.searchQuery}&rdquo;
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;

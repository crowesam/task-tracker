// src/components/ui/CategorySelector.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { combineClasses } from '@/src/utils';
import { TRANSITIONS } from '@/src/constants';
import { Category, DEFAULT_CATEGORIES } from '@/src/types';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onCreateCategory: (name: string, color: string) => void;
  disabled?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onCreateCategory,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#6B7280');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine user categories with default categories
  const allCategories = [
    ...DEFAULT_CATEGORIES.map(cat => ({ ...cat, id: cat.name, userId: '', createdAt: new Date(), updatedAt: new Date() })),
    ...categories,
  ];

  // Remove duplicates based on name
  const uniqueCategories = allCategories.filter((category, index, self) => 
    index === self.findIndex(c => c.name === category.name)
  );

  const selectedCategoryData = uniqueCategories.find(cat => cat.name === selectedCategory);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCreateForm(false);
        setNewCategoryName('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      onCreateCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setNewCategoryColor('#6B7280');
      setShowCreateForm(false);
      setIsOpen(false);
    }
  };

  const colorOptions = [
    '#6B7280', '#3B82F6', '#10B981', '#F59E0B', 
    '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-white text-sm font-medium mb-2">
        Category
      </label>
      
      {/* Selected Category Display */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={combineClasses(
          'w-full px-4 py-3 rounded-lg flex items-center justify-between',
          'bg-white/10 backdrop-blur-md border border-white/20',
          'text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent',
          TRANSITIONS.default,
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'hover:bg-white/15'
        )}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedCategoryData?.color || '#6B7280' }}
          />
          <span>{selectedCategory}</span>
        </div>
        <ChevronDown 
          size={16} 
          className={combineClasses(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={combineClasses(
          'absolute top-full left-0 right-0 mt-1 z-50',
          'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg',
          'max-h-60 overflow-y-auto'
        )}>
          {/* Existing Categories */}
          {uniqueCategories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => {
                onCategorySelect(category.name);
                setIsOpen(false);
              }}
              className={combineClasses(
                'w-full px-4 py-3 flex items-center gap-2 text-left',
                'text-white hover:bg-white/10 transition-colors duration-200',
                selectedCategory === category.name && 'bg-white/15'
              )}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </button>
          ))}

          {/* Create New Category */}
          {!showCreateForm ? (
            <button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="w-full px-4 py-3 flex items-center gap-2 text-white hover:bg-white/10 transition-colors duration-200 border-t border-white/10"
            >
              <Plus size={16} />
              <span>Create New Category</span>
            </button>
          ) : (
            <div className="p-4 border-t border-white/10 space-y-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className={combineClasses(
                  'w-full px-3 py-2 rounded-lg',
                  'bg-white/10 backdrop-blur-md border border-white/20',
                  'text-white placeholder-white/60',
                  'focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateCategory();
                  }
                  if (e.key === 'Escape') {
                    setShowCreateForm(false);
                    setNewCategoryName('');
                  }
                }}
                autoFocus
              />
              
              {/* Color Picker */}
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewCategoryColor(color)}
                    aria-label={`Select color ${color}`}
                    title={`Select color ${color}`}
                    className={combineClasses(
                      'w-6 h-6 rounded-full border-2 transition-all duration-200',
                      newCategoryColor === color 
                        ? 'border-white scale-110' 
                        : 'border-white/30 hover:border-white/60'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName.trim()}
                  className={combineClasses(
                    'flex-1 px-3 py-2 rounded-lg text-sm font-medium',
                    'bg-orange-500 text-white hover:bg-orange-600',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    TRANSITIONS.default
                  )}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewCategoryName('');
                  }}
                  aria-label="Cancel creating category"
                  title="Cancel creating category"
                  className={combineClasses(
                    'px-3 py-2 rounded-lg text-sm font-medium',
                    'bg-white/10 text-white hover:bg-white/20',
                    TRANSITIONS.default
                  )}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;

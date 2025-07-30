'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  maxTagLength?: number;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ 
  tags, 
  onTagsChange, 
  maxTags = 8,
  maxTagLength = 8,
  placeholder = "Add a tag..." 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Sample frequent tags (this could come from user data later)
  const frequentTags = ['urgent', 'work', 'personal', 'meeting', 'client', 'project', 'health', 'fun'];

  const addTag = (tagText: string) => {
    const trimmedTag = tagText.trim().toLowerCase();
    
    if (trimmedTag && 
        !tags.includes(trimmedTag) && 
        tags.length < maxTags &&
        trimmedTag.length <= maxTagLength) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputChange = (value: string) => {
    // Limit input length and prevent spaces
    const cleanValue = value.replace(/\s/g, '').slice(0, maxTagLength);
    setInputValue(cleanValue);
  };

  const displayTag = (tag: string) => {
    return tag.length > 4 ? tag.slice(0, 4) : tag;
  };

  const getAvailableFrequentTags = () => {
    return frequentTags.filter(tag => !tags.includes(tag));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-white font-semibold text-sm tracking-wide uppercase">
          Tags
        </label>
        <span className="text-white/60 text-xs">
          {tags.length}/{maxTags} tags
        </span>
      </div>

      {/* Current Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-white/5 border border-white/10">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1.5 
                         bg-gradient-to-r from-orange-500 to-orange-600 
                         text-black text-xs font-bold rounded-full
                         shadow-lg hover:shadow-orange-500/25 transition-all duration-300
                         hover:scale-105"
              title={tag.length > 4 ? tag : undefined}
            >
              <span>{displayTag(tag)}</span>
              <button
                onClick={() => removeTag(index)}
                className="w-3 h-3 rounded-full bg-black/20 hover:bg-black/40 
                           flex items-center justify-center transition-all duration-200
                           hover:scale-110"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="w-2 h-2 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Tag Input */}
      {tags.length < maxTags && (
        <div className="space-y-3">
          <div className={`
            relative flex items-center
            bg-white/10 backdrop-blur-md border rounded-xl
            transition-all duration-300
            ${isInputFocused 
              ? 'border-orange-500/50 bg-white/15 shadow-lg shadow-orange-500/10' 
              : 'border-white/20 hover:border-white/30'
            }
          `}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/50 
                         focus:outline-none text-sm font-medium"
              maxLength={maxTagLength}
            />
            
            {inputValue && (
              <button
                onClick={() => addTag(inputValue)}
                className="mr-3 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 
                           flex items-center justify-center transition-all duration-300
                           hover:scale-110 shadow-lg"
                aria-label="Add tag"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          {/* Character counter */}
          {inputValue && (
            <div className="text-right text-white/50 text-xs">
              {inputValue.length}/{maxTagLength} characters
            </div>
          )}
        </div>
      )}

      {/* Frequent Tags Quick Select */}
      {getAvailableFrequentTags().length > 0 && tags.length < maxTags && (
        <div className="space-y-2">
          <label className="block text-white/70 text-xs font-medium uppercase tracking-wide">
            Quick Add
          </label>
          <div className="flex flex-wrap gap-2">
            {getAvailableFrequentTags().slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="px-3 py-1.5 text-xs font-medium text-white/80
                           bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
                           rounded-full transition-all duration-300
                           hover:scale-105 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helper text */}
      <p className="text-white/50 text-xs">
        Press Enter or comma to add tags. Max {maxTagLength} characters per tag.
      </p>
    </div>
  );
};

export default TagInput;
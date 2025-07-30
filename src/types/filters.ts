// src/types/filters.ts
export interface TaskFilters {
  category?: string;
  tags: string[];
  priority?: string;
  completed?: boolean;
  search?: string;
}

export interface FilterState {
  selectedCategory?: string;
  selectedTags: string[];
  searchQuery: string;
  showCompleted: boolean;
}

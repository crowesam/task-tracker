// src/types/theme.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}
// src/types/accessibility.ts
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-hidden'?: boolean;
  role?: string;
  tabIndex?: number;
}
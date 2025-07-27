// src/components/layout/Header.tsx
import React from 'react';
import { Card } from '@/src/components/ui';
import { ThemeToggle } from '@/src/components/features';
import { combineClasses } from '@/src/utils';
import { GRADIENT_TEXT } from '@/src/constants';

interface HeaderProps {
  title: string;
  subtitle?: string;
  darkMode: boolean;
  onToggleTheme: () => void;
  showThemeToggle?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  darkMode,
  onToggleTheme,
  showThemeToggle = true,
  actions,
  className,
}) => {
  const titleClasses = combineClasses(
    'text-4xl font-bold mb-2',
    GRADIENT_TEXT
  );

  const subtitleClasses = combineClasses(
    'text-lg',
    darkMode ? 'text-gray-300' : 'text-gray-600'
  );

  return (
    <Card 
      as="header"
      darkMode={darkMode}
      padding="lg"
      className={combineClasses('mb-8', className)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className={titleClasses}>
            {title}
          </h1>
          {subtitle && (
            <p className={subtitleClasses}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {actions}
          
          {showThemeToggle && (
            <ThemeToggle
              darkMode={darkMode}
              onToggle={onToggleTheme}
              variant="icon"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Header;
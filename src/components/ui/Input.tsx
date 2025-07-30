// src/components/ui/Input.tsx
import React, { forwardRef } from 'react';
import { combineClasses } from '@/src/utils';
import { TRANSITIONS } from '@/src/constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  ...props
}, ref) => {
  const inputClasses = combineClasses(
    'w-full px-4 py-3 rounded-lg',
    'bg-white/10 backdrop-blur-md border border-white/20',
    'text-white placeholder-white/60',
    'focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent',
    TRANSITIONS.default,
    error && 'ring-2 ring-red-500 border-red-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-white/70 text-sm mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

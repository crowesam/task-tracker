'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'; // ← X icon import was missing

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Remove the unused variable error by using it properly
const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, title, children }) => {
  console.log('TaskModal render - isOpen:', isOpen, 'title:', title);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('Escape key pressed, closing modal');
        onClose();
      }
    };

    if (isOpen) {
      console.log('Modal is open, adding event listeners');
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    console.log('Modal is closed, returning null');
    return null;
  }

  console.log('Modal is open, rendering with portal');

  const ModalContent = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* SUBTLE BACKDROP - NO OPAQUE OVERLAY */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'rgba(0,0,0,0.2)' // Very subtle dark background
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* MODAL CONTAINER - PURE GLASSMORPHISM */}
      <div 
        className="relative w-full max-w-lg mx-auto max-h-[90vh] overflow-hidden rounded-2xl
                   shadow-2xl transform transition-all duration-500 ease-out"
        style={{
          // Pure glassmorphism - no solid colors
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div 
          className="flex items-center justify-between p-6 pb-4"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            {title}
          </h2>
          
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center 
                       transition-all duration-300 hover:scale-110
                       focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* CONTENT AREA - NO BACKGROUND INTERFERENCE */}
        <div 
          className="p-6 overflow-y-auto"
          style={{
            maxHeight: 'calc(90vh - 120px)',
            background: 'transparent' // Ensure no background interferes with form
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  // PORTAL RENDERING - Now with proper import
  return typeof window !== 'undefined' 
    ? createPortal(<ModalContent />, document.body)
    : null;
};

export default TaskModal;
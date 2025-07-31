'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, title, children }) => {
  // Debug logging
  useEffect(() => {
    console.log('TaskModal render - isOpen:', isOpen, 'title:', title);
  }, [isOpen, title]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('Escape key pressed, closing modal');
        onClose();
      }
    };

    if (isOpen) {
      console.log('Modal opened, adding event listeners');
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed
  if (!isOpen) {
    console.log('Modal is closed, not rendering');
    return null;
  }

  console.log('Modal is open, attempting to render');

  // Modal content component
  const ModalContent = () => {
    console.log('Rendering ModalContent');
    return (
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.5)' // Fallback background
        }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Modal Container - CENTERED AND PROPERLY POSITIONED */}
        <div 
          className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-500 ease-out"
          style={{
            maxHeight: '90vh',
            backgroundColor: 'white', // Fallback color for debugging
            zIndex: 10000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
            <h2 
              id="modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              {title}
            </h2>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                         flex items-center justify-center transition-all duration-300 
                         hover:scale-110 border border-gray-300 hover:border-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close modal"
              type="button"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Modal Content - SCROLLABLE */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Check if we're in the browser
  if (typeof window === 'undefined') {
    console.log('Server-side rendering, not showing modal');
    return null;
  }

  console.log('Creating portal to document.body');
  
  // Use createPortal to render modal at the end of document.body
  return createPortal(<ModalContent />, document.body);
};

export default TaskModal;
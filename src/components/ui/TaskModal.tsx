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
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
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
  if (!isOpen) return null;

  // Modal content component
  const ModalContent = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container - CENTERED AND PROPERLY POSITIONED */}
      <div 
        className={`
          relative w-full max-w-lg mx-auto
          max-h-[90vh] overflow-hidden
          bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
          shadow-2xl transform transition-all duration-500 ease-out
          ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-95 opacity-0'}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
          <h2 
            id="modal-title"
            className="text-2xl font-bold text-white"
          >
            {title}
          </h2>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                       flex items-center justify-center transition-all duration-300 
                       hover:scale-110 border border-white/20 hover:border-white/30
                       focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Content - SCROLLABLE */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );

  // Use createPortal to render modal at the end of document.body
  return typeof window !== 'undefined' 
    ? createPortal(<ModalContent />, document.body)
    : null;
};

export default TaskModal;
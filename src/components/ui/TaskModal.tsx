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
  // eslint-disable-next-line no-console
  console.log('TaskModal render - isOpen:', isOpen, 'title:', title);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // eslint-disable-next-line no-console
        console.log('Escape key pressed, closing modal');
        onClose();
      }
    };

    if (isOpen) {
      // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.log('Modal is closed, returning null');
    return null;
  }

  // eslint-disable-next-line no-console
  console.log('Modal is open, rendering with portal');

  const ModalContent = () => (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        color: 'black', 
        padding: '20px',
        borderRadius: '10px',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🚨 DEBUG: MODAL IS RENDERING! 🚨
        <br />
        Title: {title}
        <br />
        <button 
          onClick={onClose}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Close Modal
        </button>
      </div>
    </div>
  );

  return typeof window !== 'undefined' 
    ? createPortal(<ModalContent />, document.body)
    : null;
};

export default TaskModal;
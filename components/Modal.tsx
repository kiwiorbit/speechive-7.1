import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 modal-overlay" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="modal-content w-full max-w-md bg-white p-6 rounded-xl shadow-2xl relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Close modal"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
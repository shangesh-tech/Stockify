import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      {/* Overlay */}
      <div className="flex min-h-screen items-center justify-center p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full sm:w-[95%] md:w-[90%] lg:w-[85%] max-w-3xl m-3 sm:m-5">
          {/* Close Button */}
          <button 
            className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content Container */}
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
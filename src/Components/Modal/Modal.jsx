import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import './Modal.css';

const modalRoot = document.getElementById('modal-root') || document.body;

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div 
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label={t('close')}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalMovie, setModalMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setModalMovie(movie);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    
    setTimeout(() => {
      setModalMovie(null);
    }, 300);
  };

  const contextValue = {
    modalMovie,
    isModalOpen,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

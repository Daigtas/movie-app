import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalMovie, setModalMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    console.log("Opening immersive modal for movie:", movie.title);
    document.body.style.overflow = 'hidden';
    setModalMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing immersive movie modal");
    document.body.style.overflow = '';
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMovie(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ modalMovie, isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

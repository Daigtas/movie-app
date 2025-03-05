import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  modalMovie: null,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalMovie, setModalMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setModalMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

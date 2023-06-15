import React, { createContext, useState } from 'react';
import Modal from 'react-modal';
import Botao from '../componentes/Botao/Botao';

export const ModalContext = createContext();

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    background: 'var(--azul-escuro)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    maxWidth: '300px',
  },
};


export const ModalProvider = ({ children }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fecharModal = () => {
    setModalAberto(false);
    window.location.reload();
  };

  return (
    <ModalContext.Provider
      value={{
        modalAberto,
        setModalAberto,
        modalMessage,
        setModalMessage,
        fecharModal,
      }}
    >
      {children}
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        style={customStyles}
      >
        <h2 className="msg-modal">{modalMessage}</h2>
        <Botao onClick={fecharModal}>OK</Botao>
      </Modal>
    </ModalContext.Provider>
  );
};

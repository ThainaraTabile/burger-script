import React, { useState } from 'react';
import Modal from 'react-modal';
import Botao from '../Botao/Botao';
import './estilo.css';
import DeleteIcon from '@mui/icons-material/Delete';

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

Modal.setAppElement('#root');

export default function BtnDeletarUsuario({ usuario, onDelete }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const abrirModal = () => {
    setModalAberto(true);
    setModalMessage('');
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const executarDelecaoUsuario = async () => {
    try {
      await onDelete(usuario.id);
      fecharModal();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <>
      <button className="btn-lista-usuarios" onClick={abrirModal}>
        <DeleteIcon />
      </button>
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        contentLabel="Confirmação de Deleção"
        style={customStyles}
      >
        <h2 className="msg-modal">
          {modalMessage ||
            `Você realmente deseja deletar o usuário ${usuario.name} ?`}
        </h2>
        <div className=" btns-modal">
          <Botao onClick={executarDelecaoUsuario}>Sim</Botao>
          <p>.</p>
          <Botao onClick={fecharModal}>Não</Botao>
        </div>
      </Modal>
    </>
  );
}

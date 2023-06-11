import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-modal';
import './Style.css';
import Botao from "../Botao/Botao";

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

export default function BtnDeletarProduto({ produto, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletado, setDeletado] = useState(false);

  const abrirModal = () => {
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setDeletado(false); // Reinicializar o estado da mensagem de confirmação
  };

  const confirmaDelecao = () => {
    return (
      <div>
        <h2 className="msg-modal">Produto deletado com sucesso!</h2>
        <Botao onClick={() => { fecharModal(); window.location.reload(); }}>OK</Botao>
      </div>
    )
  }

  const executarDelecaoProduto = async () => {
    try {
      await onDelete(produto.id);
      setDeletado(true); // Definir o estado da mensagem de confirmação como verdadeiro
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  return (
    <>
      <button className='btn-deletar-produto' onClick={abrirModal}>
        <DeleteIcon />
      </button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={fecharModal}
        className="modal"
        style={customStyles}
      >
        {deletado ? (
          confirmaDelecao()

        ) : (
          <>
            <h2 className="msg-modal">Você tem certeza que deseja excluir o produto?</h2>
            <div className="btns-modal">
              <Botao onClick={executarDelecaoProduto}>Sim</Botao>
              <Botao onClick={fecharModal}>Não</Botao>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}






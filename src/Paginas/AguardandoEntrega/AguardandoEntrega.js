import React from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import { atualizarStatusPedido } from '../../API/Pedidos';
import Botao from '../../componentes/Botao/Botao';
import TokenExpiracao from '../../Autenticacao/Auth';
import Modal from 'react-modal';
import { useState } from 'react';


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

export default function AguardandoEntrega() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fecharModal = () => {
    setModalAberto(false);
    window.location.reload();
  };

  const marcarComoEntregue = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'entregue');
      setModalAberto(true);
      setModalMessage('Pedido entregue!')

    } catch (error) {
      console.error('Erro ao marcar pedido como entregue:', error);
    }
  };

  return (
    <section className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/atendimento" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />
      <MenuNavegacao texto="aguardando entrega" imagemSrc="relogio.png" />
      <ListaDePedidos
        status="pronto para entrega"
        props={'Data de envio:'}
        btnStatus={(pedido) => (
          <Botao onClick={() => marcarComoEntregue(pedido)}>concluído</Botao>
        )}
      />
       <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        style={customStyles}
      >
         <h2 className='msg-modal'>{modalMessage}</h2>
        <Botao onClick={fecharModal}>OK</Botao>
      </Modal>
    </section>
  );
}

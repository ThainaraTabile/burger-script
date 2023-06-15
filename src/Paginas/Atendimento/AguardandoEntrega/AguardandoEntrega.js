import React from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../../componentes/MenuNavegacao/MenuNavegacao';
import { atualizarStatusPedido } from '../../../API/Pedidos';
import Botao from '../../../componentes/Botao/Botao';
import TokenExpiracao from '../../../Autenticacao/Auth';
import { useContext } from 'react';
import { ModalContext } from '../../../contextos/ModalContext';


export default function AguardandoEntrega() {

  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  const marcarComoEntregue = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'entregue');
      setModalAberto(true);
      setModalMessage('Pedido entregue!');
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
      {modalAberto && (
        <div className="modal">
          <h2 className="msg-modal">{modalMessage}</h2>
          <Botao onClick={fecharModal}>OK</Botao>
        </div>
      )}
    </section>
  );
}


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import Botao from '../../componentes/Botao/Botao';
import { atualizarStatusPedido } from '../../API/Pedidos';
import TokenExpiracao from '../../Autenticacao/Auth';
import { ModalContext } from '../../contextos/ModalContext';

export default function AgrProducao() {
  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  const concluirPedido = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'pronto para entrega');
      setModalAberto(true);
      setModalMessage('Pedido concluído com sucesso!');
    } catch (error) {
      console.error('Erro ao concluir pedido:', error);
    }
  };

  return (
    <section className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/cozinha" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />

      <MenuNavegacao
        texto="aguardando produção"
        imagemSrc="preparando-pedido.png"
      />
      <ListaDePedidos
        status="pendente"
        btnStatus={(pedido) => (
          <Botao onClick={() => concluirPedido(pedido)}>concluído</Botao>
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

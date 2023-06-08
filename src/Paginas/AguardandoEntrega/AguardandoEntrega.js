import React from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import { atualizarStatusPedido } from '../../API/Pedidos';
import Botao from '../../componentes/Botao/Botao';
import TokenExpiracao from '../../Autenticacao/Auth';

export default function AguardandoEntrega() {
  const marcarComoEntregue = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'entregue');
      alert('Pedido entregue com sucesso!');
      window.location.reload();
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
    </section>
  );
}

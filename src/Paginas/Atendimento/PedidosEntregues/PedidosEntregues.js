import React from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../../componentes/MenuNavegacao/MenuNavegacao';
import TokenExpiracao from '../../../Autenticacao/Auth';

export default function PedidosEntregues() {
 
  return (
    <section className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/atendimento" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />
      <MenuNavegacao
        to="/pedidosentregues"
        texto="pedidos entregues"
        imagemSrc="pedido-entregue.png"
      />
      <ListaDePedidos
        status="entregue"
        props={'Data de entrega'}
        btnStatus={(pedido) => (
          <button style={{ cursor: 'default', color: 'black' }} disabled>
          <strong>PEDIDO ENTREGUE</strong>
        </button>
        )}
      />
    </section>
  );
}

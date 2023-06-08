import React from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import Botao from '../../componentes/Botao/Botao';
import { atualizarStatusPedido } from '../../API/Pedidos';
import TokenExpiracao from '../../Autenticacao/Auth';

export default function PedidosProntos() {
  const enviarPedido = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'enviado');
      alert('Pedido enviado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
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
       texto="pronto para servir" 
       imagemSrc="pronto-para-servir.png" 
       />
      <ListaDePedidos
        status="pronto para entrega"
        props={'Processamento'}
        btnStatus={(pedido) => (
          <Botao onClick={() => enviarPedido(pedido)}>enviar</Botao>
        )}
      />
    </section>
  );
}

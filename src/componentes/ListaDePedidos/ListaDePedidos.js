import React, { useEffect, useState } from 'react';
import { obterPedidos } from '../../API/Pedidos';
import './ListaDePedidos.css';
import CardTerminal from '../CardTerminal/CardTerminal';

const ListaDePedidos = ({ status, btnStatus, props }) => {
  const [pedidos, setPedidos] = useState([]);
  console.log(pedidos);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const pedidos = await obterPedidos();
      setPedidos(pedidos);
    } catch (error) {
      console.error(error);
    }
  };

  const pedidosFiltrados = pedidos.filter(
    (pedido) => pedido.status.toLowerCase() === status.toLowerCase()
  );

  return (
    <section className="secao-lista-pedidos">
      <div className="card-lista-de-pedidos">
        {pedidosFiltrados.map((pedido) => (
          <CardTerminal key={pedido.id}>
            <ul>
              <div className="dados-pedidos-superior">
                <li>
                  <strong>ID do Pedido:</strong> {pedido.id}
                </li>
                <li>
                  <strong>Atendente:</strong> {pedido.waiter}
                </li>
                <li>
                  <strong>Cliente:</strong> {pedido.client}
                </li>
                <li>
                  <strong>Mesa:</strong> {pedido.table}
                </li>
                <li>
                  <strong>Data de Entrada:</strong> {pedido.dateEntry}
                </li>
              </div>
              <div className="colunas-container">
                <div className="coluna-produtos">
                  <p className="p-colunas-pedidos">Produtos</p>
                  <dl>
                    {pedido.products.map((item) => (
                      <div key={item.product.id}>
                        <dt>{item.product.name}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="coluna-quantidade">
                  <p className="p-colunas-pedidos">Quantidade</p>
                  <dl>
                    {pedido.products.map((item) => (
                      <div key={item.product.id}>
                        <dd>{item.qty}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <li className="li-status">
                <strong>Status:</strong> {pedido.status}
                <div className="loader" />
              </li>
              <li>
                {props} {pedido.dateProcessed}
              </li>
              {btnStatus(pedido)}
            </ul>
          </CardTerminal>
        ))}
      </div>
    </section>
  );
};

export default ListaDePedidos;

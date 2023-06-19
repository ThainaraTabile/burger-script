import {
  API_URL,
  pegarAuthToken
} from './localStorage/LocalStorageToken.js';
import fetch from 'node-fetch';

const formatarData = (data) => {
  const dia = adicionarZeroEsquerda(data.getDate());
  const mes = adicionarZeroEsquerda(data.getMonth() + 1);
  const ano = data.getFullYear();
  const horas = adicionarZeroEsquerda(data.getHours());
  const minutos = adicionarZeroEsquerda(data.getMinutes());
  return `${dia}-${mes}-${ano} ${horas}:${minutos}`;
};

const adicionarZeroEsquerda = (numero) => {
  return numero < 10 ? `0${numero}` : numero;
};

export const obterPedidos = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao obter pedidos');
  }

  return response.json();
};

export const adicionarPedido = async (cliente, mesa, produtos, atendente) => {

  const pedido = {
    waiter: atendente,
    client: cliente,
    table: mesa,
    products: produtos.map((produto) => ({
      qty: produto.quantity,
      client: produto.client,
      product: {
        id: produto.id,
        name: produto.name,
        type: produto.type,
        price: produto.price,
        table: produto.table,
      },
    })),
    status: 'pendente',
    dateEntry: formatarData(new Date()),
    id: Math.floor(Math.random() * 1000),
  };

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
    body: JSON.stringify(pedido),
  });

  if (!response.ok) {
    throw new Error('Erro ao adicionar pedido');
  }

  const data = await response.json();
  return data;

};

export const atualizarStatusPedido = async (pedidoId, novoStatus) => {

  const dataProcessamento = formatarData(new Date());
  const response = await fetch(`${API_URL}/orders/${pedidoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
    body: JSON.stringify({
      status: novoStatus,
      dateProcessed: dataProcessamento,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar o status do pedido');
  }

  const data = await response.json();
  return data;

};

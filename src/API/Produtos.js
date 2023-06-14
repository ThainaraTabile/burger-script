import { API_URL, pegarAuthToken } from './localStorage/LocalStorageToken.js';

export const adicionarProdutos = async (
  nomeProduto,
  precoProduto,
  tipoProduto,
  categoriaProduto,
  idProduto
) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
      body: JSON.stringify({
        name: nomeProduto,
        price: precoProduto,
        type: tipoProduto,
        category: categoriaProduto,
        id: idProduto,
      }),
    });
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const obterProdutos = async () => {

  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
  });
  const data = await response.json();
  return data;

};

export const deletarProduto = async (id) => {
  try {
    if (!pegarAuthToken()) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }
  } catch (error) {
    throw new Error('Erro ao deletar produto');
  }
};

export const editarDadosProduto = async (id, novoDado) => {
  try {
    if (!pegarAuthToken()) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
      body: JSON.stringify(novoDado),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('O token expirou, faça login novamente!');
      }
      throw new Error('Erro ao editar os dados do produto');
    }
    const respostaApi = await response.json();
    return respostaApi;
  } catch (error) {
    throw new Error('Erro ao editar os dados do produto');
  }
};

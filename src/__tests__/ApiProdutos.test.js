import { adicionarProdutos, 
  obterProdutos, 
  deletarProduto, 
  editarDadosProduto 
} from "../API/Produtos";


import { API_URL, pegarAuthToken } from "../API/localStorage/LocalStorageToken";

import fetch from 'node-fetch';

jest.mock('node-fetch');
jest.mock('../API/localStorage/LocalStorageToken', () => ({
  pegarAuthToken: jest.fn(() => 'TOKEN_MOCK'),
  API_URL: 'https://burger-queen-api-mock-mluz.vercel.app', 
}));



describe('adicionarProdutos', () => {
  test('Deve adicionar um novo produto com sucesso', async () => {
    const expectedResponse = {
      id: 1,
      name: 'Produto 1',
      price: 10.99,
      type: 'Tipo 1',
      category: 'Categoria 1',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
    });

    const nomeProduto = 'Produto 1';
    const precoProduto = 10.99;
    const tipoProduto = 'Tipo 1';
    const categoriaProduto = 'Categoria 1';
    const idProduto = 1;

    const response = await adicionarProdutos(nomeProduto, precoProduto, tipoProduto, categoriaProduto, idProduto);

    expect(response).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
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
  });

  test('Deve lançar um erro ao adicionar um novo produto', async () => {
    const errorMessage = 'Erro ao adicionar o produto';
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const nomeProduto = 'Produto 1';
    const precoProduto = 10.99;
    const tipoProduto = 'Tipo 1';
    const categoriaProduto = 'Categoria 1';
    const idProduto = 1;

    await expect(adicionarProdutos(nomeProduto, precoProduto, tipoProduto, categoriaProduto, idProduto)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
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
  });
});

describe('obterProdutos', () => {
  test('Deve obter os produtos com sucesso', async () => {
    const expectedResponse = [
      {
        id: 1,
        name: 'Produto 1',
        price: 10.99,
        type: 'Tipo 1',
        category: 'Categoria 1',
      },
      {
        id: 2,
        name: 'Produto 2',
        price: 15.99,
        type: 'Tipo 2',
        category: 'Categoria 2',
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
    });

    const response = await obterProdutos();

    expect(response).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
    });
  });

  test('Deve lançar um erro ao obter os produtos', async () => {
    const errorMessage = 'Erro ao obter os produtos';
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(obterProdutos()).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
    });
  });
});

describe('deletarProduto', () => {
  test('Deve deletar o produto com sucesso', async () => {
    const id = 1;
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    await deletarProduto(id);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
    });
  });

  test('Deve lançar um erro ao deletar o produto', async () => {
    const id = 1;
    const errorMessage = 'Erro ao deletar produto';
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(deletarProduto(id)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pegarAuthToken()}`,
      },
    });
  });
});



describe('editarDadosProduto', () => {
  test('Deve editar os dados do produto com sucesso', async () => {
    const id = 1;
    const novoDado = {
      name: 'Novo Produto',
      price: 19.99,
    };
    const expectedResponse = {
      id: 1,
      name: 'Novo Produto',
      price: 19.99,
      type: 'Tipo 1',
      category: 'Categoria 1',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
    });

    const response = await editarDadosProduto(id, novoDado);

    expect(response).toEqual(expectedResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer TOKEN_MOCK`,
      },
      body: JSON.stringify(novoDado),
    });
  });

  test('Deve lançar um erro ao editar os dados do produto', async () => {
    const id = 1;
    const novoDado = {
      name: 'Novo Produto',
      price: 19.99,
    };
    const errorMessage = 'Erro ao editar os dados do produto';
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ error: errorMessage }),
    });

    await expect(editarDadosProduto(id, novoDado)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer TOKEN_MOCK`,
      },
      body: JSON.stringify(novoDado),
    });
  });

  test('Deve lançar um erro ao editar os dados do produto com token expirado', async () => {
    const id = 1;
    const novoDado = {
      name: 'Novo Produto',
      price: 19.99,
    };
    const errorMessage = 'O token expirou, faça login novamente!';
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValueOnce({ error: errorMessage }),
    });

    await expect(editarDadosProduto(id, novoDado)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer TOKEN_MOCK`,
      },
      body: JSON.stringify(novoDado),
    });
  });

  test('Deve lançar um erro ao editar os dados do produto quando o usuário não está autenticado', async () => {
    const id = 1;
    const novoDado = {
      name: 'Novo Produto',
      price: 19.99,
    };
    const errorMessage = 'Usuário não autenticado';
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: jest.fn().mockResolvedValueOnce({ error: errorMessage }),
    });

    await expect(editarDadosProduto(id, novoDado)).rejects.toThrow(errorMessage);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer TOKEN_MOCK`,
      },
      body: JSON.stringify(novoDado),
    });
  });
});
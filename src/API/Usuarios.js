import {
  API_URL,
  pegarAuthToken,
  setAuthToken,
} from './localStorage/LocalStorageToken.js';
import fetch from 'node-fetch';

export const login = async (email, password, name) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
  if (response.status === 400) {
    throw new Error('Senha incorreta ou usuário não cadastrado!');
  }
  const data = await response.json();
  const authToken = data.accessToken;
  const user = data.user;

  setAuthToken(authToken, user);

  return data;
};

export const criarUsuario = async (nome, email, password, role) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nome,
      email: email,
      password: password,
      role: role,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('O token expirou, faça login novamente!');
    }
    throw new Error('Erro ao criar o usuário');
  }
};

export const listarUsuarios = async () => {
  if (!pegarAuthToken()) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('O token expirou, faça login novamente!');
    }
    throw new Error('Erro ao obter usuários');
  }

  return response.json();
};



export const deletarUsuario = async (id) => {

  if (!pegarAuthToken()) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('O token expirou, faça login novamente!');
    }
    throw new Error('Erro ao deletar usuário');
  }
  const respostaApi = await response.json();
  return respostaApi;
};


export const editarUsuario = async (uid, novoUsuario) => {
  if (!pegarAuthToken()) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/users/${uid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pegarAuthToken()}`,
    },
    body: JSON.stringify(novoUsuario),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('O token expirou, faça login novamente!');
    }
    throw new Error('Erro ao editar o usuário');
  }

  const respostaApi = await response.json();
  return respostaApi;
};


export const obterNomeUsuario = () => {
  const authToken = localStorage.getItem('authToken');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (authToken && user && user.name) {
    return user.name;
  }
  return null;
};

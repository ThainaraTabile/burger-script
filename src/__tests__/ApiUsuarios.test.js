/* eslint-disable jest/no-identical-title */

// import { login,
//  } from "../API/Usuarios";
//   import '@testing-library/jest-dom/extend-expect';



import { login,
criarUsuario,
} from "../API/Usuarios";
import { pegarAuthToken, API_URL } from "../API/localStorage/LocalStorageToken";
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve fazer uma solicitação de login e definir o token e o usuário corretamente', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const name = 'John Doe';

    const accessToken = 'meu-token';
    const user = { id: 1, nome: 'Usuário Mock' };
    const response = { accessToken, user };

    // Simula a resposta da solicitação de login
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(response),
    });

    await login(email, password, name);

    // Verifica se a função fetch foi chamada com os parâmetros corretos
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    // Verifica se o token e o usuário foram definidos corretamente no localStorage
    expect(pegarAuthToken()).toBe(accessToken);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
  });

  it('deve lançar um erro quando a senha estiver incorreta ou o usuário não estiver cadastrado', async () => {
    const email = 'test@example.com';
    const password = 'wrong-password';
    const name = 'John Doe';

    // Simula a resposta da solicitação de login com status 400
    fetch.mockResolvedValueOnce({
      status: 400,
    });

    await expect(login(email, password, name)).rejects.toThrowError('Senha incorreta ou usuário não cadastrado!');
  });
});




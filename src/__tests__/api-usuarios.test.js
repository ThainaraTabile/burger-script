import {
    criarUsuario,
    login,
    listarUsuarios,
    obterNomeUsuario
} from '../API/Usuarios';
import { pegarAuthToken, API_URL } from '../API/localStorage/LocalStorageToken';
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('login', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('deve fazer uma solicitação de login e definir o token e o usuário corretamente', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const name = 'John Doe';
        const accessToken = 'meu-token';
        const user = { id: 1, nome: 'Usuário Mock' };
        const response = { accessToken, user, status: 200 };
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


    test('deve lançar um erro quando a senha estiver incorreta ou o usuário não estiver cadastrado', async () => {
        const email = 'test@example.com';
        const password = 'wrong-password';
        const name = 'John Doe';
        const response = { status: 400 };
        // Simula a resposta da solicitação de login
        fetch.mockResolvedValueOnce({
            status: 400,
            json: jest.fn().mockResolvedValue(response),
        });

        await expect(login(email, password, name)).rejects.toThrowError(
            'Senha incorreta ou usuário não cadastrado!'
        );
    });

});


describe('CriarUsuario', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });
    test('Deve criar um novo usuário', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const name = 'John Doe';
        const role = 'Atendimento'
        const response = { ok: true };

        fetch.mockResolvedValueOnce(
            response
        );

        await criarUsuario(name, email, password, role);

        expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
        });

    });

    test('deve lançar um erro quando não for possível criar usuário e não for por erro de autenticação', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const name = 'John Doe';
        const role = 'Atendimento'
        const response = { ok: false };
        fetch.mockResolvedValueOnce(
            response
        );
        await expect(criarUsuario(name, email, password, role)).rejects.toThrowError(
            'Erro ao criar o usuário'
        );
    });


    test('deve lançar um erro quando não for possível criar usuário por erro de autenticação', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const name = 'John Doe';
        const role = 'Atendimento'
        const response = { status: 401 };
        fetch.mockResolvedValueOnce(
            response
        );
        await expect(criarUsuario(name, email, password, role)).rejects.toThrowError(
            'O token expirou, faça login novamente!'
        );
    });
});

describe('listarUsuarios', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('deve retornar uma lista de usuários', async () => {
        const accessToken = 'seuToken';
        const usuarios = [{ id: 1, nome: 'Usuário 1' }, { id: 2, nome: 'Usuário 2' }];
        // Simula a autenticação do usuário definindo o token no localStorage
        localStorage.setItem('authToken', accessToken);

        const response = {
            ok: true,
            json: jest.fn().mockResolvedValue(usuarios),
        };

        fetch.mockResolvedValueOnce(response);

        const resultado = await listarUsuarios();

        expect(pegarAuthToken()).toBe(accessToken);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        expect(resultado).toEqual(usuarios);
        expect(response.json).toHaveBeenCalled();
    });


    test('deve lançar um erro quando a lista de usuários não puder ser exibida por erro de autenticação', async () => {
        const response = { status: 401 };
        fetch.mockResolvedValueOnce(
            response
        );
        await expect(listarUsuarios()).rejects.toThrowError(
            'Usuário não autenticado'
        );
    });
});



describe('obterNomeUsuario', () => {
    afterEach(() => {
        global.localStorage.clear();
    });

    it('deve retornar o nome do usuário se o authToken e userData forem válidos', () => {
        const authToken = 'meu-token';
        const user = {
            name: 'John Doe',
        };

        global.localStorage.setItem('authToken', authToken);
        global.localStorage.setItem('user', JSON.stringify(user));

        const nomeUsuario = obterNomeUsuario();

        expect(nomeUsuario).toBe('John Doe');
    });

    it('deve retornar null se o authToken ou userData forem inválidos', () => {
        const authToken = null;
        const user = null;

        global.localStorage.setItem('authToken', authToken);
        global.localStorage.setItem('user', JSON.stringify(user));

        const nomeUsuario = obterNomeUsuario();

        expect(nomeUsuario).toBeNull();
    });

    it('deve retornar null se o nome do usuário não estiver presente', () => {
        const authToken = 'meu-token';
        const user = {};

        global.localStorage.setItem('authToken', authToken);
        global.localStorage.setItem('user', JSON.stringify(user));

        const nomeUsuario = obterNomeUsuario();

        expect(nomeUsuario).toBeNull();
    });
});
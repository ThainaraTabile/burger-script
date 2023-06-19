import {
    criarUsuario,
    login,
    listarUsuarios,
    obterNomeUsuario,
    editarUsuario,
    deletarUsuario
} from '../API/Usuarios';
import { pegarAuthToken, API_URL } from '../API/localStorage/LocalStorageToken';
import fetch from 'node-fetch';

jest.mock('node-fetch');


describe('API Usuários', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('login', () => {


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

        test('deve lançar um erro se o token estiver expirado', async () => {

            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'O token expirou, faça login novamente!' };
            fetch.mockResolvedValue({
                ok: false,
                status: 401,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(listarUsuarios()).rejects.toThrowError('O token expirou, faça login novamente!');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
        test('deve lançar um erro ao ocorrer um erro na resposta da API', async () => {

            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'Erro ao obter usuários' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(listarUsuarios()).rejects.toThrowError('Erro ao obter usuários');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });

    });



    describe('obterNomeUsuario', () => {


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

    describe('editarUsuario', () => {
        test('deve retornar a resposta positiva da API ao editar os dados do usuário', async () => {
            const accessToken = 'seuToken';
            const uid = 123; // ID do usuário
            const novoDado = {
                // Dados atualizados do produto
                nome: 'Novo Nome',
            };
            localStorage.setItem('authToken', accessToken);
            // Simulando a resposta da API
            const mockApiResponse = { success: true, message: 'Dado do usuário editado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });
            // Executando a função
            const resultado = await editarUsuario(uid, novoDado);
            // Verificando se a função fetch foi chamada corretamente
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(novoDado),
            });
            // Verificando se o resultado retornado é o esperado
            expect(resultado).toEqual(mockApiResponse);
        });

        test('deve lançar um erro ao ocorrer um erro na chamada da API', async () => {
            const uid = 123; // ID do usuário
            const novoDado = { nome: 'Novo Nome' };
            const accessToken = 'seuToken';

            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'Erro ao editar o usuário' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(editarUsuario(uid, novoDado)).rejects.toThrowError('Erro ao editar o usuário');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(novoDado),
            });
        });

        test('deve lançar um erro se o token estiver expirado', async () => {
            const uid = 123; // uid do usuário
            const novoDado = { nome: 'Novo Nome' };

            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'O token expirou, faça login novamente!' };
            fetch.mockResolvedValue({
                ok: false,
                status: 401,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(editarUsuario(uid, novoDado)).rejects.toThrowError('O token expirou, faça login novamente!');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(novoDado),
            });
        });
        test('deve lançar um erro se o usuário não estiver autenticado', async () => {
            const uid = 123; // ID do usuário
            const novoDado = { nome: 'Novo Nome' };
            // Simulando usuário não autenticado
            localStorage.setItem('authToken', '');
            await expect(editarUsuario(uid, novoDado)).rejects.toThrowError('Usuário não autenticado');
        });
    });
    describe('deletarUsuario', () => {
        test('Deve lançar um erro se o usuário não estiver autenticado', async () => {
            const id = 123; // ID do usuário

            // Simulando usuário não autenticado
            localStorage.setItem('authToken', '');
            await expect(deletarUsuario(id)).rejects.toThrowError('Usuário não autenticado');
        });

        test('deve retornar a resposta positiva da API ao deletar usuário', async () => {
            const accessToken = 'seuToken';
            const id = 123; // ID do usuário

            localStorage.setItem('authToken', accessToken);
            // Simulando a resposta da API
            const mockApiResponse = { success: true, message: 'Usuário deletado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });
            // Executando a função
            await expect(deletarUsuario(id)).resolves.toEqual(mockApiResponse);
            // Verificando se a função fetch foi chamada corretamente
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });

        test('deve lançar um erro se o token estiver expirado', async () => {
            const id = 123; // ID do usuario
            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'O token expirou, faça login novamente!' };
            fetch.mockResolvedValue({
                ok: false,
                status: 401,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(deletarUsuario(id)).rejects.toThrowError('O token expirou, faça login novamente!');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });

        test('deve lançar um erro ao ocorrer um erro na resposta da API', async () => {
            const accessToken = 'seuToken';
            const id = 123; // ID do usuário
            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: false, message: 'Erro ao deletar usuário' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(deletarUsuario(id)).rejects.toThrowError('Erro ao deletar usuário');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
    });

});



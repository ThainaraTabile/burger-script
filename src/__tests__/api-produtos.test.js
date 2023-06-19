import {
    adicionarProdutos,
    obterProdutos,
    deletarProduto,
    editarDadosProduto
} from '../API/Produtos';
import fetch from 'node-fetch';
import { pegarAuthToken, API_URL } from '../API/localStorage/LocalStorageToken';

jest.mock('node-fetch');

describe('API Produtos', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });


    describe('adicionarProdutos', () => {

        test('Deve adicionar novos produtos nas listas', async () => {
            const accessToken = 'seuToken';
            const nomeProduto = 'café';
            const precoProduto = 4;
            const tipoProduto = 'café da manhã';
            const categoriaProduto = 'bebidas';
            const idProduto = 2;
            const qntProduto = 5;
            const imgProduto = 'https://raw.githubusercontent.com/ThainaraTabile/burger-queen-api-mock/main/resources/images/10.png';

            const produto = {
                name: nomeProduto,
                price: precoProduto,
                type: tipoProduto,
                category: categoriaProduto,
                id: idProduto,
                qty: qntProduto,
                image: imgProduto,
            };
            localStorage.setItem('authToken', accessToken);

            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(produto),
            };

            fetch.mockResolvedValue(response);

            const resultado = await adicionarProdutos(
                nomeProduto,
                precoProduto,
                tipoProduto,
                categoriaProduto,
                idProduto,
                qntProduto,
                imgProduto,
            );
            expect(pegarAuthToken()).toBe(accessToken);
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(produto),
            });

            expect(resultado).toEqual(produto);
            expect(response.json).toHaveBeenCalled(); // Verifica se a função json() foi chamada
        });

        test('Deve lançar um erro ao adicionar o produto', async () => {
            const nomeProduto = 'café';
            const precoProduto = 4;
            const tipoProduto = 'café da manhã';
            const categoriaProduto = 'bebidas';
            const idProduto = 2;
            const qntProduto = 5;
            const imgProduto = 'https://raw.githubusercontent.com/ThainaraTabile/burger-queen-api-mock/main/resources/images/10.png';

            const error = new Error('Não foi possível se comunicar com API');
            fetch.mockRejectedValue(error);

            await expect(
                adicionarProdutos(
                    nomeProduto,
                    precoProduto,
                    tipoProduto,
                    categoriaProduto,
                    idProduto,
                    qntProduto,
                    imgProduto
                )
            ).rejects.toThrowError(error);
        });
    });
    describe('obterProdutos', () => {
        test('deve retornar uma lista de produtos', async () => {
            const accessToken = 'seuToken';
            const produtos = [{
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
            }];
            // Simula a autenticação do usuário definindo o token no localStorage
            localStorage.setItem('authToken', accessToken);

            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(produtos),
            };

            fetch.mockResolvedValueOnce(response);

            const resultado = await obterProdutos();

            expect(pegarAuthToken()).toBe(accessToken);
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            expect(resultado).toEqual(produtos);
            expect(response.json).toHaveBeenCalled();
        });
    });


    describe('deletarProduto', () => {
        test('deve lançar um erro se o usuário não estiver autenticado', async () => {
            const id = 123; // ID do produto
            // Simulando usuário não autenticado
            localStorage.setItem('authToken', '');
            await expect(deletarProduto(id)).rejects.toThrowError('Usuário não autenticado');
        });

        test('deve deletar o produto com sucesso', async () => {
            const accessToken = 'seuToken';
            const id = 123; // ID do produto

            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: true, message: 'Produto deletado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(deletarProduto(id)).resolves.toEqual(undefined);

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });

        test('deve lançar um erro ao ocorrer um erro na response', async () => {
            const accessToken = 'seuToken';
            const id = 123; // ID do produto
            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: false, message: 'Erro ao deletar produto' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(deletarProduto(id)).rejects.toThrowError('Erro ao deletar produto');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });

    });




    describe('editarDadosProduto', () => {
        test('deve retornar a resposta da API ao editar os dados do produto', async () => {
            const accessToken = 'seuToken';
            const id = 123; // ID do produto
            const novoDado = {
                // Dados atualizados do produto
                nome: 'Novo Nome',
                preco: 10.99,
                descricao: 'Nova Descrição',
            };
            localStorage.setItem('authToken', accessToken);
            // Simulando a resposta da API
            const mockApiResponse = { success: true, message: 'Produto editado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });
            // Executando a função
            const resultado = await editarDadosProduto(id, novoDado);
            // Verificando se a função fetch foi chamada corretamente
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
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


        test('deve lançar um erro se o usuário não estiver autenticado', async () => {
            const id = 123; // ID do produto
            const novoDado = { nome: 'Novo Produto' };

            // Simulando usuário não autenticado
            localStorage.setItem('authToken', '');

            await expect(editarDadosProduto(id, novoDado)).rejects.toThrowError('Usuário não autenticado');
        });


        test('deve lançar um erro se o token estiver expirado', async () => {
            const id = 123; // ID do produto
            const novoDado = { nome: 'Novo Produto' };

            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'O token expirou, faça login novamente!' };
            fetch.mockResolvedValue({
                ok: false,
                status: 401,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(editarDadosProduto(id, novoDado)).rejects.toThrowError('O token expirou, faça login novamente!');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(novoDado),
            });
        });

        test('deve lançar um erro ao ocorrer um erro na chamada da API', async () => {
            const id = 123; // ID do produto
            const novoDado = { nome: 'Novo Produto' };

            const accessToken = 'seuToken';
            localStorage.setItem('authToken', accessToken);

            const mockApiResponse = { success: false, message: 'Erro ao editar os dados do produto' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(editarDadosProduto(id, novoDado)).rejects.toThrowError('Erro ao editar os dados do produto');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(novoDado),
            });
        });

    });
});


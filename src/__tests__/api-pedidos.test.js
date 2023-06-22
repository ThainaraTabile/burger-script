import fetch from 'node-fetch';
import {
    obterPedidos,
    adicionarPedido,
    atualizarStatusPedido
} from '../API/Pedidos';

import { pegarAuthToken, API_URL } from '../API/localStorage/LocalStorageToken';

jest.mock('node-fetch');

describe('API Pedidos', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('obterPedidos', () => {
        test('Deve obter uma lista de pedidos', async () => {
            const accessToken = 'seuToken';
            const listDePedidos = [{
                id: 1,
                client: 'Luigi',
                waiter: 'Mario',
                table: 1,
                products: [{
                    qty: 1,
                    product: {
                        id: 2,
                        name: 'Sanduíche de teste',
                        price: 3,
                        type: 'café da manhã',
                        dateEntry: '19-06-2023 16:10:12'

                    }
                }],
                status: 'pendente',
                dateEntry: '19-06-2023 16:10:12'
            },

            {
                id: 12,
                client: 'Atendente',
                waiter: 'Cliente Teste',
                table: 1,
                products: [{
                    qty: 1,
                    product: {
                        id: 2,
                        name: 'Café',
                        price: 5,
                        type: 'café da manhã',
                        dateEntry: '19-06-2023 16:10:12'

                    }
                }],
                status: 'pendente',
                dateEntry: '19-06-2023 16:10:12'
            }]

            localStorage.setItem('authToken', accessToken);
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(listDePedidos),
            };
            fetch.mockResolvedValueOnce(response);
            const resultado = await obterPedidos();

            expect(pegarAuthToken()).toBe(accessToken);
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            expect(resultado).toEqual(listDePedidos);
            expect(response.json).toHaveBeenCalled();

        });// test

        test('deve lançar um erro ao ocorrer um erro na chamada da API', async () => {
            const accessToken = 'seuToken';

            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: false, message: 'Erro ao obter pedidos' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(obterPedidos()).rejects.toThrowError('Erro ao obter pedidos');

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });


    });
    describe('adicionarPedido', () => {

        test('Deve adicionar um novo pedido com sucesso', async () => {
            const accessToken = 'seuToken';
            const cliente = 'Cliente A';
            const mesa = 1;
            const produtos = [
                { id: 1, name: 'Hambúrguer', type: 'sanduíche', price: 10, table: 1, quantity: 2, client: 'Cliente A' },
                { id: 2, name: 'Batata Frita', type: 'acompanhamento', price: 5, table: 1, quantity: 1, client: 'Cliente A' },
            ];
            const atendente = 'Atendente A';

            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: true, message: 'Pedido adicionado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });
            jest.useFakeTimers('modern').setSystemTime(new Date(2023, 5, 21, 21, 54, 0, 0));
            jest.spyOn(global.Math, 'random').mockReturnValue(123456);

            const resultado = await adicionarPedido(cliente, mesa, produtos, atendente);
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    waiter: atendente,
                    client: cliente,
                    table: mesa,
                    products: [
                        { qty: 2, client: 'Cliente A', product: { id: 1, name: 'Hambúrguer', type: 'sanduíche', price: 10, table: 1 } },
                        { qty: 1, client: 'Cliente A', product: { id: 2, name: 'Batata Frita', type: 'acompanhamento', price: 5, table: 1 } },
                    ],
                    status: 'pendente',
                    dateEntry: '21-06-2023 21:54',
                    id: 123456000,
                }),
            });

            // Verificando se o resultado retornado é o esperado
            expect(resultado).toEqual(mockApiResponse);
            jest.spyOn(global.Math, 'random').mockRestore();
            jest.useRealTimers()
        });

        test('Deve lançar um erro ao adicionar o pedido', async () => {
            const accessToken = 'seuToken';
            const cliente = 'Cliente A';
            const mesa = 1;
            const produtos = [
                { id: 1, name: 'Hambúrguer', type: 'sanduíche', price: 10, table: 1, quantity: 2, client: 'Cliente A' },
                { id: 2, name: 'Batata Frita', type: 'acompanhamento', price: 5, table: 1, quantity: 1, client: 'Cliente A' },
            ];
            const atendente = 'Atendente A';

            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: false, message: 'Erro ao adicionar pedido' };
            fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            await expect(adicionarPedido(cliente, mesa, produtos, atendente)).rejects.toThrow('Erro ao adicionar pedido');
        });
    });


    describe('atualizarStatusPedido', () => {
        test('Deve atualizar o status do pedido com sucesso', async () => {
            const accessToken = 'seuToken';
            const pedidoId = 3;
            const dataProcessamento = '19-06-2023 18:00:09';
            const novoStatus = {
                status: 'Aguardando Entrega',
                dateProcessed: dataProcessamento,
            };

            localStorage.setItem('authToken', accessToken);
            const mockApiResponse = { success: true, message: 'Status alterado com sucesso' };
            fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockApiResponse),
            });

            const resultado = await atualizarStatusPedido(pedidoId, novoStatus);

            expect(fetch).toHaveBeenCalledWith(`${API_URL}/orders/${pedidoId}`, expect.objectContaining({
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: expect.stringContaining(JSON.stringify(novoStatus)),
            }));

            // Verificando se o resultado retornado é o esperado
            expect(resultado).toEqual(mockApiResponse);
        });


        test('Deve lançar um erro ao atualizar o status do pedido', async () => {
            const pedidoId = 3;
            const novoStatus = {
                status: 'Aguardando Entrega',
                dateProcessed: '19-06-2023 18:00:09',
            };

            fetch.mockResolvedValue({
                ok: false,
            });

            await expect(atualizarStatusPedido(pedidoId, novoStatus)).rejects.toThrow(
                'Erro ao atualizar o status do pedido'
            );
        });
    });
});
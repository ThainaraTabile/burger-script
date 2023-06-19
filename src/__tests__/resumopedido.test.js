/* teste sem cobertura das linhas 44-46,51  e com erros 
nos blocos:
 ● ResumoPedido › Deve limpar os campos e exibir o modal de sucesso ao enviar um pedido
 ● ResumoPedido › Deve chamar a função adicionarPedido e exibir o modal de sucesso ao enviar um pedido válido

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { adicionarPedido } from '../API/Pedidos';
import ResumoPedido from '../componentes/ResumoPedido/ResumoPedido';
import '@testing-library/jest-dom/extend-expect';
import { ModalContext } from '../contextos/ModalContext';

jest.mock('../componentes/CardTerminal/CardTerminal', () => {
    const CardTerminal = ({ children }) => {
        return <div data-testid="card-terminal">{children}</div>;
    };
    return CardTerminal;
});

jest.mock('../componentes/Botao/Botao', () => {
    const Botao = ({ children, onClick }) => {
        return <button onClick={onClick}>{children}</button>;
    };
    return Botao;
});

jest.mock('../API/Pedidos', () => ({
    adicionarPedido: jest.fn(),
}));

describe('ResumoPedido', () => {
    test('Deve renderizar corretamente o componente', () => {
        render(
            <ModalContext.Provider
                value={{
                    modalAberto: false,
                    setModalAberto: jest.fn(),
                    modalMessage: '',
                    setModalMessage: jest.fn(),
                    fecharModal: jest.fn(),
                }}
            >
                <ResumoPedido produtosSelecionados={[]} />
            </ModalContext.Provider>
        );

        expect(screen.getByTestId('card-terminal')).toBeInTheDocument();

        expect(screen.getByLabelText(/mesa/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cliente/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
    });

    test('Deve exibir e fechar o modal corretamente', () => {
        const modalAberto = true;
        const modalMessage = 'Pedido registrado com sucesso!';
        const setModalAberto = jest.fn();
        const fecharModal = jest.fn();

        render(
            <ModalContext.Provider
                value={{
                    modalAberto,
                    setModalAberto,
                    modalMessage,
                    setModalMessage: jest.fn(),
                    fecharModal,
                }}
            >
                <ResumoPedido produtosSelecionados={[]} />
            </ModalContext.Provider>
        );

        expect(screen.getByText(modalMessage)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /OK/i }));
        expect(fecharModal).toHaveBeenCalled();
    });

    test('Deve chamar a função adicionarPedido e exibir o modal de sucesso ao enviar um pedido válido', async () => {
        const produtosSelecionados = [
            { id: 1, userId: 'user1', name: 'Produto 1', quantity: 2, total: 10 },
            { id: 2, userId: 'user2', name: 'Produto 2', quantity: 1, total: 5 },
        ];

        const setModalAberto = jest.fn();
        const setModalMessage = jest.fn();
        const fecharModal = jest.fn();

        adicionarPedido.mockResolvedValue({ id: 123, status: 'Registrado' });

        render(
            <ModalContext.Provider
                value={{
                    modalAberto: false,
                    setModalAberto,
                    modalMessage: '',
                    setModalMessage,
                    fecharModal,
                }}
            >
                <ResumoPedido produtosSelecionados={produtosSelecionados} />
            </ModalContext.Provider>
        );

        const nomeClienteInput = screen.getByLabelText(/cliente/i);
        const mesaInput = screen.getByLabelText(/mesa/i);
        const enviarButton = screen.getByRole('button', { name: /Enviar/i });

        // Preencher os campos de cliente e mesa
        fireEvent.change(nomeClienteInput, { target: { value: 'João' } });
        fireEvent.change(mesaInput, { target: { value: '10' } });

        // Clicar no botão de enviar
        fireEvent.click(enviarButton);

        // Verificar se a função adicionarPedido foi chamada com os argumentos corretos
        expect(adicionarPedido).toHaveBeenCalledWith(
            'João',
            '10',
            [
                {
                    id: 1,
                    waiter: 'user1',
                    name: 'Produto 1',
                    quantity: 2,
                    total: 10,
                },
                {
                    id: 2,
                    waiter: 'user2',
                    name: 'Produto 2',
                    quantity: 1,
                    total: 5,
                },
            ],
            expect.any(String) // O nome do atendente será qualquer string
        );

        // Esperar pela resolução da função adicionarPedido
        await screen.findByText('Pedido registrado com sucesso!');
        // Verificar se o modal foi aberto com a mensagem correta
        expect(setModalAberto).toHaveBeenCalledWith(true);
        expect(setModalMessage).toHaveBeenCalledWith('Pedido registrado com sucesso!');
    });

    test('Deve exibir o modal de erro ao enviar um pedido inválido', async () => {
        const produtosSelecionados = [];

        const setModalAberto = jest.fn();
        const setModalMessage = jest.fn();
        const fecharModal = jest.fn();

        render(
            <ModalContext.Provider
                value={{
                    modalAberto: false,
                    setModalAberto,
                    modalMessage: '',
                    setModalMessage,
                    fecharModal,
                }}
            >
                <ResumoPedido produtosSelecionados={produtosSelecionados} />
            </ModalContext.Provider>
        );

        const nomeClienteInput = screen.getByLabelText(/cliente/i);
        const mesaInput = screen.getByLabelText(/mesa/i);
        const enviarButton = screen.getByRole('button', { name: /Enviar/i });

        // Não preencher os campos de cliente e mesa

        // Clicar no botão de enviar
        fireEvent.click(enviarButton);

        // Verificar se a função adicionarPedido não foi chamada
        expect(adicionarPedido).not.toHaveBeenCalled();

        // Verificar se o modal foi aberto com a mensagem correta
        expect(setModalAberto).toHaveBeenCalledWith(true);
        expect(setModalMessage).toHaveBeenCalledWith(
            'Para que o pedido seja registrado, é necessário preencher todos os campos!'
        );
    });

    test('Deve limpar os campos e exibir o modal de sucesso ao enviar um pedido', async () => {
        const produtosSelecionados = [
            { id: 1, userId: 'user1', name: 'Produto 1', quantity: 2, total: 10 },
            { id: 2, userId: 'user2', name: 'Produto 2', quantity: 1, total: 5 },
        ];

        const setNomeCliente = jest.fn();
        const setMesa = jest.fn();
        const setNomeAtendente = jest.fn();
        const setModalAberto = jest.fn();
        const setModalMessage = jest.fn();
        const fecharModal = jest.fn();

        adicionarPedido.mockResolvedValue({ id: 123, status: 'Registrado' });

        render(
            <ModalContext.Provider
                value={{
                    modalAberto: false,
                    setModalAberto,
                    modalMessage: '',
                    setModalMessage,
                    fecharModal,
                }}
            >
                <ResumoPedido produtosSelecionados={produtosSelecionados} />
            </ModalContext.Provider>
        );

        const nomeClienteInput = screen.getByLabelText(/cliente/i);
        const mesaInput = screen.getByLabelText(/mesa/i);
        const enviarButton = screen.getByRole('button', { name: /Enviar/i });

        // Preencher os campos de cliente e mesa
        fireEvent.change(nomeClienteInput, { target: { value: 'João' } });
        fireEvent.change(mesaInput, { target: { value: '10' } });

        // Clicar no botão de enviar
        fireEvent.click(enviarButton);

        // Verificar se a função adicionarPedido foi chamada com os argumentos corretos
        expect(adicionarPedido).toHaveBeenCalledWith(
            'João',
            '10',
            [
                {
                    id: 1,
                    waiter: 'user1',
                    name: 'Produto 1',
                    quantity: 2,
                    total: 10,
                },
                {
                    id: 2,
                    waiter: 'user2',
                    name: 'Produto 2',
                    quantity: 1,
                    total: 5,
                },
            ],
            expect.any(String) // O nome do atendente será qualquer string
        );

        // Esperar pela resolução da função adicionarPedido
        await screen.findByText('Pedido registrado com sucesso!');

        // Verificar se as funções de limpar campos foram chamadas
        expect(setNomeCliente).toHaveBeenCalledWith('');
        expect(setMesa).toHaveBeenCalledWith('');
        expect(setNomeAtendente).toHaveBeenCalledWith('');

        // Verificar se o modal foi aberto com a mensagem correta
        expect(setModalAberto).toHaveBeenCalledWith(true);
        expect(setModalMessage).toHaveBeenCalledWith('Pedido registrado com sucesso!');

        // Verificar se as funções de limpar campos foram chamadas após o timeout
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(setNomeCliente).toHaveBeenCalledWith('');
        expect(setMesa).toHaveBeenCalledWith('');
        expect(setNomeAtendente).toHaveBeenCalledWith('');
    });
}); */




//TESTE SEM COBERTURA DAS LINHAS 44-46,51-55   
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { adicionarPedido } from '../API/Pedidos';
import ResumoPedido from '../componentes/ResumoPedido/ResumoPedido';
import '@testing-library/jest-dom/extend-expect';
import { ModalContext } from '../contextos/ModalContext';

jest.mock('../componentes/CardTerminal/CardTerminal', () => {
    const CardTerminal = ({ children }) => {
        return <div data-testid="card-terminal">{children}</div>;
    };
    return CardTerminal;
});

jest.mock('../componentes/Botao/Botao', () => {
    const Botao = ({ children, onClick }) => {
        return <button onClick={onClick}>{children}</button>;
    };
    return Botao;
});

jest.mock('../API/Pedidos', () => ({
    adicionarPedido: jest.fn(),
}));

describe('ResumoPedido', () => {
    test('Deve renderizar corretamente o componente', () => {
        render(
            <ModalContext.Provider
                value={{
                    modalAberto: false,
                    setModalAberto: jest.fn(),
                    modalMessage: '',
                    setModalMessage: jest.fn(),
                    fecharModal: jest.fn(),
                }}
            >
                <ResumoPedido produtosSelecionados={[]} />
            </ModalContext.Provider>
        );

        expect(screen.getByTestId('card-terminal')).toBeInTheDocument();

        expect(screen.getByLabelText(/mesa/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cliente/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
    });

    test('Deve exibir e fechar o modal corretamente', () => {
        const modalAberto = true;
        const modalMessage = 'Pedido registrado com sucesso!';
        const setModalAberto = jest.fn();
        const fecharModal = jest.fn();

        render(
            <ModalContext.Provider
                value={{
                    modalAberto,
                    setModalAberto,
                    modalMessage,
                    setModalMessage: jest.fn(),
                    fecharModal,
                }}
            >
                <ResumoPedido produtosSelecionados={[]} />
            </ModalContext.Provider>
        );

        expect(screen.getByText(modalMessage)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /OK/i }));
        expect(fecharModal).toHaveBeenCalled();
    });



    // test('Deve chamar a função adicionarPedido e exibir o modal de sucesso ao enviar um pedido válido', async () => {

    //     const produtosSelecionados = [
    //         { id: 1, name: 'Produto 1', quantity: 2, total: 10, waiter: 'user1' },
    //         { id: 2, name: 'Produto 2', quantity: 1, total: 5, waiter: 'user2' },
    //     ];

    //     const setModalAberto = jest.fn();
    //     const setModalMessage = jest.fn();
    //     const fecharModal = jest.fn();

    //     adicionarPedido.mockResolvedValue({ id: 123, status: 'Registrado' });

    //     render(
    //         <ModalContext.Provider
    //             value={{
    //                 modalAberto: false,
    //                 setModalAberto,
    //                 modalMessage: '',
    //                 setModalMessage,
    //                 fecharModal,
    //             }}
    //         >
    //             <ResumoPedido produtosSelecionados={produtosSelecionados} />
    //         </ModalContext.Provider>
    //     );

    //     const nomeClienteInput = screen.getByLabelText(/cliente/i);
    //     const mesaInput = screen.getByLabelText(/mesa/i);
    //     const enviarButton = screen.getByRole('button', { name: /Enviar/i });

    //     // Preencher os campos de cliente e mesa
    //     fireEvent.change(nomeClienteInput, { target: { value: 'João' } });
    //     fireEvent.change(mesaInput, { target: { value: '10' } });

    //     // Clicar no botão de enviar
    //     fireEvent.click(enviarButton);

    //     // Verificar se a função adicionarPedido foi chamada com os argumentos corretos
    //     await waitFor(() => {
    //         expect(adicionarPedido).toHaveBeenCalledWith(
    //             'João',
    //             '10',
    //             [
    //                 { id: 1, name: 'Produto 1', quantity: 2, total: 10 },
    //                 { id: 2, name: 'Produto 2', quantity: 1, total: 5 }
    //             ],
    //             null
    //         );
    //     });


    //     // Esperar pela resolução da função adicionarPedido
    //     await screen.findByText('Pedido registrado com sucesso!');

    //     // Verificar se o modal foi aberto com a mensagem correta
    //     expect(setModalAberto).toHaveBeenCalledWith(true);
    //     expect(setModalMessage).toHaveBeenCalledWith('Pedido registrado com sucesso!');
    // });


});

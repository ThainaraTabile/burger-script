import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FazerPedido from "../Paginas/Atendimento/FazerPedido/FazerPedido";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { expect } from '@jest/globals';


jest.mock('../Autenticacao/Auth', () => {
    return () => <div data-testid="token-expiracao-mock"></div>;
});

jest.mock('../componentes/MenuNavegacao/MenuNavegacao', () => {
    const MenuNavegacao = () => {
        return <div data-testid="menu-navegacao-mock"></div>;
    };
    return MenuNavegacao;
});

jest.mock('../componentes/MenuHamburger/MenuHamburger', () => {
    const MenuHamburger = () => {
        return <div data-testid="menu-hamburger-mock"></div>;
    };
    return MenuHamburger;
});

jest.mock('../componentes/ResumoPedido/ResumoPedido', () => {
    const ResumoPedido = () => {
        return <div data-testid="resumo-pedido-mock"></div>;
    };
    return ResumoPedido;
});




describe('FazerPedido', () => {
    test('Deve renderizar correntamente o componente', () => {
        render(
            <BrowserRouter>
                <FazerPedido />
            </BrowserRouter>
        );
        expect(screen.getByTestId('token-expiracao-mock')).toBeInTheDocument();
        expect(screen.getAllByTestId('menu-navegacao-mock')).toHaveLength(1);
        expect(screen.getAllByTestId('menu-hamburger-mock')).toHaveLength(2);
        expect(screen.getAllByTestId('resumo-pedido-mock')).toHaveLength(1);

    });

    // bloco para testar eventos de click



});
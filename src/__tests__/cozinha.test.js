import Cozinha from "../Paginas/Cozinha/Cozinha";
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';


jest.mock('../componentes/Header/Header', () => {
    const Header = () => {
        return <div data-testid="header-mock"></div>;
    };
    return Header;
});

jest.mock('../Autenticacao/Auth', () => {
    return () => <div data-testid="token-expiracao-mock"></div>;
});

jest.mock('../componentes/MenuNavegacao/MenuNavegacao', () => {
    const MenuNavegacao = () => {
        return <div data-testid="menu-navegacao-mock"></div>;
    };
    return MenuNavegacao;
});

jest.mock('../componentes/Footer/Footer', () => {
    const Footer = () => {
        return <div data-testid="footer-mock"></div>;
    };
    return Footer;
});

describe('Cozinha', () => {
    test('Deve renderizar corretamente o componente', () => {
        render(
            <BrowserRouter>
                <Cozinha />
            </BrowserRouter>
        );

        expect(screen.getByTestId('header-mock')).toBeInTheDocument();
        expect(screen.getByTestId('token-expiracao-mock')).toBeInTheDocument();
        expect(screen.getAllByTestId('menu-navegacao-mock')).toHaveLength(2);
        expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
    });

    test('Deve sair ao clicar no botão sair', () => {
        const history = createBrowserHistory();
        render(
            <MemoryRouter>
                <Cozinha />
            </MemoryRouter>
        );

        const botaoSair = screen.getByText('Sair');
        userEvent.click(botaoSair);

        expect(history.location.pathname).toBe('/');
    });

});



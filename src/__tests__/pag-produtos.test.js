import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import Produtos from "../Paginas/Adm/PagProdutos/Produtos";

jest.mock('../Autenticacao/Auth', () => {
    return () => <div data-testid="token-expiracao-mock"></div>;
});

jest.mock('../componentes/MenuNavegacao/MenuNavegacao', () => {
    const MenuNavegacao = () => {
        return <div data-testid="menu-navegacao-mock"></div>;
    };
    return MenuNavegacao;
});
jest.mock('../componentes/Formulario/FormularioProdutos', () => {
    const FormularioProdutos = () => {
        return <div data-testid="formulario-produtos-mock"></div>;
    };
    return FormularioProdutos;
});

jest.mock('../Paginas/Adm/PagProdutos/ListaDeProdutos', () => {
    const ListaDeProdutos = () => {
        return <div data-testid="lista-produtos-mock"></div>;
    };
    return ListaDeProdutos;
});

describe('Produtos', () => {
    test('Deve renderizar corretamente o componente', () => {
        render(
            <BrowserRouter>
                <Produtos />
            </BrowserRouter>
        );

        expect(screen.getByText('Voltar')).toBeInTheDocument();
        expect(screen.getByTestId('token-expiracao-mock')).toBeInTheDocument();
        expect(screen.getAllByTestId('menu-navegacao-mock')).toHaveLength(1);
        expect(screen.getByTestId('formulario-produtos-mock')).toBeInTheDocument();
        expect(screen.getByTestId('lista-produtos-mock')).toBeInTheDocument();
    });

    test('Deve sair ao clicar no botão sair', () => {
        const history = createBrowserHistory();
        render(
            <MemoryRouter>
                <Produtos />
            </MemoryRouter>
        );

        const botaoSair = screen.getByText('Voltar');
        userEvent.click(botaoSair);

        expect(history.location.pathname).toBe('/');
    });
});

import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';


import Colaboradores from "../Paginas/Adm/PagColaboradores/Colaboradores";

jest.mock('../Autenticacao/Auth', () => {
    return () => <div data-testid="token-expiracao-mock"></div>;
});

jest.mock('../componentes/MenuNavegacao/MenuNavegacao', () => {
    const MenuNavegacao = () => {
        return <div data-testid="menu-navegacao-mock"></div>;
    };
    return MenuNavegacao;
});

describe('Colaboradores', () => {
    test('Deve renderizar corretamente o componente', () => {
        render(
            <BrowserRouter>
                <Colaboradores />
            </BrowserRouter>
        );


        expect(screen.getByTestId('token-expiracao-mock')).toBeInTheDocument();
        expect(screen.getAllByTestId('menu-navegacao-mock')).toHaveLength(2);
    });

    test('Deve sair ao clicar no botão sair', () => {
        const history = createBrowserHistory();
        render(
            <MemoryRouter>
                <Colaboradores />
            </MemoryRouter>
        );

        const botaoSair = screen.getByText('Voltar');
        userEvent.click(botaoSair);

        expect(history.location.pathname).toBe('/');
    });
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { expect } from '@jest/globals';
import AppRoutes from '../Rotas';

jest.mock('../Paginas/Atendimento/Atendimento', () => {
    return () => <div data-testid="atendimento-mock"></div>;
});

jest.mock('../Paginas/Atendimento/FazerPedido/FazerPedido', () => {
    return () => <div data-testid="fazerpedido-mock"></div>;
});

jest.mock('../Paginas/Atendimento/AguardandoEntrega/AguardandoEntrega', () => {
    return () => <div data-testid="aguardandoentrega-mock"></div>;
});

jest.mock('../Paginas/Atendimento/PedidosEntregues/PedidosEntregues', () => {
    return () => <div data-testid="pedidosentregues-mock"></div>;
});

jest.mock('../Paginas/Cozinha/AgrProducao', () => {
    return () => <div data-testid="aguardandoproducao-mock"></div>;
});

jest.mock('../Paginas/Cozinha/PedidosProntos', () => {
    return () => <div data-testid="pedidosprontos-mock"></div>;
});

jest.mock('../Paginas/Adm/Adm', () => {
    return () => <div data-testid="administracao-mock"></div>;
});
jest.mock('../Paginas/Adm/PagColaboradores/Colaboradores', () => {
    return () => <div data-testid="colaboradores-mock"></div>;
});

jest.mock('../Componentes/CriaEListaUsuario/CriarUsuario', () => {
    return () => <div data-testid="addcolaborador-mock"></div>;
});

jest.mock('../componentes/CriaEListaUsuario/ListaUsuarios', () => {
    return () => <div data-testid="listacolaboradores-mock"></div>;
});


jest.mock('../Paginas/Adm/PagProdutos/Produtos', () => {
    return () => <div data-testid="produtos-mock"></div>;
});

jest.mock('../Paginas/Login/Login', () => {
    return () => <div data-testid="login-mock"></div>;
});

let roleUsuario = '';
const verificarAutenticacaoMock = {
    verificarAutenticacao: () => ({ role: roleUsuario }),
}
jest.mock('../Autenticacao/Auth', () => (verificarAutenticacaoMock));


describe('Rotas', () => {

    describe('/atendimento', () => {
        test('Deve renderizar o componente Atendimento para um usuário que tem a role Atendimento', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/atendimento']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('atendimento-mock')).toBeInTheDocument();
        });

        test('Deve renderizar o componente Login para um usuário que NÃO tem a role Atendimento', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/atendimento']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/fazerpedido', () => {
        test('Deve renderizar o componente FazerPedido para um usuário que tem a role Atendimento', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/fazerpedido']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('fazerpedido-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Atendimento', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/fazerpedido']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/aguardandoentrega', () => {
        test('Deve renderizar o componente AguardandoEntrega para um usuário que tem a role Atendimento', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/aguardandoentrega']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('aguardandoentrega-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Atendimento', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/aguardandoentrega']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/pedidosentregues', () => {
        test('Deve renderizar o componente AguardandoEntrega para um usuário que tem a role Atendimento', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/pedidosentregues']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('pedidosentregues-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Atendimento', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/pedidosentregues']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });
    //agr producao
    describe('/aguardandoproducao', () => {
        test('Deve renderizar o componente AguardandoEntrega para um usuário que tem a role Cozinha', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/aguardandoproducao']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('aguardandoproducao-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Cozinha', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/aguardandoproducao']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/pedidosprontos', () => {
        test('Deve renderizar o componente AguardandoEntrega para um usuário que tem a role Cozinha', () => {
            roleUsuario = 'Cozinha'
            render(
                <MemoryRouter initialEntries={['/pedidosprontos']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('pedidosprontos-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Cozinha', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/pedidosprontos']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    //adm
    describe('/administracao', () => {
        test('Deve renderizar o componente Adm para um usuário que tem a role Administração', () => {
            roleUsuario = 'Administração'
            render(
                <MemoryRouter initialEntries={['/administracao']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('administracao-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Administração', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/administracao']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/colaboradores', () => {
        test('Deve renderizar o componente Colaboradores para um usuário que tem a role Administração', () => {
            roleUsuario = 'Administração'
            render(
                <MemoryRouter initialEntries={['/colaboradores']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('colaboradores-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Administração', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/colaboradores']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/addcolaborador', () => {
        test('Deve renderizar o componente CriarUsuario para um usuário que tem a role Administração', () => {
            roleUsuario = 'Administração'
            render(
                <MemoryRouter initialEntries={['/addcolaborador']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('addcolaborador-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Administração', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/addcolaborador']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });
    });

    describe('/listacolaboradores', () => {
        test('Deve renderizar o componente ListaDeColaboradores para um usuário que tem a role Administração', () => {
            roleUsuario = 'Administração'
            render(
                <MemoryRouter initialEntries={['/listacolaboradores']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('listacolaboradores-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Administração', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/listacolaboradores']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });

    });

    describe('/produtos', () => {
        test('Deve renderizar o componente Produtos para um usuário que tem a role Administração', () => {
            roleUsuario = 'Administração'
            render(
                <MemoryRouter initialEntries={['/produtos']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('produtos-mock')).toBeInTheDocument();
        });

        test('Deve renderizar componente Login para um usuário que NÃO tem a role Administração', () => {
            roleUsuario = 'Atendimento'
            render(
                <MemoryRouter initialEntries={['/produtos']}>
                    <AppRoutes />
                </MemoryRouter>
            );
            expect(screen.getByTestId('login-mock')).toBeInTheDocument();
        });

    });

});

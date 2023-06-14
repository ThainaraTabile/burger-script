import Login from "../Paginas/Login/Login";
import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../componentes/Logo/Logo', () => {
    const Logo = () => {
        return <div data-testid="logo-mock"></div>;
    };
    return Logo;
});

jest.mock('../componentes/Formulario/FormularioLogin', () => {
    const FormularioLogin = () => {
        return <div data-testid="formulario-login-mock"></div>;
    };
    return FormularioLogin;
});

describe('Login', () => {
    it('renderiza corretamente o componente', () => {
        render(<Login />);

        expect(screen.getByTestId('logo-mock')).toBeInTheDocument();
        expect(screen.getByTestId('formulario-login-mock')).toBeInTheDocument();
    });
});
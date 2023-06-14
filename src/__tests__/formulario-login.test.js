import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { login } from '../API/Usuarios';
import FormularioLogin from '../componentes/Formulario/FormularioLogin';
import { useNavigate } from 'react-router-dom';

jest.mock('../API/Usuarios', () => ({
  login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('FormularioLogin', () => {
  test('Realiza o login e navega para a página de destino de acordo com o role de atendimento', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const loginUsuario = {
      user: { role: 'Atendimento' },
    };

    login.mockResolvedValueOnce(loginUsuario);

    const { getByLabelText, getByText } = render(<FormularioLogin />);

    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const acessarButton = getByText('acessar');

    fireEvent.change(emailInput, {
      target: { value: 'atendimento@example.com' },
    });
    fireEvent.change(senhaInput, { target: { value: 'password' } });

    fireEvent.click(acessarButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(
        'atendimento@example.com',
        'password',
        ''
      );
      expect(navigate).toHaveBeenCalledWith('/atendimento');
    });
  });
  test('Realiza o login e navega para a página de destino de acordo com o role cozinha', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const loginUsuario = {
      user: { role: 'Cozinha' },
    };

    login.mockResolvedValueOnce(loginUsuario);

    const { getByLabelText, getByText } = render(<FormularioLogin />);

    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const acessarButton = getByText('acessar');

    fireEvent.change(emailInput, { target: { value: 'cozinha@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'password' } });

    fireEvent.click(acessarButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('cozinha@example.com', 'password', '');
      expect(navigate).toHaveBeenCalledWith('/cozinha');
    });
  });

  test('Realiza o login e navega para a página de destino de acordo com o role de administração', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const loginUsuario = {
      user: { role: 'Administração' },
    };

    login.mockResolvedValueOnce(loginUsuario);

    const { getByLabelText, getByText } = render(<FormularioLogin />);

    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const acessarButton = getByText('acessar');

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'password' } });

    fireEvent.click(acessarButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin@example.com', 'password', '');
      expect(navigate).toHaveBeenCalledWith('/administracao');
    });
  });
});

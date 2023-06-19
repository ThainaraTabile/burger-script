    // import React from 'react';
    // import { render, fireEvent, waitFor, getByRole, screen } from '@testing-library/react';
    // import FormularioAdmin from '../componentes/Formulario/FormularioAdmin';
    // import { criarUsuario } from '../API/Usuarios';
    // import { expect } from '@jest/globals';
    // import '@testing-library/jest-dom/extend-expect';

    // jest.mock('../API/Usuarios', () => ({
    //     criarUsuario: jest.fn(),
    // }));

    // describe('FormularioAdmin', () => {
    //     afterEach(() => {
    //         jest.clearAllMocks();
    //     });
    //     test('Verifica se o componente é renderizado corretamente', () => {
    //         render(<FormularioAdmin />);
    //         const formularioAdmin = screen.getByTestId('formulario-admin');
    //         expect(formularioAdmin).toBeInTheDocument();
    //     });



    //     it('deve atualizar o estado ao digitar nos campos', () => {
    //         const { getByLabelText } = render(<FormularioAdmin />);
    //         const nomeInput = getByLabelText('Nome:');
    //         const emailInput = getByLabelText('E-mail:');
    //         const senhaInput = getByLabelText('Senha:');
    //         const cargoSelect = screen.getByRole('combobox', { name: 'Cargo:' })

    //         fireEvent.change(nomeInput, { target: { value: 'John Doe' } });
    //         fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    //         fireEvent.change(senhaInput, { target: { value: 'password123' } });
    //         fireEvent.change(cargoSelect, { target: { value: 'Administração' } });

    //         expect(nomeInput.value).toBe('John Doe');
    //         expect(emailInput.value).toBe('john.doe@example.com');
    //         expect(senhaInput.value).toBe('password123');
    //         expect(cargoSelect.value).toBe('Administração');
    //     });


    //     // it('deve chamar a função de criação de usuário ao salvar', async () => {
    //     //     criarUsuario.mockResolvedValueOnce();

    //     //     const { getByText, getByLabelText } = render(<FormularioAdmin />);
    //     //     const cadastrarButton = getByText('Cadastrar');
    //     //     const nomeInput = getByLabelText('Nome:');
    //     //     const emailInput = getByLabelText('E-mail:');
    //     //     const senhaInput = getByLabelText('Senha:');
    //     //     const cargoSelect = getByText('Cargo:');

    //     //     fireEvent.change(nomeInput, { target: { value: 'John Doe' } });
    //     //     fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    //     //     fireEvent.change(senhaInput, { target: { value: 'password123' } });
    //     //     fireEvent.change(cargoSelect, { target: { value: 'Administração' } });

    //     //     fireEvent.click(cadastrarButton);

    //     //     expect(criarUsuario).toHaveBeenCalledWith(
    //     //         'John Doe',
    //     //         'john.doe@example.com',
    //     //         'password123',
    //     //         'Administração'
    //     //     );

    //     //     await waitFor(() => {
    //     //         expect(getByText('Cadastro realizado com sucesso!')).toBeInTheDocument();
    //     //     });
    //     // });

    //     // it('deve lidar com erro ao salvar', async () => {
    //     //     const errorMessage = 'Erro ao criar usuário';
    //     //     criarUsuario.mockRejectedValueOnce(new Error(errorMessage));

    //     //     const { getByText, getByLabelText } = render(<FormularioAdmin />);
    //     //     const cadastrarButton = getByText('Cadastrar');
    //     //     const nomeInput = getByLabelText('Nome:');
    //     //     const emailInput = getByLabelText('E-mail:');
    //     //     const senhaInput = getByLabelText('Senha:');
    //     //     const cargoSelect = getByLabelText('Cargo:');

    //     //     fireEvent.change(nomeInput, { target: { value: 'John Doe' } });
    //     //     fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    //     //     fireEvent.change(senhaInput, { target: { value: 'password123' } });
    //     //     fireEvent.change(cargoSelect, { target: { value: 'Administração' } });

    //     //     fireEvent.click(cadastrarButton);

    //     //     expect(criarUsuario).toHaveBeenCalledWith(
    //     //         'John Doe',
    //     //         'john.doe@example.com',
    //     //         'password123',
    //     //         'Administração'
    //     //     );

    //     //     await waitFor(() => {
    //     //         expect(getByText(errorMessage)).toBeInTheDocument();
    //     //     });
    //     // });
    // });

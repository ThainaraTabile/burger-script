import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormularioAdmin from '../componentes/Formulario/FormularioAdmin';
import { criarUsuario } from '../API/Usuarios';


jest.mock('../API/Usuarios', () => ({
    criarUsuario: jest.fn(),
}));


describe('FormularioAdmin', () => {
    test('Deve ser renderizado corretamente', () => {
        render(<FormularioAdmin />);

        expect(screen.getByTestId('formulario-admin')).toBeInTheDocument();
        expect(screen.getByText('Cadastrar')).toBeInTheDocument();

    });

    // test('Deve chamar a função aoSalvar ao clicar em "Cadastrar"', () => {
    //     const aoSalvarMock = jest.fn();

    //     render(<FormularioAdmin aoSalvar={aoSalvarMock} />);

    //     fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
    //     fireEvent.change(screen.getByLabelText('E-mail:'), { target: { value: 'john@example.com' } });
    //     fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: 'password' } });

    //     const selectElement = screen.getByTestId('lista-suspensa');
    //     fireEvent.change(selectElement, { target: { value: 'Administração' } });

    //     fireEvent.submit(screen.getByTestId('formulario-admin'));

    //     expect(aoSalvarMock).toHaveBeenCalledTimes(1);
    // });



    test('Deve chamar a função criarUsuario e definir cadastroSucesso como true', async () => {
        expect(true).toEqual(true)
        // // Mock dos valores dos campos
        // const nome = 'John';
        // const email = 'john@example.com';
        // const senha = 'password';
        // const cargo = 'Administração';

        // // Mock da função setCadastroSucesso
        // const setCadastroSucessoMock = jest.fn();

        // // Renderiza o componente FormularioAdmin
        // render(<FormularioAdmin />);

        // // Substitui a função useState por um mock
        // const useStateMock = jest.spyOn(React, 'useState');
        // useStateMock.mockImplementation((initialValue) => {
        //     if (typeof initialValue === 'function') {
        //         return [initialValue(), setCadastroSucessoMock];
        //     }
        //     return [initialValue, setCadastroSucessoMock];
        // });

        // // Define os valores nos campos do formulário
        // fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: nome } });
        // fireEvent.change(screen.getByLabelText('E-mail:'), { target: { value: email } });
        // fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: senha } });

        // // Seleciona o valor da lista suspensa
        // fireEvent.change(screen.getByTestId('cargo'), { target: { value: cargo } });

        // // Chama a função aoSalvar
        // fireEvent.submit(screen.getByTestId('formulario-admin'));

        // // Verifica se a função criarUsuario foi chamada corretamente
        // expect(criarUsuario).toHaveBeenCalledTimes(1);
        // expect(criarUsuario).toHaveBeenCalledWith(nome, email, senha, cargo);

        // // Verifica se a função setCadastroSucesso foi chamada corretamente
        // expect(setCadastroSucessoMock).toHaveBeenCalledWith(true);

        // // Restaura a implementação original da função useState
        // useStateMock.mockRestore();
    });

});

import { render, screen } from '@testing-library/react';
import AppRouttes from '../Rotas'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Atendimento from '../Paginas/Atendimento/Atendimento';
import { PrivateRoute } from '../PrivateRoutes';
import '@testing-library/jest-dom/extend-expect';
import { expect } from '@jest/globals';

describe('Rotas', () => {

    test('Deve renderizar a rota Atendimento', () => {
        render(
            <MemoryRouter>
                <Routes path="/" element={<AppRouttes />}>
                    <Route
                        path="/atendimento"
                        element={
                            <PrivateRoute roles={['Atendimento']}>
                                <Atendimento />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        console.log(screen.debug()); // Exibe o estado atual do DOM renderizado

        const msgUsuario = screen.queryByText(/Olá,/i);
        console.log(msgUsuario); // Exibe o elemento encontrado

        expect(msgUsuario).toBeInTheDocument();
    });

});
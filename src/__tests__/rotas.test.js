import { render, screen } from '@testing-library/react';
import AppRoutes from '../Rotas'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Atendimento from '../Paginas/Atendimento/Atendimento';
import { PrivateRoute } from '../PrivateRoutes';
import '@testing-library/jest-dom/extend-expect';
import { expect } from '@jest/globals';

// describe('Rotas', () => {

//     test('Deve renderizar a rota Atendimento', () => {
//         render(
//             <MemoryRouter>
//                 <Routes path="/" element={<AppRouttes />}>
//                     <Route
//                         path="/atendimento"
//                         element={
//                             <PrivateRoute roles={['Atendimento']}>
//                                 <Atendimento />
//                             </PrivateRoute>
//                         }
//                     />
//                 </Routes>
//             </MemoryRouter>
//         );

//         const msgUsuario = screen.queryByText(/Olá,/i);
//         console.log(msgUsuario); // Exibe o elemento encontrado

//         expect(msgUsuario).toBeInTheDocument();
//     });

// });

jest.mock('../API/Usuarios', () => ({
    obterNomeUsuario: () => 'Nome do Usuário Mockado',
}));

describe('Rotas', () => {

    test('Deve renderizar a rota Atendimento', () => {
        const rota = '/atendimento';
        render(
            <MemoryRouter initialEntries={[rota]}>
                <Routes>
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

        const msgUsuario = screen.queryByText(/Olá, Nome do Usuário Mockado/i);
        expect(msgUsuario).toBeInTheDocument();
    });

});


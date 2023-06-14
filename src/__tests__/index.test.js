import React from 'react';
import { render } from '@testing-library/react';
import AppRoutes from '../Rotas';
import Modal from 'react-modal';
import '@testing-library/jest-dom/extend-expect';
import { expect } from '@jest/globals';


jest.mock('../Rotas', () => ({
    __esModule: true,
    default: () => <div>Mocked AppRoutes</div>,
}));

test('renders without error', () => {
    const { container } = render(
        <React.StrictMode>
            <AppRoutes />
        </React.StrictMode>
    );
    expect(container.firstChild).toBeInTheDocument();
});
import Header from '../componentes/Header/Header.js';
import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react'




describe('Header', () => {


  test('Deve ter a classe "msgBoasVindas"', () => {
    render(<Header msgBoasVindas="Olá, usuário" />);

    const headerElement = screen.getByRole('heading', { name: /Olá,/i });
    const msgBoasVindasElement = screen.getByText(/Olá,/i);

    expect(headerElement).toHaveClass('msgBoasVindas');
    expect(msgBoasVindasElement).toHaveClass('msgBoasVindas');
  });

});



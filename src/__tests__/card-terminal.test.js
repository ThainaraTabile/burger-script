import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import CardTerminal from '../componentes/CardTerminal/CardTerminal';

describe('CardTerminal', () => {
  test('renderiza corretamente', () => {
    const { getByText } = render(<CardTerminal>Conteúdo do card</CardTerminal>);
    const cardContent = getByText('Conteúdo do card');
    expect(cardContent).toBeInTheDocument();
  });
});

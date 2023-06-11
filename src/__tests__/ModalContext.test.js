import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalProvider, ModalContext } from '../contextos/ModalContext';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: jest.fn(),
  }));
  
describe('ModalProvider', () => {
  test('abre e fecha o modal corretamente', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    const openModalBtn = screen.getByText('Abrir Modal');
    fireEvent.click(openModalBtn);

    const modalContent = screen.getByText('Conteúdo do Modal');
    expect(modalContent).toBeInTheDocument();

    const closeModalBtn = screen.getByText('Fechar Modal');
    fireEvent.click(closeModalBtn);

    expect(modalContent).not.toBeInTheDocument();
  });
});

const TestComponent = () => {
  const { modalAberto, setModalAberto } = React.useContext(ModalContext);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div>
      <button onClick={abrirModal}>Abrir Modal</button>
      {modalAberto && (
        <div>
          <p>Conteúdo do Modal</p>
          <button onClick={fecharModal}>Fechar Modal</button>
        </div>
      )}
    </div>
  );
};

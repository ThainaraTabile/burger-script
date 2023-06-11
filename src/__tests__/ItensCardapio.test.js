import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProdutosContext } from '../contextos/ProdutosContext';
import ItensCardapio from '../componentes/Cardapio/ItensCardapio';
import userEvent from '@testing-library/user-event';

describe('ItensCardapio', () => {
  it('deve exibir os produtos corretos de uma determinada categoria', () => {
    const produtosMock = {
      categoria1: [
        { id: 1, name: 'Produto 1', type: 'café da manhã', price: 10, image: 'imagem1.jpg' },
        { id: 2, name: 'Produto 2', type: 'café da manhã', price: 15, image: 'imagem2.jpg' },
      ],
      categoria2: [
        { id: 3, name: 'Produto 3', type: 'menu principal', price: 20, image: 'imagem3.jpg' },
        { id: 4, name: 'Produto 4', type: 'menu principal', price: 25, image: 'imagem4.jpg' },
      ],
    };

    render(
      <ProdutosContext.Provider value={{ categorias: produtosMock }}>
        <ItensCardapio tipoProduto="café da manhã" manipularProdutoSelecionado={() => {}} />
      </ProdutosContext.Provider>
    );

    const produtosCafeDaManha = screen.getAllByTestId('produto-item');

    expect(produtosCafeDaManha).toHaveLength(2);
    expect(produtosCafeDaManha[0]).toHaveTextContent('Produto 1');
    expect(produtosCafeDaManha[1]).toHaveTextContent('Produto 2');
  });

  it('deve chamar a função manipularProdutoSelecionado corretamente', () => {
    const produtosMock = {
      categoria1: [
        { id: 1, name: 'Produto 1', type: 'café da manhã', price: 10, image: 'imagem1.jpg' },
      ],
    };

    const manipularProdutoSelecionadoMock = jest.fn();

    render(
      <ProdutosContext.Provider value={{ categorias: produtosMock }}>
        <ItensCardapio
          tipoProduto="café da manhã"
          manipularProdutoSelecionado={manipularProdutoSelecionadoMock}
        />
      </ProdutosContext.Provider>
    );

    const incrementaBtn = screen.getByTestId('btn-incrementa');
    const decrementaBtn = screen.getByTestId('btn-decrementa');

    incrementaBtn.click();
    expect(manipularProdutoSelecionadoMock).toHaveBeenCalledWith({
      id: 1,
      name: 'Produto 1',
      type: 'café da manhã',
      price: 10,
      image: 'imagem1.jpg',
      quantity: 1,
    }, 'incrementar');

    decrementaBtn.click();
    expect(manipularProdutoSelecionadoMock).toHaveBeenCalledWith({
      id: 1,
      name: 'Produto 1',
      type: 'café da manhã',
      price: 10,
      image: 'imagem1.jpg',
      quantity: -1,
    }, 'decrementar');
  });
});

test('deve chamar a função manipularProdutoSelecionado corretamente', () => {
  // Cria uma função mock para substituir a função manipularProdutoSelecionado
  const manipularProdutoSelecionadoMock = jest.fn();

  // Renderiza o componente com a função mock
  render(
    <ItensCardapio
      tipoProduto="café da manhã"
      manipularProdutoSelecionado={manipularProdutoSelecionadoMock}
    />
  );

  // Simula um clique no botão de incremento
  const incrementaBtn = screen.getByText('+');
  userEvent.click(incrementaBtn);

  // Verifica se a função mock foi chamada corretamente
  expect(manipularProdutoSelecionadoMock).toHaveBeenCalledWith(
    expect.objectContaining({ quantity: 1 }), 'incrementar'
  );
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Cardapio from '../componentes/Cardapio/Cardapio';

describe('Cardapio', () => {
  it('deve exibir as seções de Café da Manhã e Menu Principal', () => {
    render(<Cardapio manipularProdutoSelecionado={() => {}} />);

    const cafeDaManhaSection = screen.getByText('Café da Manhã');
    const menuPrincipalSection = screen.getByText('Menu Principal');

    expect(cafeDaManhaSection).toBeInTheDocument();
    expect(menuPrincipalSection).toBeInTheDocument();
  });

  it('deve exibir os itens do Café da Manhã e do Menu Principal', () => {
    render(<Cardapio manipularProdutoSelecionado={() => {}} />);

    const itensCafeDaManha = screen.getAllByTestId('item-cardapio-cafe-da-manha');
    const itensMenuPrincipal = screen.getAllByTestId('item-cardapio-menu-principal');

    expect(itensCafeDaManha).toHaveLength(3); // Substitua o número de itens pelo valor correto
    expect(itensMenuPrincipal).toHaveLength(4); // Substitua o número de itens pelo valor correto
  });

  it('deve chamar a função manipularProdutoSelecionado ao selecionar um item', () => {
    const manipularProdutoSelecionadoMock = jest.fn();
    render(<Cardapio manipularProdutoSelecionado={manipularProdutoSelecionadoMock} />);

    const primeiroItemCafeDaManha = screen.getAllByTestId('item-cardapio-cafe-da-manha')[0];
    const segundoItemMenuPrincipal = screen.getAllByTestId('item-cardapio-menu-principal')[1];

    primeiroItemCafeDaManha.click();
    expect(manipularProdutoSelecionadoMock).toHaveBeenCalledWith(expect.any(Object)); // Substitua pelo argumento correto

    segundoItemMenuPrincipal.click();
    expect(manipularProdutoSelecionadoMock).toHaveBeenCalledWith(expect.any(Object)); // Substitua pelo argumento correto
  });
});

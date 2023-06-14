import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import MenuNavegacao from '../componentes/MenuNavegacao/MenuNavegacao';

describe('MenuNavegacao', () => {
  test('renderiza o link com o texto e a imagem corretos', () => {
    const to = '/rota';
    const texto = 'Link de teste';
    const imagemSrc = 'icone-teste.png';

    render(
      <BrowserRouter>
        <MenuNavegacao to={to} texto={texto} imagemSrc={imagemSrc} />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(texto);
    expect(linkElement).toBeInTheDocument();

    const imagemElement = screen.getByAltText(`icone de ${texto}`);
    expect(imagemElement).toBeInTheDocument();
    expect(imagemElement).toHaveAttribute(
      'src',
      `../imagens/icones/${imagemSrc}`
    );
  });

  test('Deve renderizar um link com a class link', () => {
    render(
      <BrowserRouter>
        <MenuNavegacao />
      </BrowserRouter>
    );

    const linkMenu = screen.getAllByRole('link');
    linkMenu.forEach((link) => {
    expect(link).toHaveClass('link');
    });
    expect(linkMenu).toMatchSnapshot();
  });
});

import MenuHamburger from "../componentes/MenuHamburger/MenuHamburger";
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe(MenuHamburger, () => {

    test('Verifica se o componente é renderizado corretamente', () => {
        render(<MenuHamburger />);
        const componenteMenu = screen.getByTestId('menu-hamburger');
        expect(componenteMenu).toBeInTheDocument();
        expect(componenteMenu).toMatchSnapshot();
    });

    test('Verifica se a imagem, atributos src e alt estão sendo renderizados corretamente', () => {
        const imagemSrc = 'icone-teste.png';
        const imagemAlt = 'Ícone de teste';
      
        render(<MenuHamburger imagemSrc={imagemSrc} imagemAlt={imagemAlt} />);
      
        const imagemElement = screen.getByAltText(imagemAlt);
        expect(imagemElement).toBeInTheDocument();
        expect(imagemElement).toHaveAttribute('src', expect.stringContaining(imagemSrc));
      });

      test('Verificar se o menu está inicialmente fechado', () => {
        render(<MenuHamburger />);
        const menuFechado = screen.getByTestId('menu-hamburger');
        const menuAberto = screen.queryByTestId('menu-conteudo');
        expect(menuFechado).toBeInTheDocument();
        expect(menuAberto).not.toBeInTheDocument();
      });
    
      test('Verificar se o título do tipo de refeição é renderizado corretamente', () => {
        const tipoRefeicao = 'Almoço';
        render(<MenuHamburger tipoRefeicao={tipoRefeicao} />);
        const tituloTipoRefeicao = screen.getByText(tipoRefeicao);
        expect(tituloTipoRefeicao).toBeInTheDocument();
      });


});
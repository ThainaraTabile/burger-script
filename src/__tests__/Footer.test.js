import Footer from "../componentes/Footer/Footer";
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {

    test('Verifica se o componente é renderizado corretamente', () => {
        render(<Footer />);
        const componenteFooter = screen.getByTestId('footer');
        expect(componenteFooter).toBeInTheDocument();
        expect(componenteFooter).toMatchSnapshot();

    });

    test('Verifica se a imagem, atributos src e alt estão sendo renderizados corretamente', () => {
        const imagemSrc = 'icone-teste.webp';
        const imagemAlt = 'Ícone de teste';

        render(<Footer imagemSrc={imagemSrc} imagemAlt={imagemAlt} />);

        const imagemElement = screen.getByAltText(imagemAlt);
        expect(imagemElement).toBeInTheDocument();
        expect(imagemElement).toHaveAttribute('src', expect.stringContaining(imagemSrc));
    });

})
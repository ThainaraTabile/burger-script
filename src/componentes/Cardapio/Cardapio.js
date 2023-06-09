import './Cardapio.css';
import ItensCardapio from './ItensCardapio';
import MenuHamburger from '../MenuHamburger/MenuHamburger';

const Cardapio = ({ manipularProdutoSelecionado }) => {
  return (
    <>
      <MenuHamburger
        imagemSrc="../../imagens/img-refeicoes/cafe-da-manha.webp"
        imagemAlt="Foto café da manhã"
        tipoRefeicao="Café da Manhã"
        conteudo={
          <ItensCardapio
            tipoProduto="café da manhã"
            manipularProdutoSelecionado={manipularProdutoSelecionado}
          />
        }
      />
      <MenuHamburger
        imagemSrc="../../imagens/img-refeicoes/menu-principal.webp"
        imagemAlt="Foto menu principal"
        tipoRefeicao="Menu Principal"
        conteudo={
          <ItensCardapio
            tipoProduto="menu principal"
            manipularProdutoSelecionado={manipularProdutoSelecionado}
          />
        }
      />
    </>
  );
};

export default Cardapio;

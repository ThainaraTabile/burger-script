import FormularioProdutos from '../../../componentes/Formulario/FormularioProdutos';
import { Link } from 'react-router-dom';
import ListaDeProdutos from './ListaDeProdutos';
import MenuNavegacao from '../../../componentes/MenuNavegacao/MenuNavegacao';
import TokenExpiracao from '../../../Autenticacao/Auth';
import { ProdutosProvider } from '../../../contextos/ProdutosContext';

export default function Produtos() {
  return (
    <section className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/administracao" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />
      <MenuNavegacao texto="produtos" imagemSrc="lista-de-produtos.png" />
      <ProdutosProvider>
        <FormularioProdutos />
        <ListaDeProdutos />
      </ProdutosProvider>
    </section>
  );
}

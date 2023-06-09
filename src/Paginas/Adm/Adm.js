import { Link } from 'react-router-dom';
import Header from '../../componentes/Header/Header';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import Footer from '../../componentes/Footer/Footer';
import { obterNomeUsuario } from '../../API/Usuarios';
import TokenExpiracao from '../../Autenticacao/Auth';

export default function Administracao() {
  const nomeUsuario = obterNomeUsuario();
  return (
    <>
      <Header msgBoasVindas={`Olá, ${nomeUsuario}`} />
      <section className="telaAtendimento">
        <nav className="botaoSair">
          <Link to="/" className="botaoSair">
            Sair
          </Link>
        </nav>
        <TokenExpiracao />
        <MenuNavegacao
          to="/colaboradores"
          texto="colaboradores"
          imagemSrc="colaboradores.png"
        />
        <MenuNavegacao
          to="/produtos"
          texto="produtos"
          imagemSrc="lista-de-produtos.png"
        />
      </section>
      <Footer
        imagemSrc="../imagens/img-footer/2.webp"
        imagemAlt="Banner administração"
      />
    </>
  );
}

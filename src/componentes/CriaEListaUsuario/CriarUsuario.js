import FormularioAdmin from '../Formulario/FormularioAdmin';
import { Link } from 'react-router-dom';
import MenuNavegacao from '../MenuNavegacao/MenuNavegacao';
import TokenExpiracao from '../../Autenticacao/Auth';

export default function CriarUsuario() {
  return (
    <div className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/administracao" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />
      <MenuNavegacao
        to="/addcolaborador"
        texto="adicionar colaborador"
        imagemSrc="adicionar-colaborador.png"
      />
      <FormularioAdmin />
    </div>
  );
}

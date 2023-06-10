import { useEffect, useState } from "react";
import './ListaUsuarios.css'
import { Link } from "react-router-dom";
import { listarUsuarios, editarUsuario, deletarUsuario} from "../../API/Usuarios";
import BtnEditarUsuario from "../EditarDeletarUsuario/BtnEditarUsuario";
import BtnDeletarUsuario from "../EditarDeletarUsuario/BtnDeletarUsuario";
import MenuNavegacao from "../MenuNavegacao/MenuNavegacao";
import TokenExpiracao from "../../Autenticacao/Auth";
import Modal from "react-modal";
import Botao from "../Botao/Botao";

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    background: 'var(--azul-escuro)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    maxWidth: '300px',
  },
}; 

export default function ListaDeUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fecharModal = () => {
    setModalAberto(false);
    window.location.reload();
  };

  useEffect(() => {
    const obterUsuarios = async () => {
      try {
        const usuariosData = await listarUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
      }
    };

    obterUsuarios();
  }, []);

  const btnEditandoUsuario = (usuarioId) => {
    setEditandoUsuarioId(usuarioId);
  };

  const salvarUsuario = async (novoUsuario) => {
    try {
      const usuarioAtualizado = { ...novoUsuario };
      delete usuarioAtualizado.editando;
  
      await editarUsuario(usuarioAtualizado.id, usuarioAtualizado);
      setModalAberto(true);
      setModalMessage('Os dados foram alterados com sucesso!');
      setEditandoUsuarioId(null);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };
  

  const onDeleteUsuario = async (id) => {
    try {
      await deletarUsuario(id);
      setModalAberto(true);
      setModalMessage('Usuário deletado com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/administracao" className="botaoSair">
          Voltar
        </Link>
      </nav>
      <TokenExpiracao />
      <MenuNavegacao
                texto='listar colaboradores'
                imagemSrc='lista.png'
            />
      <div className="listaUsuarios">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="cardUsuario">
            {editandoUsuarioId === usuario.id ? (
              <BtnEditarUsuario
                usuario={usuario}
                aoSalvar={salvarUsuario}
                onCancel={() => setEditandoUsuarioId(null)}
              />
            ) : (
              <>
                <p className="dados-usuario">Nome: {usuario.name}</p>
                <p className="dados-usuario">E-mail: {usuario.email}</p>
                <p className="dados-usuario">Cargo: {usuario.role}</p>
                <button
                  className="btn-lista-usuarios"
                  onClick={() => btnEditandoUsuario(usuario.id)}
                >
                  Editar
                </button>
                <BtnDeletarUsuario
                  usuario={usuario}
                  onDelete={() => onDeleteUsuario(usuario.id)}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        style={customStyles}
      >
         <h2 className='msg-modal'>{modalMessage}</h2>
        <Botao onClick={fecharModal}>OK</Botao>
      </Modal>
    </div>
  );
}
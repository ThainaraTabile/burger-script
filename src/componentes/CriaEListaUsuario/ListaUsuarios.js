import { useEffect, useState, useContext } from 'react';
import './ListaUsuarios.css';
import { Link } from 'react-router-dom';
import {
  listarUsuarios,
  editarUsuario,
  deletarUsuario,
} from '../../API/Usuarios';
import BtnEditarUsuario from '../EditarDeletarUsuario/BtnEditarUsuario';
import BtnDeletarUsuario from '../EditarDeletarUsuario/BtnDeletarUsuario';
import MenuNavegacao from '../MenuNavegacao/MenuNavegacao';
import TokenExpiracao from '../../Autenticacao/Auth';
import Botao from '../Botao/Botao';
import { ModalContext } from '../../contextos/ModalContext';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ListaDeUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);

  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  useEffect(() => {
    const obterUsuarios = async () => {
      try {
        const usuariosData = await listarUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
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
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const onDeleteUsuario = async (id) => {
    try {
      await deletarUsuario(id);
      setModalAberto(true);
      setModalMessage('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
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
      <MenuNavegacao texto="listar colaboradores" imagemSrc="lista.png" />

      <div className="lista-de-usuarios">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="card-dos-colaboradores">
            {editandoUsuarioId === usuario.id ? (
              <BtnEditarUsuario
                usuario={usuario}
                aoSalvar={salvarUsuario}
                onCancel={() => setEditandoUsuarioId(null)}
              />
            ) : (
              <>
                <span className="span-icone-usuario">
                  <AccountCircleIcon fontSize="large" />
                </span>

                <p className="nome-do-usuario">{usuario.name}</p>
                <p className="dados-usuario">E-mail: {usuario.email}</p>

                <p className="dados-usuario">Cargo: {usuario.role}</p>
                <div className="acoes-usuarios">
                  <p>ações</p>
                  <button
                    className="btn-lista-usuarios"
                    onClick={() => btnEditandoUsuario(usuario.id)}
                  >
                    <ModeEditTwoToneIcon />
                  </button>
                  <BtnDeletarUsuario
                    usuario={usuario}
                    onDelete={() => onDeleteUsuario(usuario.id)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {modalAberto && (
        <div className="modal">
          <h2 className="msg-modal">{modalMessage}</h2>
          <Botao onClick={fecharModal}>OK</Botao>
        </div>
      )}
    </div>
  );
}

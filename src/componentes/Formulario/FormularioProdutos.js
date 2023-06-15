
import './Formulario.css';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';
import { useState, useContext } from 'react';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import { adicionarProdutos } from '../../API/Produtos';
import { ModalContext } from '../../contextos/ModalContext';

const FormularioProdutos = () => {

  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  const listaRefeicao = [' ', 'café da manhã', 'menu principal'];
  const categoria = [
    ' ',
    'acompanhamentos',
    'bebidas',
    'hambúrgueres',
    'lanches',
  ];

  const [nomeProduto, setNome] = useState('');
  const [precoProduto, setPreco] = useState('');
  const [categoriaProduto, setCategoriaProduto] = useState('');
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [qntProduto, setQntProduto] = useState('');
  const [imgProduto, setImgProduto] = useState('');


  const aoSalvar = async (evento) => {
    evento.preventDefault();

    try {
      await adicionarProdutos(
        nomeProduto,
        precoProduto,
        tipoRefeicao,
        categoriaProduto,
        idProduto,
        qntProduto,
        imgProduto
      );
      setModalAberto(true);
      setModalMessage('Produto adicionado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <div className="campos-forms-admin">
          <CampoTexto
            obrigatorio={true}
            label="Nome do Produto: "
            valor={nomeProduto}
            aoAlterado={(valor) => setNome(valor)}
          />
        </div>
        <CampoTexto
          obrigatorio={true}
          label="Preço: "
          valor={precoProduto}
          aoAlterado={(valor) => setPreco(valor)}
          tipo='number'
        />

        <ListaSuspensa
          obrigatorio={true}
          label="Categoria: "
          valor={categoriaProduto}
          itens={categoria}
          aoAlterado={(valor) => setCategoriaProduto(valor)}
        />
        <div className="campos-forms-admin">
          <CampoTexto
            obrigatorio={true}
            label="Id: "
            valor={idProduto}
            aoAlterado={(valor) => setIdProduto(valor)}
            tipo='number'
          />
        </div>
        <CampoTexto
          obrigatorio={true}
          label="Quantidade: "
          valor={qntProduto}
          aoAlterado={(valor) => setQntProduto(valor)}
          tipo='number'
        />
        <ListaSuspensa
          obrigatorio={true}
          label="Tipo de Refeição: "
          valor={tipoRefeicao}
          itens={listaRefeicao}
          aoAlterado={(valor) => setTipoRefeicao(valor)}
        />
        <div className="campos-forms-admin">
          <CampoTexto
            obrigatorio={true}
            label="URL da imagem: "
            valor={imgProduto}
            aoAlterado={(valor) => setImgProduto(valor)}
          />
        </div>

        <Botao>Cadastrar</Botao>
      </form>
      {modalAberto && (
        <div className="modal">
          <h2 className="msg-modal">{modalMessage}</h2>
          <Botao onClick={fecharModal}>OK</Botao>
        </div>
      )}
    </section >
  );
};
export default FormularioProdutos;


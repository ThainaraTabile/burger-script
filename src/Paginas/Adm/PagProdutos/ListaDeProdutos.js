import React, { useContext } from 'react';
import { deletarProduto } from '../../../API/Produtos';
import './Produto.css';
import BtnDeletarProduto from '../../../componentes/DeletarEditarProduto/BtnDeletarProduto';
import { ProdutosContext } from '../../../contextos/ProdutosContext';
import BtnEditarProduto from '../../../componentes/DeletarEditarProduto/BtnEditarProduto';

const ListaDeProdutos = (props) => {
  const { tipoProduto } = props;
  const { produtos, editarDadosProduto } = useContext(ProdutosContext);

  const aoDeletar = async (id) => {
    try {
      await deletarProduto(id);
    } catch (error) {
      console.error('Erro ao deletar Produto:', error);
    }
  };

  const aoEditar = async (id, novoDado) => {
    try {
      await editarDadosProduto(id, novoDado);
    } catch (error) {
      console.error('Erro ao editar Produto:', error);
    }
  };

  return (
    <div className="tabela-produtos">
      <h1 className="titulo-tabela-produtos">Lista de Produtos</h1>
      <dl className="tabela-produtos-admin">
        <div className="tabela-produtos-cabecalho">
          <dt className="tabela-produtos-id">ID</dt>
          <dt className="tabela-produtos-esquerda">Nome do Produto</dt>
          <dt className="tabela-produtos-direita">Valor</dt>
          <dt className="tabela-produtos-direita">Quantidade</dt>
          <dt>Ações</dt>
        </div>
        {produtos
          .filter((produto) => !tipoProduto || produto.type === tipoProduto)
          .map((produto) => (
            <dd key={produto.id} className="tabela-produtos-itens">
              <span className="tabela-produtos-id">{produto.id}</span>
              <span className="tabela-produtos-esquerda">{produto.name}</span>
              <span className="tabela-produtos-direita">
                R$ {produto.price}
              </span>
              <span>{produto.qty}</span>

              <BtnEditarProduto
                produto={produto}
                onEditar={(novoDado) => aoEditar(produto.id, novoDado)}
              />
              <BtnDeletarProduto
                produto={produto}
                onDelete={() => aoDeletar(produto.id)}
              />
            </dd>
          ))}
      </dl>
    </div>
  );
};

export default ListaDeProdutos;

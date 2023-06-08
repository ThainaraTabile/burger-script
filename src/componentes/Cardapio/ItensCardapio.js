import React, { useContext } from 'react';
import { ProdutosContext } from '../../contextos/ProdutosContext';
import BtnIncrementaDecrementa from '../BtnIncrementaDecrementa/index';

const ItensCardapio = ({ tipoProduto, manipularProdutoSelecionado }) => {
  const { categorias } = useContext(ProdutosContext);
  const incrementarContador = (produto) => {
    manipularProdutoSelecionado(produto, 'incrementar');
  };

  const decrementarContador = (produto) => {
    manipularProdutoSelecionado(produto, 'decrementar');
  };

  const categoriasDisplay = Object.entries(categorias).map(([categoria, produtosDaCategoria]) => {
    // Verificar se a categoria possui produtos filtrados
    const produtosFiltradosPorCategoria = produtosDaCategoria.filter(
      (produto) => produto.type === tipoProduto
    );

    // Verificar se a categoria possui produtos para ser exibida
    if (produtosFiltradosPorCategoria.length === 0) {
      return null; // Não renderizar a categoria vazia
    }

    return (
      <div key={categoria}>
        <div className='produtos-do-cardapio'>
          <h3 className='titulo-categoria'>{categoria}</h3>
        </div>
        <div className='container-dos-produtos'>
          {produtosFiltradosPorCategoria.map((produto) => (
            <ul key={produto.id} className='lista-itens-cardapio'>
              <img className='imagens-do-cardapio' src={produto.image} alt={produto.name} />
              <div className='nome-preco'>
                <li>{produto.name}</li>
                <li className='preco'>R$ {produto.price}</li>
              </div>
              <BtnIncrementaDecrementa
                incrementa={() => 
                  incrementarContador({ ...produto, quantity: (produto.quantity || 0) + 1 })}
                decrementa={() => 
                  decrementarContador({ ...produto, quantity: (produto.quantity > 1) - 1 })}
              />
            </ul>
          ))}
        </div>
      </div>
    );
  });

  return <div className='container-produtos-pedido'>{categoriasDisplay}</div>;
};

export default ItensCardapio;

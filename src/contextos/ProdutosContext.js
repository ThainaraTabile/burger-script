import React, { createContext, useState, useEffect } from 'react';
import { obterProdutos } from '../API/Produtos';

const ProdutosContext = createContext();

const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipoProduto, setTipoProduto] = useState(null);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const produtosData = await obterProdutos();
        const produtosFiltradosPorTipo = produtosData.filter(
          (produto) => !tipoProduto || produto.type === tipoProduto
        );
        setProdutos(produtosFiltradosPorTipo);
        const produtosAgrupadosPorCategoria = agruparPorCategoria(produtosFiltradosPorTipo);
        console.log(produtosAgrupadosPorCategoria)
        setCategorias(produtosAgrupadosPorCategoria);
      } catch (error) {
        console.error(error);
      }
    };

    buscarProdutos();
  }, [tipoProduto]);

  

  const agruparPorCategoria = (produtos) => {
    const categorias = {};

    produtos.forEach((produto) => {
      if (!categorias[produto.category]) {
        categorias[produto.category] = [];
      }

      categorias[produto.category].push(produto);
    });

    return categorias;
  };

  return (
    <ProdutosContext.Provider value={{ produtos, categorias, setTipoProduto }}>
      {children}
    </ProdutosContext.Provider>
  );
};

export { ProdutosContext, ProdutosProvider };

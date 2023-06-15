import './ResumoPedido.css';
import CardTerminal from '../CardTerminal/CardTerminal';
import { useState, useContext } from 'react';
import { adicionarPedido } from '../../API/Pedidos';
import Botao from '../Botao/Botao';
import { obterNomeUsuario } from '../../API/Usuarios';
import { ModalContext } from '../../contextos/ModalContext';


const ResumoPedido = ({ produtosSelecionados }) => {
  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  const [nomeCliente, setNomeCliente] = useState('');
  const [mesa, setMesa] = useState('');
  const [nomeAtendente, setNomeAtendente] = useState(obterNomeUsuario());


  const enviarPedido = async () => {
    if (nomeCliente && mesa && produtosSelecionados.length > 0) {
      try {
        const produtos = produtosSelecionados.map((produto) => ({
          id: produto.id,
          waiter: produto.userId,
          name: produto.name,
          quantity: produto.quantity,
          total: produto.total,
        }));

        const novoPedido = await adicionarPedido(
          nomeCliente,
          mesa,
          produtos,
          nomeAtendente
        );
        console.log('Pedido registrado:', novoPedido);

        setTimeout(() => {
          setNomeCliente('');
          setMesa('');
          setNomeAtendente('');
        });
        setModalAberto(true);
        setModalMessage('Pedido registrado com sucesso!');
      } catch (error) {
        console.error('Erro ao registrar pedido:', error);
      }
    } else {
      setModalAberto(true);
      setModalMessage(
        'Para que o pedido seja registrado, é necessário preencher todos os campos!'
      );
    }
  };

  return (
    <>
      <CardTerminal>
        <h2 className="titulo-login">
          <span className="chaves">{'{'}</span>
          Resumo do Pedido
          <span className="chaves">{'}'}</span>
        </h2>
        <div className="container-label-input">
          <div className="linha-label-input">
            <label htmlFor="mesa">mesa:</label>
            <span className="terminal-cursor" />
            <input
              className="inputResumoPedido"
              id="mesa"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            />
          </div>
          <div className="linha-label-input">
            <label htmlFor="cliente">
              cliente:<span className="terminal-cursor" />
            </label>
            <input
              className="inputResumoPedido"
              id="cliente"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            />
          </div>
        </div>
        <div className="conteudo-tabela-resumo">
          <table className="tabela-resumo">
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {produtosSelecionados.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.quantity}</td>
                  <td>{produto.name}</td>
                  <td>R$ {produto.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="th-total">total</th>
                <th className="th-total" />
                <td className="th-total">
                  R$
                  {produtosSelecionados.reduce((total, produto) => {
                    total += produto.quantity * produto.price;
                    return total;
                  }, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <Botao onClick={enviarPedido}>Enviar</Botao>
      </CardTerminal>
      {modalAberto && (
        <div className="modal">
          <h2 className="msg-modal">{modalMessage}</h2>
          <Botao onClick={fecharModal}>OK</Botao>
        </div>
      )}
    </>
  );
};

export default ResumoPedido;

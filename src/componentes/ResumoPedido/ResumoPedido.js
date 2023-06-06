import './ResumoPedido.css';
import CardTerminal from '../CardTerminal/CardTerminal';
import { useState, useEffect } from 'react';
import { adicionarPedido } from '../../API/Pedidos';
import Botao from '../Botao/Botao';
import obterNomeUsuario from '../../API/Usuarios';
import Modal from 'react-modal';

const ResumoPedido = ({ produtosSelecionados }) => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [mesa, setMesa] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataPedido, setDataPedido] = useState('');


  Modal.setAppElement('#root');

  useEffect(() => {
    if (!modalIsOpen) {
      setNomeCliente('');
      setMesa('');
    }
  }, [modalIsOpen]);

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
          dataPedido,
          obterNomeUsuario()
        );
        console.log('Pedido registrado:', novoPedido);
        setDataPedido(novoPedido.dateEntry)

        setIsOpen(true);
      } catch (error) {
        console.error('Erro ao registrar pedido:', error);
      }
    } else {
      alert('Preencha todos os campos do pedido antes de enviar.');
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setNomeCliente('');
    setMesa('');
    window.location.reload();
  };

  return (
    <>
      <CardTerminal>
        <h2 className="titulo-login">
          <span className="chaves">{"{"}</span>
          Resumo do Pedido
          <span className="chaves">{"}"}</span>
        </h2>
        <div className="container-label-input">
          <div className="linha-label-input">
            <label htmlFor="mesa">mesa:</label>
            <span className="terminal-cursor"></span>
            <input
              className="inputResumoPedido"
              id="mesa"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            />
          </div>
          <div className="linha-label-input">
            <label htmlFor="cliente">
              cliente:<span className="terminal-cursor"></span>
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
                <th className='th-total'></th>
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

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'var(--nude)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
        }}
      >
        <img src='../../imagens/tela.png' 
        className='logo-modal'
        alt='Logo Burger Script'/>
        <h2 className='msg-sucesso-modal'> Pedido enviado com sucesso! </h2>
        <Botao 
        onClick={handleModalClose}>
          OK
          </Botao>
      </Modal>
    </>
  );
};

export default ResumoPedido;

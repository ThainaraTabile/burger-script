// import React from 'react';
// import { Link } from 'react-router-dom';
// import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
// import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
// import Botao from '../../componentes/Botao/Botao';
// import { atualizarStatusPedido } from '../../API/Pedidos';
// import TokenExpiracao from '../../Autenticacao/Auth';
// import { useState } from 'react';
// import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     textAlign: 'center',
//     justifyContent: 'center',
//     border: '1px solid #ccc',
//     background: 'var(--azul-escuro)',
//     overflow: 'auto',
//     WebkitOverflowScrolling: 'touch',
//     borderRadius: '4px',
//     outline: 'none',
//     padding: '20px',
//     maxWidth: '300px',
//   },
// };

// export default function PedidosProntos() {
//   const [modalAberto, setModalAberto] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const fecharModal = () => {
//     setModalAberto(false);
//     window.location.reload();
//   };

//   const enviarPedido = async (pedido) => {
//     try {
//       await atualizarStatusPedido(pedido.id, 'enviado');
//       setModalAberto(true);
//       setModalMessage('Pedido enviado com sucesso!');

//     } catch (error) {
//       console.error('Erro ao enviar pedido:', error);
//     }
//   };

//   return (
//     <section className="telaFazerPedido">
//       <nav className="botaoSair">
//         <Link to="/cozinha" className="botaoSair">
//           Voltar
//         </Link>
//       </nav>
//       <TokenExpiracao />
//       <MenuNavegacao
//        texto="pronto para servir"
//        imagemSrc="pronto-para-servir.png"
//        />
//       <ListaDePedidos
//         status="pronto para entrega"
//         props={'Processamento'}
//         btnStatus={(pedido) => (
//           <Botao onClick={() => enviarPedido(pedido)}>enviar</Botao>
//         )}
//       />
//        <Modal
//         isOpen={modalAberto}
//         onRequestClose={fecharModal}
//         style={customStyles}
//       >
//         <h2 className='msg-modal'>{modalMessage}</h2>
//         <Botao onClick={fecharModal}>OK</Botao>
//       </Modal>
//     </section>
//   );
// }

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListaDePedidos from '../../componentes/ListaDePedidos/ListaDePedidos';
import MenuNavegacao from '../../componentes/MenuNavegacao/MenuNavegacao';
import Botao from '../../componentes/Botao/Botao';
import { atualizarStatusPedido } from '../../API/Pedidos';
import TokenExpiracao from '../../Autenticacao/Auth';
import { ModalContext } from '../../contextos/ModalContext';

export default function PedidosProntos() {
  const {
    modalAberto,
    setModalAberto,
    modalMessage,
    setModalMessage,
    fecharModal,
  } = useContext(ModalContext);

  const enviarPedido = async (pedido) => {
    try {
      await atualizarStatusPedido(pedido.id, 'enviado');
      setModalAberto(true);
      setModalMessage('Pedido enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  };

  return (
    <section className="telaFazerPedido">
      <nav className="botaoSair">
        <Link to="/cozinha" className="botaoSair">
          Voltar
        </Link>
      </nav>

      <TokenExpiracao />

      <MenuNavegacao
        texto="pronto para servir"
        imagemSrc="pronto-para-servir.png"
      />
      <ListaDePedidos
        status="pronto para entrega"
        props={'Processamento'}
        btnStatus={(pedido) => (
          <Botao onClick={() => enviarPedido(pedido)}>enviar</Botao>
        )}
      />
      {modalAberto && (
        <div className="modal">
          <h2 className="msg-modal">{modalMessage}</h2>
          <Botao onClick={fecharModal}>OK</Botao>
        </div>
      )}
    </section>
  );
}

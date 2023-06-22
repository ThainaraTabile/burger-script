import React, { useState } from 'react';

const MenuHamburger = ({ conteudo, tipoRefeicao, imagemSrc, imagemAlt }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="menu-hamburger" data-testid="menu-hamburger">
      <div className="container-menu-fechado">
        <img src={imagemSrc} className="img-tipo-refeicao" alt={imagemAlt} />
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={`hamburger-icon ${menuAberto ? 'aberto' : ''}`}
          onClick={alternarMenu}
          onKeyDown={alternarMenu}
        >

          <h2 className="titulo-tipo-refeicao">{tipoRefeicao}</h2>
        </div>
      </div>
      <div className="manu-aberto">
        {menuAberto && <div className="menu-conteudo">{conteudo}</div>}
      </div>
    </div>
  );
};

export default MenuHamburger;

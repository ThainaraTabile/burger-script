import React from 'react';
import './CardTerminal.css';

const CardTerminal = ({ children }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="ferramentas">
          <div className="circulos">
            <span className="c" />
            <span className="c" />
            <span className="c" />
          </div>
        </div>
        <div className="card__content">{children}</div>
      </div>
    </div>
  );
};

export default CardTerminal;

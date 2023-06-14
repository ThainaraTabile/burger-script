import './Header.css';

const Header = ({ msgBoasVindas }) => {
  return (
    <section className="card-header">
      <div className="circulos-btn">
        <div className="btn-ferramentas" />
        <div className="btn-ferramentas" />
        <div className="btn-ferramentas" />
      </div>
      <div className="browser">
        <h2 className="msgBoasVindas">
          {msgBoasVindas}
          <span className="terminal-cursor" />
        </h2>
      </div>
    </section>
  );
};

export default Header;

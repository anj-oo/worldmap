const Header = ({ score, resulttext }) => {
  return (
    <header className="top-section">
      <div className="left-aligned">WORLD MAP GAME</div>
      <div className="center-aligned">Score: {score}</div>
      <div className="right-aligned">{resulttext}</div>
    </header>
  );
};

export default Header;

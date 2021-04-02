const Main: React.FC<{}> = ({ children }) => {
  return (
    <div className="main">
      <img
        className="down"
        src="../media/images/slot-high-back-spielfeld.png"
        alt=""
      />
      {children}
    </div>
  );
};

export default Main;

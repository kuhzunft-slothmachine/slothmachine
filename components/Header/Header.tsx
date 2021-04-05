import classes from './Header.module.scss';

const Header = () => {
  return (
    <>
      <div className={classes.block}>
        <h1>KUHZUNFT</h1>
        <h5>"Sometimes if you lose, you win! (Sun Ra)"</h5>
      </div>
      <div className={classes.title}>
        <h2>SLOTMACHINE</h2>
      </div>
    </>
  );
};

export default Header;

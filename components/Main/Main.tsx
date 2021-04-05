import classes from './Main.module.scss';

const Main: React.FC<{}> = ({ children }) => {
  return (
    <div className={classes.block}>
      {children}
    </div>
  );
};

export default Main;

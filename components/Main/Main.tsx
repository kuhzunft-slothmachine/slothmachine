import ErrorBoundary from "../ErrorBoundary";

import classes from "./Main.module.scss";

const Main: React.FC<{}> = ({ children }) => {
  return (
    <div className={classes.block}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};

export default Main;

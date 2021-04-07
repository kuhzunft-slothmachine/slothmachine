import classes from "./StartButton.module.scss";

interface StartButtonProps {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({
  running,
  onStart,
  onStop,
}) => {
  return (
    <button
      className={classes.block}
      onClick={() => {
        if (running) {
          onStop();
        } else {
          onStart();
        }
      }}
    >
      {running ? "STOP" : "START"}
    </button>
  );
};

export default StartButton;

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
      className="home_start-button"
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

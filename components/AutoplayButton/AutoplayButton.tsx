import classes from "./AutoplayButton.module.scss";

interface AutoplayButtonProps {
  state: boolean;
  onToggle: (state: boolean) => void;
}

const AutoplayButton: React.FC<AutoplayButtonProps> = ({ state, onToggle }) => {
  return (
    <div className={classes.block}>
      <div className={classes.label}>AUTO PLAY</div>
      <button
        onClick={() => {
          onToggle(!state);
        }}
      >
        <img
          src={`/media/images/slotmachine-random${state ? "on" : "off"}.png`}
        />
      </button>
    </div>
  );
};

export default AutoplayButton;

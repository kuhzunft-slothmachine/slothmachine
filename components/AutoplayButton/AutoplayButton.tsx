import classes from "./AutoplayButton.module.scss";

interface AutoplayButtonProps {
  state: boolean;
  onToggle: () => void;
}

const AutoplayButton: React.FC<AutoplayButtonProps> = ({ state, onToggle }) => {
  console.log('autostate', state);
  return (
    <div className={classes.block}>
      <div className={classes.label}>AUTO PLAY</div>
      <button onClick={onToggle}>
        <img
          src={`/media/images/slotmachine-random${state ? "on" : "off"}.png`}
        />
      </button>
    </div>
  );
};

export default AutoplayButton;

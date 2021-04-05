import classNames from "classnames";
import classes from "./MuteButton.module.scss";

interface MuteButtonProps {
  onClick?: () => void;
  muted?: boolean;
}
const MuteButton = ({ muted }: MuteButtonProps) => {
  return (
    <button className={classes.block}>
      <img
        className={classNames({ [classes.muted]: muted })}
        src="/media/images/mute.png"
        alt="Mute track"
      />
    </button>
  );
};

export default MuteButton;

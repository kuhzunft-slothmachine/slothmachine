import classNames from "classnames";
import classes from "./MuteButton.module.scss";

interface MuteButtonProps {
  onClick?: () => void;
  muted?: boolean;
  isAutoplaying: boolean;
}
const MuteButton = ({ muted, onClick, isAutoplaying }: MuteButtonProps) => {
  return (
    <button
      className={classNames(classes.block, {
        [classes.isAutoplaying]: isAutoplaying,
      })}
      onClick={onClick}
    >
      <img
        className={classNames({ [classes.muted]: muted })}
        src="/media/images/mute.png"
        alt="Mute track"
      />
    </button>
  );
};

export default MuteButton;

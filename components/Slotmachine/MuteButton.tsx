import { useSelector } from "react-redux";

import classNames from "classnames";
import classes from "./MuteButton.module.scss";

import { State } from "../../store/types";

interface MuteButtonProps {
  onClick?: () => void;
  muted?: boolean;
}
const MuteButton = ({ muted, onClick }: MuteButtonProps) => {
  const isAutoplaying = useSelector<State>((state) => state.isAutoplaying);

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

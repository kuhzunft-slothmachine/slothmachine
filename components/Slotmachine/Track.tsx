import { useDispatch } from "react-redux";
import { ActionType } from "../../store/types";

import MuteButton from "./MuteButton";

import classes from "./Track.module.scss";

interface TrackProps {
  title: string;
  slot: number;

  muted?: boolean;
}
const Track = ({ title, muted, slot }: TrackProps) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.block}>
      <div className={classes.title}>{title}</div>
      <MuteButton
        muted={muted}
        onClick={() => {
          if (muted) {
            dispatch({
              type: ActionType.Resume,
              trackSlot: slot,
            });
          } else {
            dispatch({
              type: ActionType.Pause,
              trackSlot: slot,
            });
          }
        }}
      />
    </div>
  );
};

export default Track;

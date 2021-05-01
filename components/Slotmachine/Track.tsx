import { useDispatch } from "react-redux";

import { toggleMute } from "../../store/actions";

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
          dispatch(toggleMute({ slot }));
        }}
      />
    </div>
  );
};

export default Track;

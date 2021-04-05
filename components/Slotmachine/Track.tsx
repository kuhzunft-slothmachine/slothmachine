import MuteButton from './MuteButton';

import classes from "./Track.module.scss";

interface TrackProps {
  onClick?: () => void;
  muted?: boolean;
}
const Track = ({ muted }: TrackProps) => {
  return (
    <div className={classes.block}>
      <div className={classes.title} id="track-0">
        forward
      </div>
      <MuteButton muted={muted} />
    </div>
  );
};

export default Track;

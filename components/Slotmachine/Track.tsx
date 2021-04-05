import MuteButton from "./MuteButton";

import classes from "./Track.module.scss";

interface TrackProps {
  title: string;

  onClick?: () => void;
  muted?: boolean;
}
const Track = ({ title, muted }: TrackProps) => {
  return (
    <div className={classes.block}>
      <div className={classes.title} id="track-0">
        {title}
      </div>
      <MuteButton muted={muted} />
    </div>
  );
};

export default Track;

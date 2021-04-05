import MuteButton from "./MuteButton";

import classes from "./Track.module.scss";

interface TrackProps {
  title: string;

  isAutoplaying: boolean;

  onClick?: () => void;
  muted?: boolean;
}
const Track = ({ title, muted, onClick, isAutoplaying }: TrackProps) => {
  return (
    <div className={classes.block}>
      <div className={classes.title} id="track-0">
        {title}
      </div>
      <MuteButton
        muted={muted}
        isAutoplaying={isAutoplaying}
        onClick={onClick}
      />
    </div>
  );
};

export default Track;

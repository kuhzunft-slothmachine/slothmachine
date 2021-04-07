import MuteButton from "./MuteButton";

import classes from "./Track.module.scss";

interface TrackProps {
  title: string;

  isAutoplaying: boolean;

  onMute?: () => void;
  onUnmute?: () => void;
  muted?: boolean;
}
const Track = ({
  title,
  muted,
  onMute,
  onUnmute,
  isAutoplaying,
}: TrackProps) => {
  return (
    <div className={classes.block}>
      <div className={classes.title} id="track-0">
        {title}
      </div>
      <MuteButton
        muted={muted}
        isAutoplaying={isAutoplaying}
        onClick={() => {
          if (muted) {
            onUnmute();
          } else {
            onMute();
          }
        }}
      />
    </div>
  );
};

export default Track;

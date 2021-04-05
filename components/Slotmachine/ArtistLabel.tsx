import classes from "./ArtistLabel.module.scss";

interface ArtistLabelProps {
  artist: string;
  instruments: string;

  nextTrack: () => void;
  prevTrack: () => void;
}

const ArtistLabel = ({
  artist,
  instruments,
  prevTrack,
  nextTrack,
}: ArtistLabelProps) => {
  const label = `${artist} - ${instruments}`;

  return (
    <div className={classes.block}>
      <div className={classes.up}>
        <button onClick={prevTrack}>
          <img src="/media/images/arrowup.png" alt="Artist up" />
        </button>
      </div>
      <div className={classes.label}>
        <h4>{label}</h4>
      </div>
      <div className={classes.down}>
        <button onClick={nextTrack}>
          <img src="/media/images/arrowdown.png" alt="Artist down" />
        </button>
      </div>
      <img
        src="/media/images/inst_choice-frame_left.png"
        alt="Artist label background"
      />
    </div>
  );
};

export default ArtistLabel;

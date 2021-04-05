import classes from "./ArtistLabel.module.scss";

interface ArtistLabelProps {
  artist: string;
  instruments: string;
}

const ArtistLabel = ({ artist, instruments }: ArtistLabelProps) => {
  const label = `${artist} - ${instruments}`;

  return (
    <div className={classes.block}>
      <div className={classes.up}>
        <img src="/media/images/arrowup.png" alt="Artist up" />
      </div>
      <div className={classes.label}>
        <h4>{label}</h4>
      </div>
      <div className={classes.down}>
        <img src="/media/images/arrowdown.png" alt="Artist down" />
      </div>
      <img
        src="/media/images/inst_choice-frame_left.png"
        alt="Artist label background"
      />
    </div>
  );
};

export default ArtistLabel;

import ArtistLabel from "./ArtistLabel";
import Track from "./Track";

import classes from "./Slotmachine.module.scss";

const Slotmachine = () => {
  return (
    <div className={classes.block}>
      <div className={classes.slots}>
        <div className={classes.photos}>
          <div className={classes.photo} />
          <div className={classes.photo} />
          <div className={classes.photo} />
        </div>
        <div className={classes.frame}>
          <img src="/media/images/photo-frame.png" alt="Slotmachine Frame" />
        </div>
      </div>

      <div className={classes.tracks}>
        <Track />
        <Track />
        <Track />
      </div>

      <div className={classes.artists}>
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
        <ArtistLabel artist="achim zepi" instruments="drumcomputer" />
      </div>
    </div>
  );
};

export default Slotmachine;

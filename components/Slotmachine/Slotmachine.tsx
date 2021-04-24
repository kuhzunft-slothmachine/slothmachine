import React from "react";

import ArtistLabel from "./ArtistLabel";
import TrackComponent from "./Track";
import Slot from "./Slot";

import useCurrentSlots from "../../hooks/useCurrentSlots";

import classes from "./Slotmachine.module.scss";

const Slotmachine = () => {
  const currentSlots = useCurrentSlots();

  return (
    <div className={classes.block}>
      <div className={classes.slots}>
        <div className={classes.photos}>
          <Slot slotIdx={0} />
          <Slot slotIdx={1} />
          <Slot slotIdx={2} />
        </div>
        <div className={classes.frame}>
          <img src="/media/images/photo-frame.png" alt="Slotmachine Frame" />
        </div>
      </div>

      <div className={classes.tracks}>
        {currentSlots.map(({ track, isPaused }, idx) => {
          return (
            <TrackComponent
              key={idx}
              slot={idx}
              title={track.title}
              muted={isPaused}
            />
          );
        })}
      </div>

      <div className={classes.artists}>
        {currentSlots.map(({ artist }, idx) => {
          return (
            <ArtistLabel
              key={idx}
              slot={idx}
              artist={artist.name}
              instruments={artist.instrument}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slotmachine;

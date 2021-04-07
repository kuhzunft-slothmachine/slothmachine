import React from "react";
import { useSelector } from "react-redux";

import ArtistLabel from "./ArtistLabel";
import TrackComponent from "./Track";

import { Artist, State, Track } from "../../store/types";

import classes from "./Slotmachine.module.scss";

interface EnhancedSlots {
  track: Track;
  artist: Artist;
  isPaused: boolean;
}

const Slotmachine = () => {
  const currentSlots = useSelector<State, EnhancedSlots[]>((state) => {
    const result = state.currentSlots.map((slot) => {
      const track = state.tracksById[slot.track_id];
      const artist = state.artistsById[track.artist_id];

      return {
        ...slot,
        track: state.tracksById[slot.track_id],
        artist,
      };
    });

    return result;
  });

  return (
    <div className={classes.block}>
      <div className={classes.slots}>
        <div className={classes.photos}>
          {currentSlots.map(({ track, artist }, idx) => {
            return (
              <div key={idx} className={classes.photo}>
                <img
                  src={`/media/${track.photo}`}
                  alt={`Picture of the ${artist.name}`}
                />
              </div>
            );
          })}
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

import ArtistLabel from "./ArtistLabel";
import TrackComponent from "./Track";

import classes from "./Slotmachine.module.scss";

import { CurrentSlots } from "../../hooks/useArtists";

interface SlotmachineProps {
  currentSlots: CurrentSlots;
  isAutoplaying: boolean;
}

const Slotmachine = ({ currentSlots, isAutoplaying }: SlotmachineProps) => {
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
        {currentSlots.map(({ track, muted, toggleMutedState }, idx) => {
          return (
            <TrackComponent
              key={idx}
              title={track.title}
              muted={muted}
              onClick={toggleMutedState}
              isAutoplaying={isAutoplaying}
            />
          );
        })}
      </div>

      <div className={classes.artists}>
        {currentSlots.map(({ artist, nextTrack, prevTrack }, idx) => {
          return (
            <ArtistLabel
              key={idx}
              artist={artist.name}
              instruments={artist.instrument}
              nextTrack={nextTrack}
              prevTrack={prevTrack}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slotmachine;

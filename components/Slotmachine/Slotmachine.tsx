import React from "react";

import ArtistLabel from "./ArtistLabel";
import TrackComponent from "./Track";

import classes from "./Slotmachine.module.scss";

import { Action, ActionType, CurrentSlots } from "../../hooks/useArtists";

interface SlotmachineProps {
  currentSlots: CurrentSlots;
  isAutoplaying: boolean;

  dispatch: React.Dispatch<Action>;
}

const Slotmachine = ({
  currentSlots,
  isAutoplaying,
  dispatch,
}: SlotmachineProps) => {
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
              title={track.title}
              muted={isPaused}
              onMute={() =>
                dispatch({
                  type: ActionType.Pause,
                  trackSlot: idx,
                })
              }
              onUnmute={() =>
                dispatch({
                  type: ActionType.Resume,
                  trackSlot: idx,
                })
              }
              isAutoplaying={isAutoplaying}
            />
          );
        })}
      </div>

      <div className={classes.artists}>
        {currentSlots.map(({ artist }, idx) => {
          const shuffle = () => {
            dispatch({
              type: ActionType.Shuffle,
              trackSlot: idx,
            });
            dispatch({
              type: ActionType.Play,
              trackSlot: idx,
            });
          };

          return (
            <ArtistLabel
              key={idx}
              artist={artist.name}
              instruments={artist.instrument}
              nextTrack={shuffle}
              prevTrack={shuffle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slotmachine;

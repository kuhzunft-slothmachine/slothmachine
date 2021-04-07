import { Middleware } from "redux";
import { Howl } from "howler";

import { Action, ActionType, State, TrackState } from "./types";

let howls = [];

const soundMiddleware: Middleware<{}, State> = (store) => (next) => (
  action: Action
) => {
  next(action);

  const state = store.getState();

  switch (action.type) {
    case ActionType.Shuffle: {
      if (!state.isPlaying) {
        break;
      }

      const { trackSlot } = action;
      const currentHowl = howls[trackSlot];

      if (currentHowl) {
        currentHowl.stop();
      }

      break;
    }

    case ActionType.Play: {
      const playSlot = (slot: TrackState, index: number) => {
        const track = state.tracksById[slot.track_id];

        const howl = new Howl({
          src: [`/media/${track.audio}`],
          loop: true,
        });

        howls[index] = howl;

        howl.play();
        if (state.currentSlots[index].isPaused) {
          howl.pause();
        }
      };

      if (action.trackSlot != null) {
        playSlot(state.currentSlots[action.trackSlot], action.trackSlot);
      } else {
        state.currentSlots.forEach(playSlot);
      }

      break;
    }
    case ActionType.Stop: {
      howls.forEach((howl) => {
        howl.stop();
      });
      howls = [];

      break;
    }
    case ActionType.Pause: {
      if (!state.isPlaying) {
        break;
      }

      const { trackSlot } = action;
      const howl = howls[trackSlot];
      if (howl) {
        howl.pause();
      }

      break;
    }
    case ActionType.Resume: {
      if (!state.isPlaying) {
        break;
      }

      const { trackSlot } = action;
      const howl = howls[trackSlot];
      if (howl) {
        howl.play();
      }

      break;
    }
  }
};

export default soundMiddleware;

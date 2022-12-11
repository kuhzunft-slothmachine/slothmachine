import { Middleware } from "redux";
import { Howl } from "howler";

import { getCurrentVersion } from "../utils/version";

import { State, TrackState } from "./types";
import { Action, ActionType, play, shuffle, stop } from "./actions";

const createSoundMiddleware = (howls: Howl[]) => {
  const soundMiddleware: Middleware<{}, State> = (store) => (next) => (
    action: Action
  ) => {
    next(action);

    const state = store.getState();

    switch (action.type) {
      case ActionType.Shuffle: {
        const { slot } = action;
        const currentHowl = howls[slot];

        if (currentHowl) {
          currentHowl.stop();
        }

        if (state.isPlaying) {
          store.dispatch(play({ slot }));
        }

        break;
      }

      case ActionType.TogglePlay: {
        if (state.isPlaying) {
          store.dispatch(stop());
        } else {
          store.dispatch(play());
        }

        break;
      }

      case ActionType.ToggleMute: {
        const { slot } = action;
        const currentHowl = howls[slot];
        const track = state.currentSlots[slot];

        console.log("next mute state", track.muted, currentHowl);
        if (currentHowl) {
          currentHowl.mute(track.muted);
        }

        break;
      }

      case ActionType.Play: {
        const playSlot = (slot: TrackState, slotIdx: number) => {
          const currentVersion = getCurrentVersion();
          const track = state.tracks[slot.trackIdx];

          const howl = new Howl({
            src: [`/media/${track.version ?? currentVersion}/audio/${track.audio}`],
            loop: false,
            onload: () => {
              console.log(`Howl ${slotIdx} loaded`);
            },
            onloaderror: () => {
              console.log(`Howl ${slotIdx} could not be loaded`);

              if (howls[slotIdx] === howl) {
                delete howls[slotIdx];
              }

              store.dispatch(shuffle({ slot: slotIdx }));
              if (store.getState().isPlaying) {
                store.dispatch(play({ slot: slotIdx }));
              }
            },
            onplay: () => {
              console.log(`Howl ${slotIdx} started`);
            },
            onpause: () => {
              console.log(`Howl ${slotIdx} paused`);
            },
            onmute: () => {
              console.log(`Howl ${slotIdx} (un)muted`);
            },
            onstop: () => {
              console.log(`Howl ${slotIdx} stopped`);

              if (howls[slotIdx] === howl) {
                delete howls[slotIdx];
              }
            },
            onend: () => {
              console.log(`Howl ${slotIdx} ended`);

              if (howls[slotIdx] === howl) {
                delete howls[slotIdx];
              }

              store.dispatch(shuffle({ slot: slotIdx }));
              if (store.getState().isPlaying) {
                store.dispatch(play({ slot: slotIdx }));
              }
            },
          });

          if (howls[slotIdx] && howls[slotIdx] !== howl) {
            howls[slotIdx].stop();
          }
          howls[slotIdx] = howl;

          howl.play();
          console.log(
            `play ${slotIdx} (muted=${state.currentSlots[slotIdx].muted})`
          );
          howl.mute(state.currentSlots[slotIdx].muted);
        };

        if (action.slot != null) {
          playSlot(state.currentSlots[action.slot], action.slot);
        } else {
          state.currentSlots.forEach(playSlot);
        }

        break;
      }

      case ActionType.Stop: {
        howls.forEach((howl, index) => {
          if (howl) {
            howl.stop();
            delete howls[index];
          }
        });

        break;
      }
    }
  };

  return soundMiddleware;
};

export default createSoundMiddleware;

import produce from "immer";

import { State, Action, ActionType } from "./types";

const reducer = produce((draft: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleAutoplay: {
      draft.isAutoplaying = !draft.isAutoplaying;
      break;
    }
    case ActionType.Pause: {
      const track = draft.currentSlots[action.trackSlot];
      track.isPaused = true;
      break;
    }

    case ActionType.Resume: {
      const track = draft.currentSlots[action.trackSlot];
      track.isPaused = false;
      break;
    }

    case ActionType.Play: {
      draft.isPlaying = true;
      break;
    }

    case ActionType.Stop: {
      draft.isPlaying = false;
      break;
    }

    case ActionType.Shuffle: {
      const tracksIds = Object.keys(draft.tracksById);
      const randomIndex = Math.floor(Math.random() * tracksIds.length);
      const trackId = tracksIds[randomIndex];

      draft.currentSlots[action.trackSlot] = {
        ...draft.currentSlots[action.trackSlot],
        track_id: trackId,
      };
      break;
    }
    default: {
      return draft;
    }
  }
});

export default reducer;

import produce from "immer";

import { State, Action, ActionType } from "./types";

const reducer = produce((draft: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Selection: {
      if (draft.selectedSlotIdx != null) {
        if (action.direction === "left") {
          if (draft.selectedSlotIdx === 0) {
            draft.selectedSlotIdx = draft.currentSlots.length - 1;
          } else {
            draft.selectedSlotIdx = draft.selectedSlotIdx - 1;
          }
        }
        if (action.direction === "right") {
          if (draft.selectedSlotIdx === draft.currentSlots.length - 1) {
            draft.selectedSlotIdx = 0;
          } else {
            draft.selectedSlotIdx = draft.selectedSlotIdx + 1;
          }
        }
        if (action.direction === "clear") {
          draft.selectedSlotIdx = undefined;
        }
      } else {
        draft.selectedSlotIdx = 0;
      }
      break;
    }

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
      if (action.trackSlot != null) {
        const trackIdx = Math.floor(Math.random() * draft.tracks.length);
        draft.currentSlots[action.trackSlot].trackIdx = trackIdx;
      } else {
        [0, 1, 2].forEach((trackSlot) => {
          const trackIdx = Math.floor(Math.random() * draft.tracks.length);
          draft.currentSlots[trackSlot].trackIdx = trackIdx;
        });
      }

      break;
    }
    default: {
      return draft;
    }
  }
});

export default reducer;

import produce from "immer";

import { State } from "./types";
import { Action, ActionType } from "./actions";

const reducer = produce((draft: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Selection: {
      if (draft.isAutoplaying) {
        break;
      }

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

    case ActionType.ToggleMute: {
      if (draft.isAutoplaying) {
        break;
      }

      const track = draft.currentSlots[action.slot];
      track.muted = action.muted != null ? action.muted : !track.muted;
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
      if (action.slot != null) {
        const trackIdx = Math.floor(Math.random() * draft.tracks.length);
        draft.currentSlots[action.slot].trackIdx = trackIdx;
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

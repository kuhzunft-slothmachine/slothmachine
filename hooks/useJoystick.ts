import { useStore, useDispatch } from "react-redux";
import { ActionType } from "../store/types";

import useKeyboardShortcut from "./useKeyboardShortcut";
import useGamepad from "./useGamepad";

const useJoystick = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const clearSelectionMode = () => {
    dispatch({ type: ActionType.Selection, direction: "clear" });
  };
  const selectLeft = () => {
    dispatch({ type: ActionType.Selection, direction: "left" });
  };
  const selectRight = () => {
    dispatch({ type: ActionType.Selection, direction: "right" });
  };

  const toggleMute = () => {
    const state = store.getState();
    const { selectedSlotIdx } = state;

    if (selectedSlotIdx != null) {
      const { isPaused } = state.currentSlots[selectedSlotIdx];
      if (isPaused) {
        dispatch({
          type: ActionType.Resume,
          trackSlot: selectedSlotIdx,
        });
      } else {
        dispatch({
          type: ActionType.Pause,
          trackSlot: selectedSlotIdx,
        });
      }
    }
  };

  const toggleAutoplay = () => {
    dispatch({
      type: ActionType.ToggleAutoplay,
    });
  };

  const shuffle = () => {
    const state = store.getState();
    const { selectedSlotIdx } = state;
    if (selectedSlotIdx != null) {
      dispatch({
        type: ActionType.Shuffle,
        trackSlot: selectedSlotIdx,
      });
    }
  };

  const togglePlay = () => {
    const state = store.getState();
    const { isPlaying } = state;
    if (isPlaying) {
      dispatch({
        type: ActionType.Stop,
      });
    } else {
      dispatch({
        type: ActionType.Play,
      });
    }
  };

  useGamepad({
    onButtonPressed: (index) => {
      switch (index) {
        case 0: {
          togglePlay();
          break;
        }
        case 1: {
          toggleAutoplay();
          break;
        }
        case 2: {
          toggleMute();
          break;
        }
      }
    },
    onAxisPressed: (direction) => {
      switch (direction) {
        case "up": {
          shuffle();
          break;
        }
        case "down": {
          shuffle();
          break;
        }
        case "left": {
          selectLeft();
          break;
        }
        case "right": {
          selectRight();
          break;
        }
      }
    },
  });

  useKeyboardShortcut(["esc"], clearSelectionMode);
  useKeyboardShortcut(["left"], selectLeft);
  useKeyboardShortcut(["right"], selectRight);

  useKeyboardShortcut(["up", "down"], shuffle);

  useKeyboardShortcut(["m", "M"], toggleMute);
  useKeyboardShortcut(["a", "A"], toggleAutoplay);

  useKeyboardShortcut(["space"], togglePlay);
};

export default useJoystick;

import { useStore, useDispatch } from "react-redux";

import {
  select,
  shuffle,
  toggleAutoplay,
  toggleMute,
  togglePlay,
} from "../store/actions";

import useKeyboardShortcut from "./useKeyboardShortcut";
import useGamepad from "./useGamepad";

const useJoystick = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const clearSelectionMode = () => {
    dispatch(select({ direction: "clear" }));
  };
  const selectLeft = () => {
    dispatch(select({ direction: "left" }));
  };
  const selectRight = () => {
    dispatch(select({ direction: "right" }));
  };

  const handleToggleMute = () => {
    const state = store.getState();
    const { selectedSlotIdx } = state;

    if (selectedSlotIdx != null) {
      dispatch(toggleMute({ slot: selectedSlotIdx }));
    }
  };

  const handleToggleAutoplay = () => {
    dispatch(toggleAutoplay());

  };

  const handleShuffle = () => {
    const state = store.getState();
    const { selectedSlotIdx } = state;
    if (selectedSlotIdx != null) {
      dispatch(shuffle({ slot: selectedSlotIdx }));
    }
  };

  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };

  useGamepad({
    onButtonPressed: (index) => {
      switch (index) {
        case 0: {
          handleTogglePlay();
          break;
        }
        case 1: {
          handleToggleAutoplay();
          break;
        }
        case 2: {
          handleToggleMute();
          break;
        }
      }
    },
    onAxisPressed: (direction) => {
      switch (direction) {
        case "up": {
          handleShuffle();
          break;
        }
        case "down": {
          handleShuffle();
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

  useKeyboardShortcut(["up", "down"], handleShuffle);

  useKeyboardShortcut(["m", "M"], handleToggleMute);
  useKeyboardShortcut(["a", "A"], handleToggleAutoplay);

  useKeyboardShortcut(["space"], handleTogglePlay);
};

export default useJoystick;

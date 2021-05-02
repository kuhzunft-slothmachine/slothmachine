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

const useJoystick = (options: {
  showAbout: () => boolean;
  toggleAbout: () => void;
  scrollAboutUp: () => void;
  scrollAboutDown: () => void;
}) => {
  const dispatch = useDispatch();
  const store = useStore();

  const clearSelectionMode = () => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "clear" }));
    }
  };
  const selectLeft = () => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "left" }));
    }
  };
  const selectRight = () => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "right" }));
    }
  };

  const onShuffle = () => {
    const state = store.getState();
    const { selectedSlotIdx } = state;
    if (selectedSlotIdx != null) {
      dispatch(shuffle({ slot: selectedSlotIdx }));
    }
  };

  const handleUp = () => {
    if (options && options.showAbout()) {
      options.scrollAboutUp();
    } else {
      onShuffle();
    }
  };

  const handleDown = () => {
    if (options && options.showAbout()) {
      options.scrollAboutDown();
    } else {
      onShuffle();
    }
  };

  const handleToggleMute = () => {
    if (options && options.showAbout()) {
    } else {
      const state = store.getState();
      const { selectedSlotIdx } = state;

      if (selectedSlotIdx != null) {
        dispatch(toggleMute({ slot: selectedSlotIdx }));
      }
    }
  };

  const handleToggleAutoplay = () => {
    dispatch(toggleAutoplay());
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
        case 3: {
          if (options && options.toggleAbout) {
            options.toggleAbout();
          }
          break;
        }
      }
    },
    onAxisPressed: (direction) => {
      switch (direction) {
        case "up": {
          handleUp();
          break;
        }
        case "down": {
          handleDown();
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

  useKeyboardShortcut(["up"], handleUp);
  useKeyboardShortcut(["down"], handleDown);

  useKeyboardShortcut(["m", "M"], handleToggleMute);
  useKeyboardShortcut(["a", "A"], handleToggleAutoplay);

  useKeyboardShortcut(["space"], handleTogglePlay);
};

export default useJoystick;

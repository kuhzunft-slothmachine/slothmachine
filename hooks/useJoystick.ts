import { useStore, useDispatch } from "react-redux";
import throttle from "lodash.throttle";

import {
  select,
  shuffle,
  toggleAutoplay,
  toggleMute,
  togglePlay,
} from "../store/actions";

import useKeyboardShortcut from "./useKeyboardShortcut";
import useGamepad from "./useGamepad";

const THROTTLE_WAIT = 400;

const useJoystick = (options: {
  showAbout: () => boolean;
  toggleAbout: () => void;
  scrollAboutUp: () => void;
  scrollAboutDown: () => void;
}) => {
  const dispatch = useDispatch();
  const store = useStore();

  const clearSelectionMode = throttle(() => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "clear" }));
    }
  }, THROTTLE_WAIT);
  const selectLeft = throttle(() => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "left" }));
    }
  }, THROTTLE_WAIT);
  const selectRight = throttle(() => {
    if (options && options.showAbout()) {
    } else {
      dispatch(select({ direction: "right" }));
    }
  }, THROTTLE_WAIT);

  const onShuffle = throttle(() => {
    const state = store.getState();
    const { selectedSlotIdx } = state;
    if (selectedSlotIdx != null) {
      dispatch(shuffle({ slot: selectedSlotIdx }));
    }
  }, THROTTLE_WAIT);

  const handleUp = throttle(() => {
    if (options && options.showAbout()) {
      options.scrollAboutUp();
    } else {
      onShuffle();
    }
  }, THROTTLE_WAIT);

  const handleDown = throttle(() => {
    if (options && options.showAbout()) {
      options.scrollAboutDown();
    } else {
      onShuffle();
    }
  }, THROTTLE_WAIT);

  const handleToggleMute = throttle(() => {
    if (options && options.showAbout()) {
    } else {
      const state = store.getState();
      const { selectedSlotIdx } = state;

      if (selectedSlotIdx != null) {
        dispatch(toggleMute({ slot: selectedSlotIdx }));
      }
    }
  }, THROTTLE_WAIT);

  const handleToggleAutoplay = throttle(() => {
    dispatch(toggleAutoplay());
  }, THROTTLE_WAIT);

  const handleTogglePlay = throttle(() => {
    dispatch(togglePlay());
  }, THROTTLE_WAIT);

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

import { useRouter } from "next/router";

import { useStore, useDispatch } from "react-redux";
import throttle from "lodash.throttle";

import {
  select,
  shuffle,
  toggleAutoplay,
  toggleMute,
  togglePlay,
  stop,
} from "../store/actions";

import useKeyboardShortcut from "./useKeyboardShortcut";
import useGamepad from "./useGamepad";
import { State } from "../store/types";

const THROTTLE_WAIT = 400;

const useJoystick = (options: {
  shake: () => void;
  showAbout: () => boolean;
  toggleAbout: () => void;
  scrollAboutUp: () => void;
  scrollAboutDown: () => void;
}) => {
  const router = useRouter();
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
    const state: State = store.getState();
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

  const handleToggleMute = throttle((slotIdx?: number) => {
    if (options && options.showAbout()) {
    } else {
      if (slotIdx != null) {
        dispatch(toggleMute({ slot: slotIdx }));
      } else {
        const state: State = store.getState();
        const { selectedSlotIdx } = state;

        if (selectedSlotIdx != null) {
          dispatch(toggleMute({ slot: selectedSlotIdx }));
        }
      }
    }
  }, THROTTLE_WAIT);

  const handleSwitch = throttle(() => {
    dispatch(stop());
    const state: State = store.getState();
    const currentVersion = state.version;
    if (currentVersion === "v1") {
      router.push("/version/2");
    }
    if (currentVersion === "v2") {
      router.push("/version/1");
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
          if (options && options.toggleAbout) {
            options.toggleAbout();
          }
          break;
        }
        case 3: {
          if (options && options.shake) {
            options.shake();
          }
          break;
        }
        case 4: {
          console.log('Not implemented yet: switch to old slotmachine');
          // handleSwitch();
          break;
        }
        case 5: {
          handleToggleMute(0);
          break;
        }
        case 6: {
          handleToggleMute(1);
          break;
        }
        case 7: {
          handleToggleMute(2);
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

  useKeyboardShortcut(["m", "M"], () => {
    handleToggleMute();
  });
  useKeyboardShortcut(["q", "Q"], () => {
    handleToggleMute(0);
  });
  useKeyboardShortcut(["w", "W"], () => {
    handleToggleMute(1);
  });
  useKeyboardShortcut(["e", "E"], () => {
    handleToggleMute(2);
  });

  useKeyboardShortcut(["a", "A"], handleToggleAutoplay);

  useKeyboardShortcut(["s", "S"], options.shake);
  useKeyboardShortcut(["v", "V"], handleSwitch);

  useKeyboardShortcut(["space"], handleTogglePlay);
};

export default useJoystick;

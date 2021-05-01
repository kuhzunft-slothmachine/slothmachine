import { Middleware } from "redux";

import { State } from "./types";
import { ActionType, Action, play, shuffle, toggleMute } from "./actions";

const autoplayMiddleware: Middleware<{}, State> = (store) => (next) => (
  action: Action
) => {
  const isAutoplayAction = action.type === ActionType.ToggleAutoplay;
  const beforeState = store.getState();

  if (isAutoplayAction && !beforeState.isAutoplaying) {
    next(toggleMute({ slot: 0, muted: false }));
    next(toggleMute({ slot: 1, muted: false }));
    next(toggleMute({ slot: 2, muted: false }));
    next(shuffle());
  }

  next(action);

  const afterState = store.getState();

  if (isAutoplayAction && afterState.isAutoplaying && !afterState.isPlaying) {
    next(play());
  }
};

export default autoplayMiddleware;

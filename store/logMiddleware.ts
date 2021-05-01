import { Howl } from "howler";
import { Middleware } from "redux";

import { State } from "./types";

const createLogMiddleware = (howls: Howl[]) => {
  const logMiddleware: Middleware<{}, State> = (store) => (next) => (
    action
  ) => {
    const beforeState = store.getState();
    console.group(action.type);
    console.log("Before state", beforeState);
    console.log("Before Howls", howls);
    console.log("Action", action);

    next(action);

    const afterState = store.getState();
    console.log("After Howls", howls);
    console.log("After state", afterState);
    console.groupEnd();
  };

  return logMiddleware;
};

export default createLogMiddleware;

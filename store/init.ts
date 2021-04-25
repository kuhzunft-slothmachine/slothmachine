import { useMemo } from "react";
import { createStore, applyMiddleware, Store } from "redux";

import { State } from "./types";
import reducer from "./reducer";
import soundMiddleware from './soundMiddleware';

let store: Store;

const initialState = {
  isPlaying: false,
  isAutoplaying: false,

  artistsById: {},
  tracks: []
};

const initStore = (preloadedState: State = initialState) => {
  return createStore(reducer, preloadedState, applyMiddleware(soundMiddleware));
};

export const initializeStore = (preloadedState: State) => {
  let _store = store || initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: State) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

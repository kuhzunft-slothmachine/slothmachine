import { useReducer, useRef, useCallback, useMemo } from "react";

type ReducerType = Parameters<typeof useReducer>[0];
type InitStateType = Parameters<typeof useReducer>[1];
type InitializerType = Parameters<typeof useReducer>[2];

type Middleware<A, S> = (action: A, getState: () => S) => void;

export const useEnhancedReducer = (
  reducer: ReducerType,
  initState: InitStateType,
  initializer: InitializerType,
  middlewares: Middleware<
    Parameters<typeof reducer>[1],
    Parameters<typeof reducer>[0]
  >[]
) => {
  const lastState = useRef<ReturnType<typeof reducer>>(initState);
  const getState = useCallback(() => lastState.current, []);
  const [state, dispatch] = useReducer(
    (
      state: Parameters<typeof reducer>[0],
      action: Parameters<typeof reducer>[1]
    ) => (lastState.current = reducer(state, action)),
    initState,
    initializer
  );

  const middlewaresRef = useRef(middlewares);
  const enhancedDispatch = useMemo(
    () =>
      middlewaresRef.current.reduceRight(
        (acc, mdw) => (action) => mdw(state)(getState)(acc)(action),
        dispatch
      ),
    []
  );

  return [state, dispatch, getState];
};

export default useEnhancedReducer;

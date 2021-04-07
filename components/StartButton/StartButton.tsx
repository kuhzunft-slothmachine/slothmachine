import { useSelector, useDispatch } from "react-redux";

import { ActionType, State } from "../../store/types";

import classes from "./StartButton.module.scss";

const StartButton = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector<State>((state) => state.isPlaying);

  return (
    <button
      className={classes.block}
      onClick={() => {
        if (isPlaying) {
          dispatch({ type: ActionType.Stop });
        } else {
          dispatch({ type: ActionType.Play });
        }
      }}
    >
      {isPlaying ? "STOP" : "START"}
    </button>
  );
};

export default StartButton;

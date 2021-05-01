import { useSelector, useDispatch } from "react-redux";

import { State } from "../../store/types";
import { togglePlay } from "../../store/actions";

import classes from "./StartButton.module.scss";

const StartButton = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector<State>((state) => state.isPlaying);

  return (
    <button
      className={classes.block}
      onClick={() => {
        dispatch(togglePlay());
      }}
    >
      {isPlaying ? "STOP" : "START"}
    </button>
  );
};

export default StartButton;

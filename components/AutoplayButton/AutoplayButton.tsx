import { useSelector, useDispatch } from "react-redux";

import { State } from "../../store/types";
import { toggleAutoplay } from "../../store/actions";

import classes from "./AutoplayButton.module.scss";

const AutoplayButton = () => {
  const dispatch = useDispatch();
  const isAutoplaying = useSelector<State>((state) => state.isAutoplaying);

  return (
    <div className={classes.block}>
      <div className={classes.label}>AUTO PLAY</div>
      <button
        onClick={() => {
          dispatch(toggleAutoplay());
        }}
      >
        <img
          src={`/media/images/slotmachine-random${
            isAutoplaying ? "on" : "off"
          }.png`}
        />
      </button>
    </div>
  );
};

export default AutoplayButton;

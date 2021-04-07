import { useDispatch } from "react-redux";

import { ActionType } from "../../store/types";

import classes from "./ArtistLabel.module.scss";

interface ArtistLabelProps {
  artist: string;
  instruments: string;
  slot: number;
}

const ArtistLabel = ({ artist, instruments, slot }: ArtistLabelProps) => {
  const dispatch = useDispatch();
  const label = `${artist} - ${instruments}`;

  const shuffle = () => {
    dispatch({
      type: ActionType.Shuffle,
      trackSlot: slot,
    });
    dispatch({
      type: ActionType.Play,
      trackSlot: slot,
    });
  };

  return (
    <div className={classes.block}>
      <div className={classes.up}>
        <button onClick={shuffle}>
          <img src="/media/images/arrowup.png" alt="Artist up" />
        </button>
      </div>
      <div className={classes.label}>
        <h4>{label}</h4>
      </div>
      <div className={classes.down}>
        <button onClick={shuffle}>
          <img src="/media/images/arrowdown.png" alt="Artist down" />
        </button>
      </div>
      <img
        src="/media/images/inst_choice-frame_left.png"
        alt="Artist label background"
      />
    </div>
  );
};

export default ArtistLabel;

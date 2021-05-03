import { useDispatch, useSelector } from "react-redux";

import { State } from "../../store/types";
import { shuffle } from "../../store/actions";

import classNames from "classnames";
import classes from "./ArtistLabel.module.scss";

interface ArtistLabelProps {
  artist: string;
  instruments?: string;
  slot: number;
}

const ArtistLabel = ({ artist, instruments, slot }: ArtistLabelProps) => {
  const dispatch = useDispatch();
  const isAutoplaying = useSelector<State, boolean>(
    (state) => state.isAutoplaying
  );

  const [selectionMode, isSelected] = useSelector<State, [boolean, boolean]>(
    (state) => [state.selectedSlotIdx != null, state.selectedSlotIdx === slot]
  );

  const label = instruments ? `${artist} - ${instruments}` : artist;

  const onShuffle = () => {
    dispatch(shuffle({ slot }));
  };

  return (
    <div className={classes.block}>
      <div
        className={classNames(classes.up, {
          [classes.isAutoplaying]: isAutoplaying,
          [classes.selectionMode]: selectionMode,
          [classes.selected]: isSelected,
        })}
      >
        <button onClick={onShuffle}>
          <img src="/media/images/arrowup.png" alt="Artist up" />
        </button>
      </div>
      <div className={classes.label}>
        <h4>{label}</h4>
      </div>
      <div
        className={classNames(classes.down, {
          [classes.isAutoplaying]: isAutoplaying,
          [classes.selectionMode]: selectionMode,
          [classes.selected]: isSelected,
        })}
      >
        <button onClick={onShuffle}>
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

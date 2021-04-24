import React from "react";
import { useSelector } from "react-redux";

import useSlot from "../../hooks/useSlot";

import classes from "./Slot.module.scss";
import { State, Track } from "../../store/types";

interface SlotProps {
  slotIdx: number;
}

const Slot = ({ slotIdx }: SlotProps) => {
  const slot = useSlot(slotIdx);
  console.log(slot);

  const tracks = useSelector<State, Track[]>((state) => state.tracks);

  return (
    <div className={classes.block}>
      <div className={classes.strip}>
        {tracks.map((track) => {
          return (
            <img
              key={track.photo}
              src={`/media/${track.photo}`}
              alt={`Picture of the ${track.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slot;

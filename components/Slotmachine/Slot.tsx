import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import RotatingSlot from "./RotatingSlot";

import useSlot from "../../hooks/useSlot";

import classes from "./Slot.module.scss";
import { State, Track } from "../../store/types";
import { getCurrentVersion } from "../../utils/version";

interface SlotProps {
  slotIdx: number;
  className?: string;
}

const Slot = ({ slotIdx, className }: SlotProps) => {
  const currentVersion = getCurrentVersion();

  const slot = useSlot(slotIdx);
  const { trackIdx } = slot;

  const tracks = useSelector<State, Track[]>((state) => state.tracks);

  return (
    <RotatingSlot
      target={trackIdx}
      times={5}
      className={classNames(classes.block, className, {
        [classes.muted]: slot.muted,
      })}
    >
      {tracks.map((track) => {
        return (
          <div
            className={classes.image}
            key={track.photo}
            style={{
              backgroundImage: `url(/media/${track.version ?? currentVersion}/cover/${track.photo})`
            }}
            aria-label={`Picture of the ${track.title}`}
          />
        );
      })}
    </RotatingSlot>
  );
};

export default Slot;

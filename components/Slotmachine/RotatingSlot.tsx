import React, { useEffect, useRef } from "react";

import classNames from "classnames";
import classes from "./RotatingSlot.module.scss";

interface SlothProps {
  target: number;

  easing?: (
    elapsed: number,
    initial: number,
    totalScroll: number,
    duration: number
  ) => number;

  duration?: number;
  times?: number;
  onEnd?: () => void;

  children: React.ReactElement[];
  className?: string;
}

const RotatingSlot = ({
  target,

  duration = 1500,
  easing = (elapsed, initialValue, amountOfChange, duration) => {
    return (
      -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue
    );
  },
  times = 1,
  onEnd = () => {},

  children,
  className,
}: SlothProps) => {
  const frameRef = useRef<HTMLDivElement>();
  const targetRefs = useRef([]);
  const prevTarget = useRef(-1);

  useEffect(() => {
    if (target === prevTarget.current) return;
    prevTarget.current = target;

    const $frame = frameRef.current;

    $frame.scrollTop = 0;

    if (target === 0 && prevTarget.current > -1) return;

    const $target = targetRefs.current[target];

    if ($target == null) return;

    const fullScroll =
      targetRefs.current[targetRefs.current.length - 1].offsetTop;
    const targetOffset = $target.offsetTop;

    const totalScroll = targetOffset + fullScroll * (times - 1);

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        onEnd();
        return;
      }

      const amount = easing(elapsed, 0, totalScroll, duration);
      $frame.scrollTop = amount % fullScroll;

      requestAnimationFrame(tick);
    };

    tick();
  });

  return (
    <div className={classNames(classes.block, className)} ref={frameRef}>
      {children.map((child, index) =>
        React.cloneElement(child, {
          ref: (ref: HTMLElement) => (targetRefs.current[index] = ref),
        })
      )}
    </div>
  );
};

export default RotatingSlot;

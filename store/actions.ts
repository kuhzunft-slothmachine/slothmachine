export enum ActionType {
  Selection = "selection",

  ToggleAutoplay = "toggleAutoplay",
  TogglePlay = "togglePlay",
  ToggleMute = "toggleMute",

  Shuffle = "shuffle",

  Play = "play",
  Stop = "stop",
}

type Direction = "left" | "right" | "clear";

export type Action =
  | { type: ActionType.Selection; direction: Direction }
  | { type: ActionType.ToggleAutoplay }
  | { type: ActionType.TogglePlay }
  | { type: ActionType.ToggleMute; slot: number; muted?: boolean }
  | { type: ActionType.Shuffle; slot: number }
  | { type: ActionType.Play; slot?: number }
  | { type: ActionType.Stop; slot?: number };

export const shuffle = ({ slot }: { slot?: number } = {}) => {
  return { type: ActionType.Shuffle, slot };
};

export const play = ({ slot }: { slot?: number } = {}) => {
  return { type: ActionType.Play, slot };
};

export const stop = ({ slot }: { slot?: number } = {}) => {
  return { type: ActionType.Stop, slot };
};

export const togglePlay = () => {
  return { type: ActionType.TogglePlay };
};

export const toggleAutoplay = () => {
  return { type: ActionType.ToggleAutoplay };
};

export const toggleMute = ({
  slot,
  muted,
}: {
  slot: number;
  muted?: boolean;
}) => {
  return { type: ActionType.ToggleMute, slot, muted };
};

export const select = ({ direction }: { direction: Direction }) => {
  return { type: ActionType.Selection, direction };
};

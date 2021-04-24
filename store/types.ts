export interface Track {
  title: string;
  artist_id: string;
  audio: string;
  photo: string;
}

export interface Artist {
  name: string;
  instrument?: string;
}

export interface TrackState {
  isPaused: boolean;

  track_id: string;
}

export type CurrentSlots = [TrackState, TrackState, TrackState];

export interface State {
  isAutoplaying: boolean;
  isPlaying: boolean;

  currentSlots?: CurrentSlots;

  artistsById: Record<string, Artist>;
  tracksById: Record<string, Track>;
  tracks: Track[];
}

export enum ActionType {
  ToggleAutoplay = "toggleAutoplay",
  Pause = "pause",
  Resume = "resume",
  Play = "play",
  Stop = "stop",
  Shuffle = "shuffle",
}

export type Action =
  | { type: ActionType.ToggleAutoplay }
  | { type: ActionType.Shuffle; trackSlot: number }
  | { type: ActionType.Pause; trackSlot: number }
  | { type: ActionType.Resume; trackSlot: number }
  | { type: ActionType.Play; trackSlot?: number }
  | { type: ActionType.Stop; trackSlot?: number };

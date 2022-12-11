export interface Track {
  title: string;
  artist_id: string;
  audio: string;
  photo: string;
  version?: string;
}

export interface Artist {
  name: string;
  instrument?: string;
}

export interface TrackState {
  muted: boolean;
  trackIdx: number;
}

export type CurrentSlots = [TrackState, TrackState, TrackState];

export interface State {
  isAutoplaying: boolean;
  isPlaying: boolean;

  currentSlots?: CurrentSlots;
  selectedSlotIdx?: number;

  artistsById: Record<string, Artist>;

  tracks: Track[];
}

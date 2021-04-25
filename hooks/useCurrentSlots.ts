import { useSelector } from "react-redux";

import { Artist, State, Track } from "../store/types";

export interface EnhancedSlot {
  trackIdx: number;
  track: Track;
  artist: Artist;
  isPaused: boolean;
}

const useCurrentSlots = () =>
  useSelector<State, EnhancedSlot[]>((state) => {
    const result = state.currentSlots.map((slot) => {
      const track = state.tracks[slot.trackIdx];
      const artist = state.artistsById[track.artist_id];

      return {
        ...slot,
        trackIdx: slot.trackIdx,
        track,
        artist,
      };
    });

    return result;
  });

export default useCurrentSlots;

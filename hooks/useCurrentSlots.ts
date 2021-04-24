import { useSelector } from "react-redux";

import { Artist, State, Track } from "../store/types";

export interface EnhancedSlot {
  track: Track;
  artist: Artist;
  isPaused: boolean;
}

const useCurrentSlots = () =>
  useSelector<State, EnhancedSlot[]>((state) => {
    const result = state.currentSlots.map((slot) => {
      const track = state.tracksById[slot.track_id];
      const artist = state.artistsById[track.artist_id];

      return {
        ...slot,
        track: state.tracksById[slot.track_id],
        artist,
      };
    });

    return result;
  });

export default useCurrentSlots;

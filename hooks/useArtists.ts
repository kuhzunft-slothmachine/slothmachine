import { useState } from "react";
import useSound from "use-sound";

export interface Track {
  title: string;
  artist_id: string;
  audo: string;
  photo: string;
}

export interface Artist {
  name: string;
  instrument?: string;
}

export interface Slot {
  id: string;
  track: Track;
  artist: Artist;
  nextTrack: () => void;
  prevTrack: () => void;
}

export type CurrentSlots = [Slot, Slot, Slot];

const randomTrack = (
  setter: (nextValue: string) => void,
  trackIds: string[]
) => {
  return () => setter(trackIds[Math.floor(Math.random() * trackIds.length)]);
};

const useArtists = ({
  allTracks,
  allArtists,
}: {
  allTracks: Track[];
  allArtists: Artist[];
}): {
  currentSlots: CurrentSlots;
} => {
  const trackIds = Object.keys(allTracks);

  const [trackId1, setTrackId1] = useState<string>(() => {
    return trackIds[0];
  });
  const [trackId2, setTrackId2] = useState(() => {
    return trackIds[1];
  });
  const [trackId3, setTrackId3] = useState(() => {
    return trackIds[2];
  });

  const track1 = allTracks[trackId1];
  const track2 = allTracks[trackId2];
  const track3 = allTracks[trackId3];

  return {
    currentSlots: [
      {
        id: trackId1,
        track: track1,
        artist: allArtists[track1.artist_id],
        nextTrack: randomTrack(setTrackId1, trackIds),
        prevTrack: randomTrack(setTrackId1, trackIds),
      },
      {
        id: trackId2,
        track: track2,
        artist: allArtists[track2.artist_id],
        nextTrack: randomTrack(setTrackId2, trackIds),
        prevTrack: randomTrack(setTrackId2, trackIds),
      },
      {
        id: trackId3,
        track: track3,
        artist: allArtists[track3.artist_id],
        nextTrack: randomTrack(setTrackId3, trackIds),
        prevTrack: randomTrack(setTrackId3, trackIds),
      },
    ],
  };
};

export default useArtists;

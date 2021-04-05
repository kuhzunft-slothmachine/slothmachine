import { useState } from "react";
import useSound from "use-sound";

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

export interface Slot {
  id: string;
  track: Track;
  artist: Artist;
  muted: boolean;
  toggleMutedState: () => void;
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
  start: () => void;
  stop: () => void;
  isPlaying: boolean;
  isAutoplaying: boolean;
  toggleAutoplaying: () => void;
  currentSlots: CurrentSlots;
} => {
  const trackIds = Object.keys(allTracks);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(false);

  const [trackId1, setTrackId1] = useState<string>(() => {
    return trackIds[0];
  });
  const [trackId2, setTrackId2] = useState(() => {
    return trackIds[1];
  });
  const [trackId3, setTrackId3] = useState(() => {
    return trackIds[2];
  });

  const track1: Track = allTracks[trackId1];
  const track2: Track = allTracks[trackId2];
  const track3: Track = allTracks[trackId3];

  const [
    playTrack1,
    {
      pause: pauseTrack1,
      stop: stopTrack1,
      isPlaying: isPlayingTrack1,
      sound: track1Sound,
    },
  ] = useSound(`/media/${track1.audio}`, { preload: false });
  const [
    playTrack2,
    {
      pause: pauseTrack2,
      stop: stopTrack2,
      isPlaying: isPlayingTrack2,
      sound: track2Sound,
    },
  ] = useSound(`/media/${track2.audio}`, { preload: false });
  const [
    playTrack3,
    {
      pause: pauseTrack3,
      stop: stopTrack3,
      isPlaying: isPlayingTrack3,
      sound: track3Sound,
    },
  ] = useSound(`/media/${track3.audio}`, { preload: false });

  return {
    start: () => {
      track1Sound.load();
      track2Sound.load();
      track3Sound.load();

      playTrack1();
      playTrack2();
      playTrack3();

      setIsPlaying(true);
    },
    stop: () => {
      stopTrack1();
      stopTrack2();
      stopTrack3();

      setIsPlaying(false);
    },
    isPlaying,
    isAutoplaying,
    toggleAutoplaying: () => {
      if (isAutoplaying) {
        setIsAutoplaying(false);
      } else {
        setIsAutoplaying(true);
      }
    },
    currentSlots: [
      {
        id: trackId1,
        track: track1,
        artist: allArtists[track1.artist_id],
        muted: !isPlayingTrack1,
        toggleMutedState: () => {
          if (isPlayingTrack1) {
            pauseTrack1();
          } else {
            playTrack1();
          }
        },
        nextTrack: randomTrack(setTrackId1, trackIds),
        prevTrack: randomTrack(setTrackId1, trackIds),
      },
      {
        id: trackId2,
        track: track2,
        artist: allArtists[track2.artist_id],
        muted: !isPlayingTrack2,
        toggleMutedState: () => {
          if (isPlayingTrack2) {
            pauseTrack2();
          } else {
            playTrack2();
          }
        },
        nextTrack: randomTrack(setTrackId2, trackIds),
        prevTrack: randomTrack(setTrackId2, trackIds),
      },
      {
        id: trackId3,
        track: track3,
        artist: allArtists[track3.artist_id],
        muted: !isPlayingTrack3,
        toggleMutedState: () => {
          if (isPlayingTrack3) {
            pauseTrack3();
          } else {
            playTrack3();
          }
        },
        nextTrack: randomTrack(setTrackId3, trackIds),
        prevTrack: randomTrack(setTrackId3, trackIds),
      },
    ],
  };
};

export default useArtists;

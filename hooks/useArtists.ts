import { useReducer, useRef } from "react";
import produce from "immer";
// import useSound from "use-sound";
import { Howl } from "howler";

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

interface TrackState {
  isPaused: boolean;

  track: Track;
  artist: Artist;
}

export type CurrentSlots = [TrackState, TrackState, TrackState];

interface State {
  isAutoplaying: boolean;
  isPlaying: boolean;

  currentSlots: CurrentSlots;

  artistsById: Record<string, Artist>;
  tracks: Track[];
}

const initialState = ({
  artistsById,
  tracks,
  initialSlots,
}: {
  artistsById: Record<string, Artist>;
  tracks: Track[];
  initialSlots: [number, number, number];
}): State => {
  // @ts-ignore
  const currentSlots: CurrentSlots = initialSlots.map((index) => {
    const track = tracks[index];
    return {
      isPaused: false,
      track,
      artist: artistsById[track.artist_id],
    };
  });

  return {
    isPlaying: false,
    isAutoplaying: false,

    currentSlots,

    artistsById,
    tracks,
  };
};

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

const reducer = produce((draft: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleAutoplay: {
      draft.isAutoplaying = !draft.isAutoplaying;
      break;
    }
    case ActionType.Pause: {
      const track = draft.currentSlots[action.trackSlot];
      track.isPaused = true;
      break;
    }

    case ActionType.Resume: {
      const track = draft.currentSlots[action.trackSlot];
      track.isPaused = false;
      break;
    }

    case ActionType.Play: {
      draft.isPlaying = true;
      break;
    }

    case ActionType.Stop: {
      draft.isPlaying = false;
      break;
    }

    case ActionType.Shuffle: {
      const randomIndex = Math.floor(Math.random() * draft.tracks.length);
      const track = draft.tracks[randomIndex];

      draft.currentSlots[action.trackSlot] = {
        ...draft.currentSlots[action.trackSlot],
        track,
        artist: draft.artistsById[track.artist_id],
      };
      break;
    }
    default: {
      return draft;
    }
  }
});

const soundMiddleware = (
  dispatch: React.Dispatch<Action>,
  state: State,
  howls: React.MutableRefObject<Howl[]>
) => {
  return (action: Action) => {
    switch (action.type) {
      case ActionType.Shuffle: {
        if (!state.isPlaying) {
          break;
        }

        const { trackSlot } = action;
        const currentHowl = howls.current[trackSlot];

        if (currentHowl) {
          currentHowl.stop();
        }

        break;
      }

      case ActionType.Play: {
        const playSlot = (slot: TrackState, index: number) => {
          const howl = new Howl({
            src: [`/media/${slot.track.audio}`],
            loop: true,
          });

          howls.current[index] = howl;

          howl.play();
          if (state.currentSlots[index].isPaused) {
            howl.pause();
          }
        };

        if (action.trackSlot != null) {
          playSlot(state.currentSlots[action.trackSlot], action.trackSlot);
        } else {
          state.currentSlots.forEach(playSlot);
        }

        break;
      }
      case ActionType.Stop: {
        howls.current.forEach((howl) => {
          howl.stop();
        });
        howls.current = [];

        break;
      }
      case ActionType.Pause: {
        if (!state.isPlaying) {
          break;
        }

        const { trackSlot } = action;
        const howl = howls.current[trackSlot];
        if (howl) {
          howl.pause();
        }

        break;
      }
      case ActionType.Resume: {
        if (!state.isPlaying) {
          break;
        }

        const { trackSlot } = action;
        const howl = howls.current[trackSlot];
        if (howl) {
          howl.play();
        }

        break;
      }
    }
    dispatch(action);
  };
};

const useArtists = ({
  tracks,
  artistsById,
}: {
  tracks: Track[];
  artistsById: Record<string, Artist>;
}): [State, React.Dispatch<Action>] => {
  const howls = useRef<Howl[]>([]);
  const [state, rawDispatch] = useReducer(
    reducer,
    { artistsById, tracks, initialSlots: [0, 1, 2] },
    initialState
  );
  const dispatch = soundMiddleware(rawDispatch, state, howls);

  return [state, dispatch];
};

export default useArtists;

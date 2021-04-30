import { promises as fs } from "fs";
import path from "path";

import Link from "next/link";
import {useDispatch} from "react-redux";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";
import StartButton from "../components/StartButton";
import AutoplayButton from "../components/AutoplayButton";

import useJoystick from "../hooks/useJoystick";
import useTimeout from "../hooks/useTimeout";

import { ActionType, State, Track } from "../store/types";

import classes from "./index.module.scss";

export default function Home() {
  const dispatch = useDispatch();

  useJoystick();
  useTimeout(() => {
    dispatch({ type: ActionType.Shuffle });
  }, 1000);


  return (
    <div className={classes.block}>
      <Header />

      <Main>
        <div className={classes.content}>
          <div className={classes.sidebar}>
            <img src="/media/images/arrow-left.png" alt="Play..." />
            <a className={classes.donation} href="https://paypal.me/kuhzunft">
              <img src="/media/images/slotmachine-slot.png" />
            </a>
          </div>
          <div className={classes.slotmachineContainer}>
            <Slotmachine />
          </div>
          <div className={classes.sidebar}>
            <img src="/media/images/arrow-right.png" alt="...Now" />
            <AutoplayButton />
          </div>
        </div>
        <div className={classes.footer}>
          <Link href="/about">
            <a className={classes.footerLink}>ABOUT</a>
          </Link>
          <StartButton />
        </div>
      </Main>
    </div>
  );
}

export async function getStaticProps() {
  const artistsByIdJson = await fs.readFile(
    path.join(process.cwd(), "data/artists.json"),
    "utf8"
  );
  const artistsById = JSON.parse(artistsByIdJson);
  const tracksByIdJson = await fs.readFile(
    path.join(process.cwd(), "data/tracks.json"),
    "utf8"
  );
  const tracksById = JSON.parse(tracksByIdJson);
  const tracks: Track[] = Object.values(tracksById);

  const initialReduxState: State = {
    isPlaying: false,
    isAutoplaying: false,

    currentSlots: [
      { isPaused: false, trackIdx: 0 },
      { isPaused: false, trackIdx: 0 },
      { isPaused: false, trackIdx: 0 },
    ],

    artistsById,
    tracks
  };

  return {
    props: {
      initialReduxState,
    },
  };
}

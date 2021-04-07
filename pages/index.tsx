import { promises as fs } from "fs";
import path from "path";

import Link from "next/link";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";
import StartButton from "../components/StartButton";
import AutoplayButton from "../components/AutoplayButton";

import { State } from "../store/types";

import classes from "./index.module.scss";

export default function Home() {
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

  const tracksIds = Object.keys(tracksById);

  const initialReduxState: State = {
    isPlaying: false,
    isAutoplaying: false,

    currentSlots: [
      { isPaused: false, track_id: tracksIds[0] },
      { isPaused: false, track_id: tracksIds[1] },
      { isPaused: false, track_id: tracksIds[2] },
    ],

    artistsById,
    tracksById,
  };

  return {
    props: {
      initialReduxState,
    },
  };
}

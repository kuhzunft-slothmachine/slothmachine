import { promises as fs } from "fs";
import path from "path";

import Link from "next/link";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";
import StartButton from "../components/StartButton";
import AutoplayButton from "../components/AutoplayButton";

import useArtists, { Artist, Track, ActionType } from "../hooks/useArtists";

import classes from "./index.module.scss";

interface HomeProps {
  artistsById: Record<string, Artist>;
  tracks: Track[];
}

export default function Home({ artistsById, tracks }: HomeProps) {
  const [{ currentSlots, isPlaying, isAutoplaying }, dispatch] = useArtists({
    tracks,
    artistsById,
  });

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
            <Slotmachine
              currentSlots={currentSlots}
              isAutoplaying={isAutoplaying}
              dispatch={dispatch}
            />
          </div>
          <div className={classes.sidebar}>
            <img src="/media/images/arrow-right.png" alt="...Now" />
            <AutoplayButton
              state={isAutoplaying}
              onToggle={() => dispatch({ type: ActionType.ToggleAutoplay })}
            />
          </div>
        </div>
        <div className={classes.footer}>
          <Link href="/about">
            <a className={classes.footerLink}>ABOUT</a>
          </Link>
          <StartButton
            running={isPlaying}
            onStart={() => dispatch({ type: ActionType.Play })}
            onStop={() => dispatch({ type: ActionType.Stop })}
          />
        </div>
      </Main>
    </div>
  );
}

export async function getStaticProps() {
  const allArtists = await fs.readFile(
    path.join(process.cwd(), "data/artists.json"),
    "utf8"
  );
  const allTracks = await fs.readFile(
    path.join(process.cwd(), "data/tracks.json"),
    "utf8"
  );

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      artistsById: JSON.parse(allArtists),
      tracks: Object.values(JSON.parse(allTracks)),
    },
  };
}

import { GetStaticPropsContext } from "next";
import { promises as fs } from "fs";
import path from "path";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import classNames from "classnames";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Slotmachine from "../../components/Slotmachine";
import StartButton from "../../components/StartButton";
import AutoplayButton from "../../components/AutoplayButton";

import About from "../../components/About";

import useJoystick from "../../hooks/useJoystick";
import useTimeout from "../../hooks/useTimeout";

import { State, Track } from "../../store/types";
import { shuffle } from "../../store/actions";

import classes from "../index.module.scss";

export default function Home() {
  const aboutScrollContainerRef = useRef<HTMLDivElement>();
  const [showAbout, setShowAbout] = useState(false);
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();

  useJoystick({
    shake: () => {
      if (!shake) {
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 1000);
      }
    },
    showAbout: () => showAbout,
    toggleAbout: () => setShowAbout((currentShowAbout) => !currentShowAbout),
    scrollAboutUp: () => {
      if (aboutScrollContainerRef.current) {
        aboutScrollContainerRef.current.scrollTop -= 100;
      }
    },
    scrollAboutDown: () => {
      if (aboutScrollContainerRef.current) {
        aboutScrollContainerRef.current.scrollTop += 100;
      }
    },
  });

  useTimeout(() => {
    dispatch(shuffle());
  }, 3000);

  return (
    <div
      className={classNames(classes.block, {
        [classes.shake]: shake,
      })}
    >
      <Header />

      <Main>
        <div
          ref={aboutScrollContainerRef}
          className={classNames(classes.about, {
            [classes.showAbout]: showAbout,
          })}
        >
          <About />
        </div>
        <div
          className={classNames(classes.content, {
            [classes.showAbout]: showAbout,
          })}
        >
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
          <a
            className={classes.footerLink}
            onClick={() => {
              setShowAbout((currentAbout) => !currentAbout);
            }}
          >
            {showAbout ? "BACK" : "ABOUT"}
          </a>
          {showAbout ? <></> : <StartButton />}
        </div>
      </Main>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const currentVersion = `v${context.params.version}`;

  const artistsByIdJson = await fs.readFile(
    path.join(process.cwd(), `data/${currentVersion}/artists.json`),
    "utf8"
  );
  const artistsById = JSON.parse(artistsByIdJson);
  const tracksByIdJson = await fs.readFile(
    path.join(process.cwd(), `data/${currentVersion}/tracks.json`),
    "utf8"
  );
  const tracksById = JSON.parse(tracksByIdJson);
  const tracks: Track[] = Object.values(tracksById);

  const initialReduxState: State = {
    version: currentVersion,

    isPlaying: false,
    isAutoplaying: false,

    currentSlots: [
      { muted: false, trackIdx: 0 },
      { muted: false, trackIdx: 0 },
      { muted: false, trackIdx: 0 },
    ],

    artistsById,
    tracks,
  };

  return {
    props: {
      initialReduxState,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { version: "1" } }, { params: { version: "2" } }],
    fallback: false,
  };
}

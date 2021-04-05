import { useState } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";
import StartButton from "../components/StartButton";
import AutoplayButton from "../components/AutoplayButton";

import classes from "./index.module.scss";

export default function Home() {
  const [autoplay, setAutoplay] = useState(false);

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
            <AutoplayButton
              state={autoplay}
              onToggle={(nextAutoplayState) => {
                setAutoplay(nextAutoplayState);
              }}
            />
          </div>
        </div>
        <div className={classes.footer}>
          <Link href="/about">
            <a className={classes.footerLink}>ABOUT</a>
          </Link>
          <StartButton
            running={false}
            onStart={() => {
              console.log("Starting");
            }}
            onStop={() => {
              console.log("Stopping");
            }}
          />
        </div>
      </Main>
    </div>
  );
}

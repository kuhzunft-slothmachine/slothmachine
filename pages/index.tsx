import Link from "next/link";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";
import StartButton from "../components/StartButton";

export default function Home() {
  return (
    <div className="container">
      <Header />

      <Main>
        <div className="content">
          <div className="home_sidebar">
            <img src="/media/images/arrow-left.png" alt="Play..." />
            <a className="donation" href="https://paypal.me/kuhzunft">
              <img src="/media/images/slotmachine-slot.png" />
            </a>
          </div>
          <div className="home_slothmachine">
            <Slotmachine />
          </div>
          <div className="home_sidebar">
            <img src="/media/images/arrow-right.png" alt="...Now" />
            <div className="autoplay_container">
              <div className="autoplay_label">AUTO PLAY</div>
              <img src="/media/images/slotmachine-randomon.png" />
            </div>
          </div>
        </div>
        <div className="home_footer">
          <Link href="/about">
            <a className="home_about-link">ABOUT</a>
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

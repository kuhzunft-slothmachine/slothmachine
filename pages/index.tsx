import Link from "next/link";

import Header from "../components/Header";
import Main from "../components/Main";
import Slotmachine from "../components/Slotmachine";

export default function Home() {
  return (
    <div className="container">
      <Header />

      <Main>
        <div className="up">
          <div className="inline main_arrowleft">
            <div className="text_play text_center" />
            <img src="/media/images/arrow-left.png" alt="" />
          </div>

          <Slotmachine />

          <div className="inline main_arrowright">
            <img src="/media/images/arrow-right.png" alt="" />
          </div>

          <div className="donate inline">
            <a href="https://paypal.me/kuhzunft">
              <img src="../media/images/slotmachine-slot.png" />
            </a>
          </div>

          <div className="inline center" />

          <div className="random inline">
            <input id="value_autoplay" type="hidden" value="0" />
            <div className="text_auto">AUTO PLAY</div>
            <img src="../media/images/slotmachine-randomon.png" />
          </div>
        </div>
        <div className="main_footer">
          <Link href="/about">
            <div className="inline footer_button">
              <div id="aboutButton" className="text_footer text_center">
                ABOUT
              </div>
              <img src="/media/images/about-button-frame.png" alt="" />
            </div>
          </Link>
          <div className="inline footer_title" />
          <div className="inline  footer_button">
            <div id="startButton" className="text_footer text_center">
              START
            </div>
            <div id="stopButton" className="text_footer text_center hidden">
              STOP
            </div>
            <img
              id="image-start"
              src="../media/images/start-button-frame.png"
              alt=""
            />
          </div>
        </div>
      </Main>
    </div>
  );
}

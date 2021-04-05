import classes from "./About.module.scss";

import Link from "next/link";

const About = () => {
  return (
    <>
      <div className={classes.block}>
        <Link href="/">
          <a className={classes.linkBack}>BACK TO GAME</a>
        </Link>
      </div>

      <div className={classes.content}>
        <h3>ABOUT THIS PROJECT</h3>
        <p>
          The Slotmachine is a project by Achim Zepezauer that is currently
          combining 225 different recordings (each one with a length of 45
          seconds) from 18 artists in a random order. You can either simply
          press START and get surprised or deactivate the AUTO PLAY - Button to
          make a selection of specific instruments.
        </p>

        <p>
          There are two ways to support the project. You can donate via paypal
          at the donate-button or you can purchase a 10“ vinyl copy of some
          combinations, picked by Achim. The record is available from February
          1st, 2019 on, at Gruenrekorder or right here at
          www.kuhzunft.com/records.html, or elsewhere.
        </p>

        <p>The Artists are:</p>
      </div>
    </>
  );
};

export default About;

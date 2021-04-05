import Head from "next/head";

import Header from "../components/Header";
import Main from "../components/Main";
import AboutContent from "../components/About";

import classes from './about.module.scss';

export default function About() {
  return (
    <div className={classes.block}>
      <Head>
        <title>About Slotmachine</title>
      </Head>

      <Header />

      <Main>
        <AboutContent />
      </Main>
    </div>
  );
}

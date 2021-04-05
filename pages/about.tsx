import Head from "next/head";

import Header from "../components/Header";
import Main from "../components/Main";
import About from "../components/About";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>About Slotmachine</title>
      </Head>

      <Header />

      <Main>
        <About />
      </Main>
    </div>
  );
}

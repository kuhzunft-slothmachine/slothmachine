import Head from "next/head";

import Header from "../components/Header";
import Main from "../components/Main";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Head>
        <title>About Slotmachine</title>
      </Head>
      <div className="container">
        <Header />
        <Main>
          <About />
        </Main>
      </div>
    </>
  );
}

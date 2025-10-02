import React from "react";
import Homelayouts from "../layouts/Homelayouts";
import Head from "next/head";
import Hero from "./Hero";

const Homepage = () => {
  return (
    <Homelayouts>
      <Head>
        <title>Belt Driving School</title>
      </Head>
      <section>
        <Hero />
      </section>
    </Homelayouts>
  );
};

export default Homepage;

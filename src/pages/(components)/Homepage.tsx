import React from "react";
import Homelayouts from "../layouts/Homelayouts";
import Head from "next/head";
import Hero from "./Hero";
 import FAQ from "./Faq";
import PlanCard from "./PlanCard";
import FindUs from "./Locateus";
import Certificates from "./OurCertificate";
import Testimonials from "./Testomony";
import WhyChooseUs from "./WhyChooseUs";

const Homepage = () => {
  return (
    <Homelayouts>
      <Head>
        <title>Belt Driving School</title>
      </Head>
      <section>
        <Hero />
      </section>
      <section>
        <WhyChooseUs />
      </section>
      <section>
        <PlanCard title="Plan" price="1000" description="test" features={[]} />
      </section>
      <section>
        <FindUs />
      </section>
      <section>
        <Certificates />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <Testimonials />
      </section>
    </Homelayouts>
  );
};

export default Homepage;

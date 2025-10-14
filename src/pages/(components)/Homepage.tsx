import React from "react";
import Homelayouts from "../layouts/Homelayouts";
import Head from "next/head";
import Hero from "./Hero";
import FAQ from "./Faq";
import FindUs from "./Locateus";
import Certificates from "./OurCertificate";
import Testimonials from "./Testomony";
import WhyChooseUs from "./WhyChooseUs";
import PlanSection from "./planSelection";
import TeamPage from "./team";
import ReportAccidentButton from "./report";

const Homepage = () => {
  return (
    <Homelayouts>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          Belt Driving School — Professional Driving Lessons & Road Safety
        </title>
        <meta
          name="description"
          content="Belt Driving School provides professional driving lessons, certified instructors, and road safety training to build confident, safe drivers. Enrol today."
        />
        <meta
          name="keywords"
          content="driving school, driving lessons, driving instructor, road safety, learner driver"
        />
        <meta name="author" content="Belt Driving School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beltdrivingschool.com/" />
        <meta
          property="og:title"
          content="Belt Driving School — Professional Driving Lessons & Road Safety"
        />
        <meta
          property="og:description"
          content="Professional driving lessons, certified instructors, and practical training to create confident, safe drivers. Book your lesson now."
        />
        <meta
          property="og:image"
          content="https://beltdrivingschool.com/images/og-home.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://beltdrivingschool.com/" />
        <meta
          name="twitter:title"
          content="Belt Driving School — Professional Driving Lessons & Road Safety"
        />
        <meta
          name="twitter:description"
          content="Professional driving lessons, certified instructors, and practical training to create confident, safe drivers. Book your lesson now."
        />
        <meta
          name="twitter:image"
          content="https://beltdrivingschool.com/images/og-home.jpg"
        />
      </Head>

      <section>
        <Hero />
      </section>
      <section>
        <WhyChooseUs />
      </section>
      <section>
        <PlanSection />
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
      <section>
        <TeamPage />
      </section>

      <ReportAccidentButton />
    </Homelayouts>
  );
};

export default Homepage;

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
        <title>
          Belt Driving School | Professional Driving Lessons in Nigeria
        </title>
        <meta
          name="description"
          content="Learn to drive safely and confidently with Belt Driving School. Our certified instructors provide top-quality driving lessons, flexible schedules, and practical training across Nigeria."
        />
        <meta
          name="keywords"
          content="driving school, driving lessons, Nigeria, car training, defensive driving, driver education, Belt Driving School"
        />
        <meta name="author" content="https://www.beltdrivingschool.com/" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Belt Driving School | Learn to Drive with Confidence"
        />
        <meta
          property="og:description"
          content="Join Belt Driving School today to master safe driving skills with our expert instructors and modern vehicles."
        />
        <meta property="og:image" content="/images/og-banner.jpg" />
        <meta
          property="og:url"
          content="https://beltdrivingschool.com/images/og-home.jpg"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Belt Driving School | Learn to Drive with Confidence"
        />
        <meta
          name="twitter:description"
          content="Join Belt Driving School today to master safe driving skills with our expert instructors."
        />
        <meta name="twitter:image" content="/images/og-banner.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
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

import React, { ReactNode } from "react";
import Header from "../(components)/Header";
import PropTypes from "prop-types";
import Footer from "../(components)/Footer";
import Head from "next/head";

interface MainlayoutProps {
  children: ReactNode;
}

const Homelayouts: React.FC<MainlayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>Belt Driving School</title>
      </Head>
      <div className="text">
        <Header />
      </div>
      <div className="w-full h-auto ">{children}</div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};
Homelayouts.propTypes = {
  children: PropTypes.node,
};

export default Homelayouts;

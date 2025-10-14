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
      </Head>
      <Header />
      <main className="w-full h-auto">{children}</main>
      <Footer />
    </>
  );
};

Homelayouts.propTypes = {
  children: PropTypes.node,
};

export default Homelayouts;

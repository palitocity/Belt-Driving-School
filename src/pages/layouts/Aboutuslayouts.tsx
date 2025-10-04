import React, { ReactNode } from "react";
import Header from "../(components)/Header";
import PropTypes from "prop-types";
import Footer from "../(components)/Footer";

interface MainlayoutProps {
  children: ReactNode;
}

const Aboutuslayouts: React.FC<MainlayoutProps> = ({ children }) => {
  return (
    <>
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
Aboutuslayouts.propTypes = {
  children: PropTypes.node,
};

export default Aboutuslayouts;

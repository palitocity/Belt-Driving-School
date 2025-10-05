// components/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">About Us</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At{" "}
          <span className="font-semibold text-yellow-500">
            Belt Driving School
          </span>
          , we are committed to equipping learners with the skills, knowledge,
          and confidence needed to become safe and responsible drivers. Whether
          you are learning to drive for the first time or looking to improve
          your skills, our certified instructors guide you every step of the way
          with professionalism, patience, and care.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

// components/WhyChooseUs.js
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const WhyChooseUs = () => {
  const reasons = [
    "Expert Training - Certified instructors dedicated to your success",
    "Fast Driver's License Processing - Get your license in just a few days",
    "Quick Vehicle Services - Renew your particulars in minutes",
    "New Plate Number Registration - Seamless and hassle-free",
    "Change of Ownership - Smooth vehicle ownership transfers",
    "Convenience & Professionalism - Quality service that saves you time"
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
          Why Choose Us
        </h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start space-x-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <CheckCircleIcon className="h-6 w-6 text-[#E02828] text-[500] flex-shrink-0" />
              <p className="text-gray-700">{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;

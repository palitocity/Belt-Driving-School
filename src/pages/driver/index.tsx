import React from "react";
import Homelayouts from "../layouts/Homelayouts";
import Image from "next/image";

const DrivingTraining = () => {
  const trainings = [
    {
      title: "Beginner Training",
      description:
        "Perfect for new learners. Master the basics of driving, traffic signs, and car control with patient instructors.",
      duration: "4 Weeks",
      price: "₦120,000",
      image: "",
    },
    {
      title: "Intermediate Training",
      description:
        "For those who know the basics but want to improve road confidence and maneuvering in city traffic.",
      duration: "6 Weeks",
      price: "₦180,000",
      image: "",
    },
    {
      title: "Advanced Defensive Driving",
      description:
        "Learn professional-level driving, accident prevention, and safety awareness for high-performance handling.",
      duration: "8 Weeks",
      price: "₦250,000",
      image: "",
    },
  ];

  const licenseSteps = [
    {
      title: "1. Learner’s Permit",
      desc: "We assist you in applying for a learner’s permit through FRSC with all the needed documentation.",
    },
    {
      title: "2. Training & Test",
      desc: "Complete your driving course and undergo the standard road and theory tests with our guidance.",
    },
    {
      title: "3. Driver’s License Application",
      desc: "We guide you step-by-step in submitting your application for a full driver’s license through the official channels.",
    },
  ];

  return (
    <Homelayouts>
      {/* 🟥 HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 px-6 lg:px-20 mt-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Driving Training & Driver Licenses
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Get trained, certified, and licensed with{" "}
            <span className="font-semibold text-yellow-500">
              Belt Driving School
            </span>
            . Whether you&#39;re new to driving or aiming for your official
            driver’s license, our programs ensure you’re road-ready and
            confident.
          </p>
        </div>
      </section>

      {/* 🟦 TRAINING PACKAGES */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Our Driving Training Packages
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {trainings.map((plan, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <Image
                src={plan.image}
                alt={plan.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-800 font-semibold">
                    Duration: {plan.duration}
                  </span>
                  <span className="text-yellow-600 font-bold">
                    {plan.price}
                  </span>
                </div>

                <button className="mt-6 w-full bg-[#E02828] text-white py-2 rounded-lg hover:bg-red-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟨 DRIVER LICENSE GUIDE */}
      <section className="bg-gray-50 py-20 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          How to Get Your Driver’s License
        </h2>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {licenseSteps.map((step, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#0A2E57] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#071d3e] transition">
            Start License Application
          </button>
        </div>
      </section>

      {/* 🟩 CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-900 to-yellow-600 py-16 px-6 lg:px-20 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Get Behind the Wheel?
          </h2>
          <p className="mb-6 text-gray-100">
            Join hundreds of successful drivers who trained with Belt Driving
            School. Enroll today and start your journey to becoming a licensed,
            confident driver.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Join Now
          </button>
        </div>
      </section>
    </Homelayouts>
  );
};

export default DrivingTraining;

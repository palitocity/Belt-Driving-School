import React from "react";
import Homelayouts from "../layouts/Homelayouts";
import Image from "next/image";

const AboutUs = () => {
  const partners = [
    {
      name: "AutoMaster Academy",
      logo: "",
      description: "A trusted partner in advanced vehicle training programs.",
    },
    {
      name: "DrivePro Institute",
      logo: "",
      description: "Experts in safe driving and road awareness campaigns.",
    },
    {
      name: "CityAuto Garage",
      logo: "",
      description:
        "Providing our students with hands-on car maintenance sessions.",
    },
  ];

  const team = [
    {
      name: "John Ade",
      role: "Lead Instructor",
      image: "",
    },
    {
      name: "Mary Bello",
      role: "Admin & Student Support",
      image: "",
    },
    {
      name: "Samuel Obi",
      role: "Driving Coach",
      image: "",
    },
  ];

  return (
    <Homelayouts>
      {/* 🟦 About Intro Section */}
      <section className="bg-gradient-to-br mt-20 from-blue-50 via-white to-yellow-50 py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
            About <span className="text-yellow-500">Belt Driving School</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At{" "}
            <span className="font-semibold text-yellow-500">
              Belt Driving School
            </span>
            , we help learners become safe, confident, and responsible drivers.
            With expert instructors, modern cars, and flexible schedules, our
            goal is to make your driving journey easy and enjoyable.
          </p>
        </div>
      </section>

      {/* 🟨 Our Partners Section */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Our Trusted Partners
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={24}
                height={24}
                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-blue-800 mb-2">
                {partner.name}
              </h4>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🟩 Our Team Section */}
      <section className="bg-gray-50 py-20 px-6 lg:px-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Meet Our Team
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={24}
                height={24}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-blue-900">
                {member.name}
              </h4>
              <p className="text-gray-500 text-sm mb-2">{member.role}</p>
              <div className="flex justify-center space-x-3">
                <span className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                  LinkedIn
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-yellow-500 hover:text-yellow-600 cursor-pointer text-sm">
                  Message
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟦 Why Choose Us Section */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Why Choose Us
        </h3>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10 text-gray-700">
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-bold text-blue-900 mb-2">
              Certified Instructors
            </h4>
            <p>
              Learn from experienced, certified professionals dedicated to your
              success.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-bold text-yellow-700 mb-2">
              Affordable Packages
            </h4>
            <p>
              Choose from flexible and affordable plans that suit your learning
              goals.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-bold text-blue-900 mb-2">
              Modern Vehicles
            </h4>
            <p>
              Train with the latest, well-maintained vehicles equipped for
              safety and comfort.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-bold text-yellow-700 mb-2">
              Flexible Schedule
            </h4>
            <p>
              Learn at your own pace with flexible class times that fit your
              lifestyle.
            </p>
          </div>
        </div>
      </section>
    </Homelayouts>
  );
};

export default AboutUs;

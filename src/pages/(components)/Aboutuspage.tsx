import React from "react";

const teamMembers = [
  {
    name: "Mr. Adewale Johnson",
    role: "Founder & Chief Instructor",
    image: "/images/team1.jpg",
    bio: "Over 10 years of professional driving experience and safety instruction.",
  },
  {
    name: "Mrs. Sarah Oladipo",
    role: "Student Coordinator",
    image: "/images/team2.jpg",
    bio: "Dedicated to ensuring every student has a smooth and rewarding learning experience.",
  },
  {
    name: "Mr. Tunde Balogun",
    role: "Technical Instructor",
    image: "/images/team3.jpg",
    bio: "Expert in both manual and automatic driving training with advanced road safety certification.",
  },
  {
    name: "Miss Anita Bello",
    role: "Customer Support Manager",
    image: "/images/team4.jpg",
    bio: "Focused on delivering the best support and guidance to all our students and partners.",
  },
];

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Belt Driving School</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Building confident, skilled, and responsible drivers through excellence in education and modern training.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg">
          At Belt Driving School, our mission is to provide top-quality driving education that ensures every student becomes a safe, confident, and responsible driver. We believe that driving is not just a skill, but a lifelong responsibility that requires discipline and awareness.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">Meet Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-700"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
              <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision / Values */}
      <section className="py-16 px-6 md:px-20 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-lg">
          To become the leading driving institution in Nigeria, shaping the future of road safety and creating a new generation of disciplined drivers.
        </p>
      </section>
    </div>
  );
}

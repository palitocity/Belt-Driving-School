"use client";
import React from "react";

const testimonials = [
  {
    name: "Aisha K.",
    message:
      "Belt Driving School gave me the confidence I needed to pass my test. The instructors were patient and professional!",
    location: "Ibadan, Oyo State",
  },
  {
    name: "Michael O.",
    message:
      "The process was smooth and easy. They helped me get my driver’s license within days. Highly recommend!",
    location: "Ifo, Ogun State",
  },
  {
    name: "Grace E.",
    message:
      "I loved the flexible training hours. I could attend lessons after work and still complete my training in 3 weeks.",
    location: "Ondo, Ondo State",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-blue-50 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-12">
          What Our Students Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimony, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">"{testimony.message}"</p>
              <h4 className="font-semibold text-blue-800">
                {testimony.name}
              </h4>
              <p className="text-sm text-gray-500">{testimony.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

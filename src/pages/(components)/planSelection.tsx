import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Beginner Driving Course",
    price: "₦45,000",
    duration: "2 Weeks",
    description: "Perfect for first-time learners who want to understand the basics of driving safely and confidently.",
    features: [
      "15 practical driving sessions",
      "Basic traffic rules & safety",
      "Vehicle control fundamentals",
      "Intro to road signs and symbols"
    ],
    highlight: false
  },
  {
    id: 2,
    name: "Intermediate Driving Course",
    price: "₦65,000",
    duration: "3 Weeks",
    description: "Ideal for learners with basic experience who want to enhance driving skills and confidence.",
    features: [
      "20 driving sessions",
      "Advanced turning & parking",
      "Defensive driving techniques",
      "Real road test simulation"
    ],
    highlight: true
  },
  {
    id: 3,
    name: "Advanced Driving Course",
    price: "₦85,000",
    duration: "4 Weeks",
    description: "For experienced drivers looking to master highway driving, night driving, and safety performance.",
    features: [
      "25 expert sessions",
      "Night driving experience",
      "Emergency handling",
      "Certificate of completion"
    ],
    highlight: false
  },
  {
    id: 4,
    name: "Hire a Professional Driver",
    price: "₦100,000",
    duration: "1 Month",
    description: "Hire a certified, professional driver trained by Belt Driving School for your personal or business needs.",
    features: [
      "Verified and trained driver",
      "Flexible duration options",
      "Background checked",
      "Available across all states"
    ],
    highlight: false
  }
];

const PlanSection = () => {
  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B2545] mb-4">
          Our Driving Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a plan that fits your driving goals. Whether you're learning to drive, improving your skills, or hiring a professional driver — we’ve got you covered.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 ${
              plan.highlight
                ? "bg-[#0B2545] text-white border-2 border-yellow-400"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  plan.highlight ? "text-yellow-400" : "text-[#0B2545]"
                }`}
              >
                {plan.name}
              </h3>
              <p className="text-sm mb-4">{plan.description}</p>
              <p
                className={`text-3xl font-bold mb-1 ${
                  plan.highlight ? "text-yellow-400" : "text-[#0B2545]"
                }`}
              >
                {plan.price}
              </p>
              <p className="text-sm mb-4 opacity-80">Duration: {plan.duration}</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle
                      size={18}
                      className={`${
                        plan.highlight ? "text-yellow-400" : "text-[#0B2545]"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-3 mt-auto rounded-xl font-semibold transition ${
                plan.highlight
                  ? "bg-yellow-400 text-[#0B2545] hover:bg-yellow-300"
                  : "bg-[#0B2545] text-white hover:bg-[#1D3557]"
              }`}
            >
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlanSection;

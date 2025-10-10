import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  highlight?: boolean;
  features: string[];
}

const PlanSection = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const getAllPlans = async () => {
    try {
      const res = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/auth/plans"
      );
      setPlans(res.data as Plan[]);
      console.log(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B2545] mb-4">
          Our Driving Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a plan that fits your driving goals. Whether you&lsquo;re
          learning to drive, improving your skills, or hiring a professional
          driver — we’ve got you covered.
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
                ₦{plan.price}
              </p>
              <p className="text-sm mb-4 opacity-80">
                Duration: {plan.duration}
              </p>

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

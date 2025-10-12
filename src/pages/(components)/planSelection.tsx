"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

interface Plan {
  _id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  overview: string;
  features: string[];
  highlight?: boolean;
}

const PlanSection = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);

  const getAllPlans = async () => {
    try {
      const res = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/auth/plans"
      );
      setPlans(res.data as Plan[]);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        toast.error(msg || "Failed to load plans");
      }
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const getPlanById = async (planId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://belt-driving-school-backend-3.onrender.com/api/auth/plan/${planId}`
      );
      setSelectedPlan(response.data.plan);
    } catch (error) {
      toast.error("Failed to load plan details");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B2545] mb-4">
          Our Driving Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a plan that fits your driving goals. Whether you’re learning to
          drive, improving your skills, or hiring a professional driver — we’ve
          got you covered.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plans.map((plan) => (
          <motion.div
            key={plan._id}
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
              onClick={() => getPlanById(plan._id)}
              className={`w-full py-3 mt-auto rounded-xl font-semibold transition ${
                plan.highlight
                  ? "bg-yellow-400 text-[#0B2545] hover:bg-yellow-300"
                  : "bg-[#0B2545] text-white hover:bg-[#1D3557]"
              }`}
            >
              View Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>

              {!loading && selectedPlan && (
                <>
                  <h3 className="text-2xl font-bold text-[#0B2545] mb-2">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {selectedPlan.description}
                  </p>
                  <p className="text-gray-600 mb-3 font-extrabold">
                    {selectedPlan.overview}
                  </p>
                  <p className="text-lg font-semibold text-[#E02828] mb-1">
                    ₦{selectedPlan.price}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Duration: {selectedPlan.duration}
                  </p>

                  {/* Safe feature rendering */}
                  {Array.isArray(selectedPlan.features) &&
                  selectedPlan.features.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedPlan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle
                            size={16}
                            className="text-green-600 flex-shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      No features listed
                    </p>
                  )}

                  <button className="w-full mt-6 py-3 bg-[#0B2545] text-white font-semibold rounded-xl hover:bg-[#E02828] transition">
                    Continue with this Plan
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PlanSection;

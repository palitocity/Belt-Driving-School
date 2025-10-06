"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";
import StudentLayouts from "../layouts/Studentlayout";

const AllPlans = () => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // ✅ Demo plans data
  const plans = [
    {
      id: "basic",
      name: "Basic Driving",
      description:
        "Perfect for beginners. Learn the fundamentals of driving, road rules, and safety.",
      price: "₦25,000",
      duration: "2 weeks",
      lessons: 10,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "intermediate",
      name: "Intermediate Driving",
      description:
        "Enhance your driving confidence with more practice sessions and real-road experience.",
      price: "₦40,000",
      duration: "4 weeks",
      lessons: 20,
      color: "bg-green-50 border-green-200",
    },
    {
      id: "advanced",
      name: "Advanced Driving",
      description:
        "For experienced learners. Learn advanced maneuvers, defensive driving, and highway control.",
      price: "₦60,000",
      duration: "6 weeks",
      lessons: 30,
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  // ✅ Function to activate a plan
  const handleActivatePlan = async (planId: string) => {
    try {
      setLoadingPlanId(planId);
      await axios.post(
        `/plans/activate/${planId}`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      toast.success("Plan activated successfully!");
    } catch (error) {
      toast.error("Failed to activate plan.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <StudentLayouts>
      <Head>
        <title>Driving School | All Plans</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0A2E57] mb-8">
            Choose Your Driving Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border ${plan.color} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
              >
                <h3 className="text-xl font-semibold text-[#0A2E57] mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="space-y-1 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Duration:</strong> {plan.duration}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Lessons:</strong> {plan.lessons}
                  </p>
                  <p className="text-[#E02828] font-semibold text-lg">
                    {plan.price}
                  </p>
                </div>

                <button
                  onClick={() => handleActivatePlan(plan.id)}
                  disabled={loadingPlanId === plan.id}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-medium transition ${
                    loadingPlanId === plan.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#E02828] hover:bg-red-700"
                  }`}
                >
                  {loadingPlanId === plan.id ? (
                    "Activating..."
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" /> Activate Plan
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Note / Info Section */}
          <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 text-gray-600 text-sm">
            <p>
              ⚠️ Once you activate a plan, it becomes your{" "}
              <strong>Active Plan</strong>. You can view your current plan
              progress and instructor details in the{" "}
              <a
                href="/student/plans/active-plan"
                className="text-[#E02828] font-medium hover:underline"
              >
                Active Plan
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default AllPlans;

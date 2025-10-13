/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import StudentLayouts from "../layouts/Studentlayout";
import Head from "next/head";
import axios, { isAxiosError } from "axios";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const AllPlans = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<any>(null);

  // ✅ Load Student from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setStudent(parsedUser);
          console.log("✅ Student loaded:", parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // ✅ Fetch All Plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          "http://api.beltdrivingschool.com/api/auth/plans"
        );
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // ✅ Join Plan (Send student + plan data)
  const handleJoinPlan = async (plan: any) => {
    if (!student) {
      toast.error("Student not found. Please log in again.");
      return;
    }

    const orderData = {
      planName: plan.name,
      price: plan.price,
      currency: "NGN",
      userId: student.id || student._id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      address: student.address || "N/A",
    };

    console.log("📦 Order Data Sent:", orderData);

    setActivating(plan._id);
    try {
      const res = await axios.post(
        `http://api.beltdrivingschool.com/api/orders/${plan._id}`, // ✅ planId in params
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`You successfully joined the ${plan.name} plan!`);
      console.log("✅ Order Success:", res.data);
    } catch (err) {
      console.error("Order error:", err);
      if (isAxiosError(err)) {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to join plan. Try again.";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } finally {
      setActivating(null);
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <StudentLayouts>
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading plans...</span>
        </div>
      </StudentLayouts>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <StudentLayouts>
        <div className="text-center text-red-500 py-10">{error}</div>
      </StudentLayouts>
    );
  }

  // ✅ UI
  return (
    <StudentLayouts>
      <Head>
        <title>All Plans - Belt Driving School</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Available Training Plans
        </h1>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className={`relative bg-white rounded-2xl shadow-md border ${
                  plan.highlight
                    ? "border-green-500 ring-2 ring-green-400"
                    : "border-gray-100"
                } p-6 hover:shadow-xl transition-all duration-300`}
              >
                {plan.highlight && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-500 mb-2">{plan.duration}</p>

                <p className="text-green-600 text-3xl font-bold mb-3">
                  ₦{Number(plan.price).toLocaleString()}
                </p>

                <p className="text-gray-600 text-sm mb-5">
                  {plan.description || "No description provided."}
                </p>

                {plan.features && plan.features.length > 0 && (
                  <ul className="mb-5 space-y-2">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  disabled={activating === plan._id}
                  onClick={() => handleJoinPlan(plan)}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    activating === plan._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {activating === plan._id ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    "Join Plan"
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No plans available.
            </div>
          )}
        </div>
      </div>
    </StudentLayouts>
  );
};

export default AllPlans;

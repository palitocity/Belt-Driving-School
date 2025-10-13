/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Loader2, CalendarDays, CreditCard, Clock } from "lucide-react";
import toast from "react-hot-toast";
import StudentLayouts from "../layouts/Studentlayout";
import axios, { isAxiosError } from "axios";

const ActivePlan = () => {
  const [activePlan, setActivePlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  // ✅ Get student ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.id || parsedUser._id) {
          setStudentId(parsedUser.id || parsedUser._id);
          console.log("✅ Student ID found:", parsedUser.id || parsedUser._id);
        } else {
          console.warn("⚠️ No student ID found in localStorage user object");
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // ✅ Fetch Active Plan from API
  useEffect(() => {
    if (!studentId) return;

    const fetchActivePlan = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://api.beltdrivingschool.com/api/user/activity/plan/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("✅ Fetched Active Plan:", res.data);
        setActivePlan(res.data.currentPlan);
      } catch (error) {
        console.error("❌ Fetch error:", error);
        if (isAxiosError(error)) {
          const msg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to fetch active plan";
          toast.error(msg);
        } else {
          toast.error("Something went wrong. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, [studentId]);

  return (
    <StudentLayouts>
      <Head>
        <title>Active Plan - Belt Driving School</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0A2E57] mb-8 text-center">
            Active Training Plan
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="animate-spin text-[#E02828] w-8 h-8" />
            </div>
          ) : activePlan ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-[#0A2E57] mb-2">
                  Current Plan Details
                </h2>
                <p className="text-sm text-gray-500">
                  Here’s your currently active driving plan information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Plan Amount</p>
                    <p className="font-medium text-gray-800">
                      ₦{activePlan.planAmount?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.durationMonths
                        ? `${activePlan.durationMonths} month${
                            activePlan.durationMonths > 1 ? "s" : ""
                          }`
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Currency</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.planCurrency || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  className="bg-[#E02828] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
                  onClick={() =>
                    toast.success("Feature coming soon: View Lesson Schedule")
                  }
                >
                  View Lesson Schedule
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600">
              <p>No active plan found.</p>
              <a
                href="/student/all-plans"
                className="text-[#E02828] font-semibold mt-2 inline-block"
              >
                Browse Plans
              </a>
            </div>
          )}
        </div>
      </div>
    </StudentLayouts>
  );
};

export default ActivePlan;

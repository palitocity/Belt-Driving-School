/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Car, User, CalendarDays, PhoneCall, Loader2 } from "lucide-react";
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
        if (parsedUser.id) {
          setStudentId(parsedUser.id);
          console.log("Student ID found:", parsedUser.id);
        } else {
          console.warn("No student ID found in localStorage user object");
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
          `https://belt-driving-school-backend-3.onrender.com/api/user/activity/plan/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Fetched Active Plan:", res.data);
        setActivePlan(res.data.plan);
      } catch (error) {
        if (isAxiosError(error)) {
          const apiMsg = error.response?.data?.message;
          const apiErr = error.response?.data?.error;
          const fallback = error.message || "An unexpected error occurred";
          const errorMsg =
            `${apiMsg || ""}${apiErr ? " - " + apiErr : ""}`.trim() || fallback;

          toast.error(errorMsg);
        }

        // 🧪 Demo fallback
        setActivePlan({
          name: "Intermediate Driving",
          duration: "4 weeks",
          lessons: 20,
          completedLessons: 8,
          instructor: {
            name: "Mr. James Obi",
            phone: "+234 802 456 7812",
          },
          startDate: "2025-09-15",
          nextLesson: "2025-10-08",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, [studentId]);

  // ✅ Progress calculator
  const calculateProgress = () => {
    if (!activePlan) return 0;
    return Math.round((activePlan.completedLessons / activePlan.lessons) * 100);
  };

  return (
    <StudentLayouts>
      <Head>
        <title>Driving School | Active Plan</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0A2E57] mb-8">
            Active Driving Plan
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="animate-spin text-[#E02828] w-8 h-8" />
            </div>
          ) : activePlan ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0A2E57]">
                    {activePlan.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Duration: {activePlan.duration}
                  </p>
                </div>
                <div className="text-[#E02828] font-semibold text-lg mt-3 md:mt-0">
                  In Progress 🚗
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    {activePlan.completedLessons} of {activePlan.lessons}{" "}
                    lessons completed
                  </span>
                  <span>{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#E02828] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Instructor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <User className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.instructor?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.instructor?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lesson Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.startDate
                        ? new Date(activePlan.startDate).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 flex items-center gap-3">
                  <Car className="w-5 h-5 text-[#E02828]" />
                  <div>
                    <p className="text-sm text-gray-500">Next Lesson</p>
                    <p className="font-medium text-gray-800">
                      {activePlan.nextLesson
                        ? new Date(activePlan.nextLesson).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#E02828] text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                  View Lesson Schedule
                </button>
                <button className="bg-[#0A2E57] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#071d3e] transition">
                  Contact Instructor
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

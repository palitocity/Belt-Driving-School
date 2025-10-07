/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import StudentLayouts from "../layouts/Studentlayout";
import { toast } from "react-hot-toast";

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/user/activity/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDashboardData(res.data);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <StudentLayouts>
        <div className="p-6 text-center text-gray-600">Loading...</div>
      </StudentLayouts>
    );
  }

  const student = dashboardData;
  const enrollmentDate = new Date(
    student?.studentDetails?.enrollmentDate
  ).toLocaleDateString();
  const progress = student?.studentDetails?.progress || 0;
  const instructor = student?.studentDetails?.assignedInstructor;

  return (
    <StudentLayouts>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Welcome Back, {student?.fullName || "Student"}!
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Email</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              {student?.email}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Phone</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              {student?.phone}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Enrollment Date</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              {enrollmentDate}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[#0A2E57] mb-3">
            Course Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#E02828] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-600 text-sm">
            You’ve completed{" "}
            <span className="font-semibold text-[#E02828]">{progress}%</span> of
            your course.
          </p>
        </div>

        {/* Instructor / Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assigned Instructor */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#0A2E57] mb-3">
              Assigned Instructor
            </h3>
            {instructor ? (
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-[#E02828]">Name:</span>{" "}
                  {instructor.fullName}
                </p>
                <p>
                  <span className="font-medium text-[#E02828]">Email:</span>{" "}
                  {instructor.email}
                </p>
                <p>
                  <span className="font-medium text-[#E02828]">Phone:</span>{" "}
                  {instructor.phone}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                No instructor has been assigned to you yet.
              </p>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#0A2E57] mb-3">
              Recent Transactions
            </h3>
            {student?.transactions?.length > 0 ? (
              <ul className="text-gray-600 text-sm space-y-2">
                {student.transactions.map((tx: any, i: number) => (
                  <li key={i}>
                    💳 {tx.type} - ₦{tx.amount} ({tx.status})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">
                You have no transactions yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default StudentDashboard;

import React from "react";
import StudentLayouts from "../layouts/Studentlayout";

const StudentDashboard = () => {
  return (
    <StudentLayouts>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Welcome Back!
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Program</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              Basic Driving Course
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Next Class</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              12 Oct, 2025 @ 10:00AM
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#E02828]">
            <h3 className="text-gray-500 text-sm">Instructor</h3>
            <p className="text-xl font-semibold text-[#0A2E57]">
              Mr. David Johnson
            </p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#0A2E57] mb-4">
            Recent Activities
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>✅ Completed Lesson 4: Traffic Signs</li>
            <li>✅ Passed Practice Test #1</li>
            <li>📅 Scheduled next class with Instructor</li>
          </ul>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default StudentDashboard;

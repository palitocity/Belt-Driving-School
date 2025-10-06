import React from "react";
import StudentLayouts from "../layouts/Studentlayout";

const Progress = () => {
  return (
    <StudentLayouts>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Your Progress
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-[#E02828] mb-4">
            Basic Driving Program
          </h3>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-600 mb-2">Theory Lessons</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#E02828] h-3 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Practical Sessions</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#E02828] h-3 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Final Assessment</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#E02828] h-3 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-5">
            You’ve completed{" "}
            <span className="font-semibold text-[#E02828]">60%</span> of your
            training!
          </p>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default Progress;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import StudentLayouts from "../layouts/Studentlayout";
import { toast } from "react-hot-toast";

const Progress = () => {
  const [progress, setProgress] = useState<any>(null);

  const getProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://api.beltdrivingschool.com/api/user/activity/progress",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProgress(res.data);
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
    getProgress();
  }, []);

  if (!progress) {
    return (
      <StudentLayouts>
        <div className="p-6 text-center text-gray-600">Loading progress...</div>
      </StudentLayouts>
    );
  }

  const totalProgress = progress?.totalPercentage || 0;

  return (
    <StudentLayouts>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Your Progress
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-[#E02828] mb-4">
            {progress.programName || "Driving Program"}
          </h3>

          {progress.sections?.map((section: any, i: number) => (
            <div key={i} className="mb-5">
              <p className="text-sm text-gray-600 mb-2">{section.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#E02828] h-3 rounded-full"
                  style={{ width: `${section.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}

          <p className="text-center text-gray-600 text-sm mt-5">
            You’ve completed{" "}
            <span className="font-semibold text-[#E02828]">
              {totalProgress}%
            </span>{" "}
            of your training!
          </p>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default Progress;

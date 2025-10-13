/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import StudentLayouts from "../layouts/Studentlayout";
import Head from "next/head";
import Image from "next/image";
import axios, { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Mail, Phone, MapPin, User, Car, CreditCard } from "lucide-react";

const UserProfile = () => {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://api.beltdrivingschool.com/api/user/activity/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudent(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading)
    return (
      <StudentLayouts>
        <div className="flex justify-center items-center h-[70vh] text-gray-500 animate-pulse">
          Loading student profile...
        </div>
      </StudentLayouts>
    );

  if (!student)
    return (
      <StudentLayouts>
        <div className="p-10 text-center text-gray-600">
          No student data found.
        </div>
      </StudentLayouts>
    );

  const details = student.studentDetails || {};
  const instructor = details.assignedInstructor || {};

  return (
    <StudentLayouts>
      <Head>
        <title>{student.fullName} | Profile</title>
      </Head>

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Profile
          </h1>
          <button className="px-4 py-2 text-sm bg-[#0A2540] text-white rounded-lg hover:bg-[#153a63] transition">
            Edit Profile
          </button>
        </div>

        {/* Profile Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#0A2540]/10">
            <Image
              src={student.profilePic || ""}
              alt={student.fullName}
              width={120}
              height={120}
              className="object-cover"
            />
          </div>

          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold text-gray-800">
              {student.fullName}
            </h2>
            <p className="text-gray-500 text-sm mb-3 capitalize">
              Role: {student.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <Mail size={15} /> {student.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} /> {student.phone}
              </p>
              <p className="flex items-center gap-2">
                <User size={15} /> {details.gender || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} /> {student.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Course + Plan Details */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Course Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Car size={18} className="text-[#0A2540]" /> Training Information
            </h3>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Instructor:</strong>{" "}
                {instructor.fullName || "Not Assigned"}
              </p>
              <p>
                <strong>Instructor Phone:</strong> {instructor.phone || "N/A"}
              </p>
              <p>
                <strong>Instructor Email:</strong> {instructor.email || "N/A"}
              </p>
              <p>
                <strong>Enrollment Date:</strong>{" "}
                {details.enrollmentDate
                  ? new Date(details.enrollmentDate).toLocaleDateString()
                  : "Not available"}
              </p>
              <p>
                <strong>Duration:</strong> {details.durationMonths || 0} months
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    details.progress < 100
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {details.progress < 100 ? "Ongoing" : "Completed"}
                </span>
              </p>
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-[#0A2540]" /> Plan Details
            </h3>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Plan Amount:</strong>{" "}
                {details.planAmount
                  ? `${details.planCurrency} ${details.planAmount}`
                  : "N/A"}
              </p>
              <p>
                <strong>Currency:</strong> {details.planCurrency || "NGN"}
              </p>
              <p>
                <strong>Progress:</strong> {details.progress || 0}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#0A2540] h-3 rounded-full transition-all"
                  style={{ width: `${details.progress || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Feedback */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Instructor’s Feedback
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {student.feedback ||
              "Instructor feedback will appear here once provided."}
          </p>
        </div>
      </div>
    </StudentLayouts>
  );
};

export default UserProfile;

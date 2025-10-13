/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InstructorLayouts from "../layouts/Instructorlayout";
import Head from "next/head";
import person from "../../../assets/blank-profile-picture.webp";
import axios from "axios";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  IdCard,
  Calendar,
  Award,
  Edit3,
} from "lucide-react";

interface InstructorProfile {
  id?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  address?: string;
  licenseNumber?: string;
  experience?: string;
  createdAt?: string;
}

const InstructorProfile = () => {
  const [instructorId, setInstructorId] = useState<string | null>(null);
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<InstructorProfile>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setInstructorId(parsedUser.id); // ✅ extract only the id
        console.log("Instructor ID:", parsedUser.id);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `http://api.beltdrivingschool.com/api/instructor/dashboard/profile/${instructorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (instructorId) {
      getProfile();
    }
  }, [instructorId]);

  const updateProfile = async () => {
    if (!instructorId) return;
    try {
      const res = await axios.put(
        `http://api.beltdrivingschool.com/api/instructor/dashboard/profile/${instructorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <InstructorLayouts>
        <div className="flex justify-center items-center h-[70vh] text-gray-500 animate-pulse">
          Loading profile...
        </div>
      </InstructorLayouts>
    );

  if (!profile)
    return (
      <InstructorLayouts>
        <div className="p-10 text-center text-gray-600">
          No profile data found.
        </div>
      </InstructorLayouts>
    );

  return (
    <InstructorLayouts>
      <Head>
        <title>Instructor Profile - Belt Driving School</title>
      </Head>

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Instructor Profile
          </h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#153a63] transition"
            >
              <Edit3 size={16} /> Edit
            </button>
          ) : (
            <button
              onClick={updateProfile}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#0A2540]/10">
            <Image
              src={person || ""}
              alt="Instructor Avatar"
              width={120}
              height={120}
              className="object-cover"
            />
          </div>

          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">
              {profile.fullname}
            </h2>
            <p className="text-gray-500 text-sm mb-3">
              Professional Driving Instructor
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <Mail size={15} />{" "}
                {editing ? (
                  <input
                    type="text"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  profile.email
                )}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} />{" "}
                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  profile.phone
                )}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} />{" "}
                {editing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  profile.address || "Not provided"
                )}
              </p>
              <p className="flex items-center gap-2">
                <IdCard size={15} /> License No:{" "}
                {editing ? (
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  profile.licenseNumber
                )}
              </p>
              <p className="flex items-center gap-2">
                <Award size={15} /> Experience:{" "}
                {editing ? (
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  `${profile.experience} years`
                )}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={15} /> Joined:{" "}
                {new Date(profile.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-3">About Instructor</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {profile.fullname} is a certified driving instructor at Belt Driving
            School, with {profile.experience} years of experience helping
            students become safe, confident, and licensed drivers. This profile
            reflects the instructor’s official records, contact information, and
            license details.
          </p>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Profile Summary</h3>
          <p className="text-gray-600 text-sm">
            Instructor ID:{" "}
            <span className="font-semibold text-[#0A2540]">
              {instructorId?.slice(0, 8) || "N/A"}
            </span>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Profile last updated:{" "}
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </InstructorLayouts>
  );
};

export default InstructorProfile;

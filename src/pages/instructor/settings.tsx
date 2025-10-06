import React, { useEffect, useState } from "react";
import Instructorlayouts from "../layouts/Instructorlayout";
import Head from "next/head";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Award,
  TrendingUp,
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

const Settings = () => {
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<InstructorProfile>({});
  const [instructorId, setInstructorId] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Access localStorage safely here
    const storedId = localStorage.getItem("instructorId");
    setInstructorId(storedId);
  }, []);

  useEffect(() => {
    if (!instructorId) return;

    const getProfile = async () => {
      try {
        const res = await axios.get(
          `https://belt-driving-school.vercel.app/api/instructor/profile/${instructorId}`,
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

    getProfile();
  }, [instructorId]);

  const updateProfile = async () => {
    if (!instructorId) return;

    try {
      const res = await axios.put(
        `https://belt-driving-school.vercel.app/api/instructor/profile/${instructorId}`,
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

  if (loading) {
    return (
      <Instructorlayouts>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500 text-lg">Loading profile...</div>
        </div>
      </Instructorlayouts>
    );
  }

  return (
    <Instructorlayouts>
      <Head>
        <title>Instructor Settings</title>
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm mt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Profile Settings
        </h2>

        {!editing ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-blue-500" />
              <p className="text-gray-700 font-medium">
                {profile?.fullname || "N/A"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-green-500" />
              <p className="text-gray-700">{profile?.email || "N/A"}</p>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="text-purple-500" />
              <p className="text-gray-700">{profile?.phone || "N/A"}</p>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="text-red-500" />
              <p className="text-gray-700">{profile?.address || "N/A"}</p>
            </div>

            <div className="flex items-center space-x-3">
              <Award className="text-yellow-500" />
              <p className="text-gray-700">
                License: {profile?.licenseNumber || "N/A"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <TrendingUp className="text-indigo-500" />
              <p className="text-gray-700">
                Experience: {profile?.experience || "N/A"} years
              </p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 flex items-center px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
            >
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullname || ""}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="License Number"
              value={formData.licenseNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, licenseNumber: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Experience (years)"
              value={formData.experience || ""}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-md"
            />

            <div className="flex space-x-3">
              <button
                onClick={updateProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Instructorlayouts>
  );
};

export default Settings;

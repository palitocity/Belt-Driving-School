/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { Camera, Save, Loader2 } from "lucide-react";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(profile);

  const [admin, setadmin] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setadmin(parsedUser);
          console.log("✅ Student loaded:", parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (admin?.id) {
      getAdmin();
    }
  }, [admin]);

  const getAdmin = async () => {
    if (!admin?.id) return;
    try {
      const res = await axios.get(
        `https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/admin/profile/${admin.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data.admin);
      setFormData({
        fullName: res.data.fullName || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        password: "",
      });
      setPreview(res.data.content.user.profileImage?.url || null);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    }
  };

  // ✅ Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (image) data.append("profileImage", image);

      const res = await axios.put("/users/update-profile", data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);

      toast.success("Profile updated successfully!");
      getAdmin();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update profile";
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Adminlayouts>
      <Head>
        <title>Settings | Belt Driving School</title>
      </Head>

      <div className="w-full min-h-screen p-6 bg-gray-50 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-[#0A2E57] mb-4">
            Account Settings
          </h2>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#0A2E57] shadow-sm">
              <Image
                src={preview || "/default-avatar.png"}
                alt="Profile"
                width={120}
                height={120}
                className="object-cover"
              />
              <label className="absolute bottom-1 right-1 bg-[#0A2E57] p-2 rounded-full cursor-pointer hover:bg-[#E02828] transition">
                <Camera color="#fff" size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Click camera to change profile picture
            </p>
          </div>

          {/* Account Info Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName || profile?.fullName || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2E57]"
                type="text"
                placeholder="Enter your full name"
                readOnly={true}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email || profile?.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2E57]"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                name="email"
                value={formData.phone || profile?.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2E57]"
                type="text"
                placeholder="Enter your phone Number"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2E57]"
                type="password"
                placeholder="Enter new password (optional)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-[#E02828] hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </form>

          {/* Display current profile info */}
          {profile && (
            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-medium text-[#0A2E57] mb-3">
                Current Info
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {profile.fullName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Role:</strong> {profile.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Settings;

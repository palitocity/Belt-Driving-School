import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import StudentLayouts from "../layouts/Studentlayout";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://api.beltdrivingschool.com/api/user/activity/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData(res.data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://api.beltdrivingschool.com/api/user/activity/update-profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!");
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
    getProfile();
  }, []);

  return (
    <StudentLayouts>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Update Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md max-w-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E02828]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E02828]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E02828]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Leave blank to keep current"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E02828]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E02828] text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </StudentLayouts>
  );
};

export default Profile;

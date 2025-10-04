/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/auth/forgot-password",
        formData
      );
      toast.success(response.data.message || "Password reset link sent!");
      console.log("Reset URL:", response.data.resetUrl); // for debugging
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-red-400 focus:outline-none"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-red-400 focus:outline-none"
              required
            >
              <option value="user">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Sending..." : "Request Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

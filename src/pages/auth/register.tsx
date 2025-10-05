"use client";
import React, { useState } from "react";
import Head from "next/head";
import axios, { isAxiosError } from "axios";

import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { ArrowLeft } from "lucide-react";

const GoBackNav = ({ label = "Back" }: { label?: string }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-2 cursor-pointer mb-6 text-[#0A2E57] hover:text-[#E02828] transition font-medium"
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </div>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/auth/register",
        {
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        }
      );

      toast.success(res.data.message || "Registration successful!");
      router.push("/auth/verifyemail");

      localStorage.setItem("token", res.data.token);

      // reset form
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
        setMessage(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register - Belt Driving School</title>
      </Head>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 my-12">
          <GoBackNav label="Go Back" />
          <h2 className="text-3xl font-extrabold text-[#0A2E57] mb-2 text-center">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join{" "}
            <span className="font-semibold text-[#E02828]">
              Belt Driving School
            </span>{" "}
            today 🚘
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
                placeholder="Enter a password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E02828] outline-none"
                placeholder="Re-enter your password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#E02828]"
              } text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Login link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="text-[#0A2E57] font-semibold hover:text-[#E02828]"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;

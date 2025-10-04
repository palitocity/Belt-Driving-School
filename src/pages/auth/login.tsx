"use client";
import React, { useState } from "react";
import Head from "next/head";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/auth/login",
        formData
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);

        toast.success("Login successful 🎉");

        setTimeout(() => {
          router.push("/admin/main");
        }, 1000);
      }
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Belt Driving School</title>
      </Head>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-[#0A2E57] mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login to{" "}
            <span className="font-semibold text-[#E02828]">
              Belt Driving School
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                placeholder="Enter your password"
                required
              />
              <div className="flex justify-end mt-2">
                <a
                  href="#"
                  className="text-xs text-[#0A2E57] hover:text-[#E02828] transition"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E02828] text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-[#0A2E57] font-semibold hover:text-[#E02828] transition"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

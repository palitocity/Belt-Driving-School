"use client";
import React, { useState } from "react";
import Head from "next/head";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const router = useRouter();

  // handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.beltdrivingschool.com/api/auth/confirm-email",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Email verified successfully!");
      setFormData({ email: "", code: "" });
      router.push("/auth/login");
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage =
          error.response?.data?.message || "Email verification failed.";
        toast.error(apiMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // resend verification code
  const handleResendCode = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first.");
      return;
    }

    setResending(true);
    try {
      const res = await axios.post(
        "https://api.beltdrivingschool.com/api/auth/resend-confirmation",
        {
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(
        res.data.message || "Verification code resent successfully!"
      );
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage =
          error.response?.data?.message ||
          "Failed to resend verification code.";
        toast.error(apiMessage);
      } else {
        toast.error("An unexpected error occurred while resending code.");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verify Email - Belt Driving School</title>
      </Head>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 my-12">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-[#0A2E57] mb-2 text-center">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the code sent to your email address 📩
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                placeholder="Enter your registered email"
              />
            </div>

            {/* Verification Code */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                placeholder="Enter the 6-digit code"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#E02828]"
              } text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Didn’t receive a code?{" "}
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-[#0A2E57] font-semibold hover:text-[#E02828] transition cursor-pointer"
            >
              {resending ? "Resending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const role = searchParams.get("role");

  useEffect(() => {
    if (!token || !role) {
      toast.error("Invalid or expired password reset link");
    }
  }, [token, role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://api.beltdrivingschool.com/api/auth/reset-password",
        {
          token,
          newPassword,
          role,
        }
      );
      toast.success(response.data.message || "Password reset successful!");

      // Redirect after success (e.g. to login page)
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center  bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-red-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

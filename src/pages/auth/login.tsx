"use client";
import React from "react";
import Head from "next/head";
const LoginForm = () => {
  return (
    <>
      <Head>
        <title>Login - Belt Driving School</title>
      </Head>
      <>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0A2E57] via-[#002147] to-[#0A2E57] px-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-[#0A2E57] mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Login to{" "}
              <span className="font-semibold text-[#E02828]">
                Belt Driving School
              </span>
            </p>

            {/* Form */}
            <form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E02828] focus:border-transparent transition"
                  placeholder="Enter your password"
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
              <button className="w-full bg-[#E02828] text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg">
                Login
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
              <a
                href="#"
                className="text-[#0A2E57] font-semibold hover:text-[#E02828] transition"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </>
    </>
  );
};

export default LoginForm;

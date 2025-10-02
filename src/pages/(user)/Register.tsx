"use client";
import React from "react";

const RegistrationForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-neutral">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Register</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter password"
            />
          </div>

          <button className="w-full bg-accent text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

"use client";
import React, { useState } from "react";

const PlanProcessingForm = () => {
  const [plan, setPlan] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Proceeding to payment for ${plan}`);
    // In real-world: redirect to payment gateway
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-neutral">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Choose Your Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Select a Plan
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="Basic Plan">Basic Plan - ₦50,000</option>
              <option value="Standard Plan">Standard Plan - ₦80,000</option>
              <option value="Premium Plan">Premium Plan - ₦120,000</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanProcessingForm;

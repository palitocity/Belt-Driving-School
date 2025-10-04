"use client";
import React, { useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import { Plus, MoreVertical, X } from "lucide-react";

const Plans = () => {
  const [plans, setPlans] = useState([
    {
      name: "Beginner Plan",
      description: "Covers basics of driving, road signs, and handling.",
      price: "$200",
      duration: "2 Weeks",
      status: "Active",
    },
    {
      name: "Intermediate Plan",
      description: "Highway driving, night driving, and defensive driving.",
      price: "$350",
      duration: "4 Weeks",
      status: "Active",
    },
    {
      name: "Advanced Plan",
      description: "Full license prep with real test simulations.",
      price: "$500",
      duration: "6 Weeks",
      status: "Inactive",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    status: "Active",
  });

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setPlans([...plans, newPlan]);
    setNewPlan({
      name: "",
      description: "",
      price: "",
      duration: "",
      status: "Active",
    });
    setIsModalOpen(false);
  };

  return (
    <Adminlayouts>
      <Head>
        <title>Training Plans</title>
      </Head>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Training Plans</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#0A2E57] text-white px-4 py-2 rounded-lg hover:bg-[#0c3a6e] transition"
          >
            <Plus className="w-4 h-4" />
            Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {plan.name}
                  </h3>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <p className="text-gray-800 font-semibold">{plan.price}</p>
                <p className="text-gray-500 text-sm">{plan.duration}</p>
              </div>
              <div className="mt-4">
                {plan.status === "Active" ? (
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New Plan</h2>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />
              <textarea
                placeholder="Description"
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />
              <input
                type="text"
                placeholder="Duration"
                value={newPlan.duration}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, duration: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />
              <select
                value={newPlan.status}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#0A2E57] text-white py-2 rounded-lg hover:bg-[#0c3a6e] transition"
              >
                Save Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </Adminlayouts>
  );
};

export default Plans;

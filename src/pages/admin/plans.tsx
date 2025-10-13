"use client";
import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import { Plus, X, Trash2, Loader2 } from "lucide-react";
import axios, { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

const Plans = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plans, setPlans] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    _id: string | null;
  }>({ open: false, _id: null });

  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    features: [""],
  });

  const handleAddFeature = () => {
    setNewPlan({ ...newPlan, features: [...newPlan.features, ""] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...newPlan.features];
    updated[index] = value;
    setNewPlan({ ...newPlan, features: updated });
  };

  const handleRemoveFeature = (index: number) => {
    const updated = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: updated });
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://api.beltdrivingschool.com/api/admin/dashboard/plans/add",
        newPlan,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Plan added successfully!");
      setPlans([...plans, res.data.plan || newPlan]);

      setNewPlan({
        name: "",
        description: "",
        price: "",
        duration: "",
        features: [""],
      });
      setIsModalOpen(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error adding plan");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllPlans = async () => {
    try {
      const response = await axios.get(
        "http://api.beltdrivingschool.com/api/admin/dashboard/plans",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPlans(response.data || []);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error fetching plans");
      }
    }
  };

  const handleDeletePlan = async () => {
    // // if (!deleteModal._id) return;
    // setLoading(true);

    console.log("Deleting plan with ID:", deleteModal._id);

    try {
      await axios.delete(
        `http://api.beltdrivingschool.com/api/admin/dashboard/plans/delete/${deleteModal._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Plan deleted successfully!");
      setPlans(plans.filter((plan) => plan._id !== deleteModal._id));
      setDeleteModal({ open: false, _id: null });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error deleting plan");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <Adminlayouts>
      <Head>
        <title>Training Plans</title>
      </Head>
      <Toaster position="top-right" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Training Plans</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#0A2E57] text-white px-4 py-2 rounded-lg hover:bg-[#0c3a6e] transition"
          >
            <Plus className="w-4 h-4" />
            Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              return (
                <div
                  key={plan._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5 relative group"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      setDeleteModal({ open: true, _id: plan._id })
                    }
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Plan Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {plan.duration}
                    </p>
                    <p className="text-xl font-bold text-[#0A2E57] mb-3">
                      ₦ {parseFloat(plan.price || 0).toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>

                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {plan.features?.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No plans available yet.
          </p>
        )}
      </div>

      {/* Add Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
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
                placeholder="Price (e.g. ₦85,000)"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g. 4 Weeks)"
                value={newPlan.duration}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, duration: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                required
              />

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Features
                </label>
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#0A2E57] outline-none"
                      required
                    />
                    {newPlan.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-[#0A2E57] text-sm mt-1 hover:underline"
                >
                  + Add Feature
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2E57] text-white py-2 rounded-lg hover:bg-[#0c3a6e] transition"
              >
                {loading ? "Saving..." : "Save Plan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center shadow-lg">
            <h3 className="text-lg font-bold mb-2">Delete Plan?</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this plan? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, _id: null })}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlan}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Adminlayouts>
  );
};

export default Plans;

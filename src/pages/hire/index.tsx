"use client";
import React, { useState } from "react";
import axios from "axios";
import Homelayouts from "../layouts/Homelayouts";
import Head from "next/head";
import toast from "react-hot-toast";

const DriverForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contractType: "",
    phone: "",
    email: "",
    note: "",
    driverType: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://api.beltdrivingschool.com/api/hire",
        formData
      );

      toast.success("Driver record submitted successfully!");
      console.log("Response:", res.data);
      setFormData({
        name: "",
        address: "",
        contractType: "",
        phone: "",
        email: "",
        note: "",
        driverType: "",
        duration: "",
      });
    } catch (err) {
      console.error("Error submitting driver data:", err);
      toast.error("Failed to submit driver record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Homelayouts>
      <Head>
        <title>Hire a Driver || Belt Driving</title>
      </Head>

      <section className="min-h-screen py-16 px-4 mt-12 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-[#E02828] to-[#c02121] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                PROFESSIONAL DRIVERS
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4 tracking-tight">
              Hire a Professional Driver
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get experienced, reliable drivers for your personal or corporate
              needs. Fill out the form below and we&lsquo;ll match you with the
              perfect driver.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            {/* Decorative Top Border */}
            <div className="h-2 bg-gradient-to-r from-[#0A2E57] via-[#E02828] to-[#0A2E57]"></div>

            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2E57] mb-6 flex items-center">
                    <span className="bg-[#E02828] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                      1
                    </span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-[#E02828]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-[#E02828]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-[#E02828]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address <span className="text-[#E02828]">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street, Lagos"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contract Details Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2E57] mb-6 flex items-center">
                    <span className="bg-[#E02828] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                      2
                    </span>
                    Contract Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Driver Type <span className="text-[#E02828]">*</span>
                      </label>
                      <select
                        name="driverType"
                        value={formData.driverType}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300 bg-white"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="private">Private</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contract Type <span className="text-[#E02828]">*</span>
                      </label>
                      <select
                        name="contractType"
                        value={formData.contractType}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300 bg-white"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Permanent">Permanent</option>
                      </select>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration (months){" "}
                        <span className="text-[#E02828]">*</span>
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g. 12"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#0A2E57] mb-6 flex items-center">
                    <span className="bg-[#E02828] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                      3
                    </span>
                    Additional Information
                  </h3>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requirements or Notes
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Tell us about any specific requirements, preferred working hours, or other details..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-32 resize-none focus:border-[#E02828] focus:ring-2 focus:ring-[#E02828]/20 focus:outline-none transition-all duration-200 group-hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-[#E02828] to-[#c02121] hover:from-[#c02121] hover:to-[#a01818] text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl font-bold text-[#E02828] mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">
                Professional Drivers
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl font-bold text-[#E02828] mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">
                Customer Support
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl font-bold text-[#E02828] mb-2">98%</div>
              <div className="text-sm text-gray-600 font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>
    </Homelayouts>
  );
};

export default DriverForm;

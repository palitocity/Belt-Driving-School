/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Dashboardlayouts from "../layouts/Homelayouts";
import axios from "axios";
import toast from "react-hot-toast";

const BookConsult = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.date
    ) {
      toast.error("Please fill in all required fields ⚠️");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/consult",
        formData
      );

      console.log("Consultation booked:", res.data);
      toast.success("Consultation booked successfully ✅");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        notes: "",
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to book consultation ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboardlayouts>
      <div className="w-full min-h-screen mt-12 flex flex-col items-center bg-[#F9FAFB] py-16 px-6">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Book a Consultation
          </h1>
          <p className="text-gray-500">
            Want to discuss your driving goals or training needs? Schedule a
            consultation with one of our certified instructors today.
          </p>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Enter your phone number"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Preferred Date
              </label>
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 mb-2 font-semibold">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                placeholder="What would you like to discuss?"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white px-8 py-3 rounded-xl font-semibold transition-all`}
              >
                {loading ? "Booking..." : "Book Consultation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default BookConsult;

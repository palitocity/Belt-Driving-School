import React from "react";
import Dashboardlayouts from "../layouts/Homelayouts";
const BookConsult = () => {
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
          <form className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Preferred Date
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 mb-2 font-semibold">Notes</label>
              <textarea
                rows={5}
                placeholder="What would you like to discuss?"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Book Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default BookConsult;

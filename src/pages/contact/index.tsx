import React from "react";
import Homelayouts from "../layouts/Homelayouts";

const ContactUs = () => {
  return (
    <Homelayouts>
      <div className="w-full min-h-screen flex flex-col items-center mt-15 bg-[#F9FAFB] py-16 px-6">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-500">
            Have a question or need assistance? Fill out the form below and our
            team will get back to you shortly.
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
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 mb-2 font-semibold">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p>📍 123 Learning Drive, Lagos, Nigeria</p>
          <p>📞 +234 080 845 46863</p>
          <p>📧 info@drivingschool.com</p>
        </div>
      </div>
    </Homelayouts>
  );
};

export default ContactUs;

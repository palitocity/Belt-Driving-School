import React, { useState } from "react";
import Homelayouts from "../layouts/Homelayouts";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/contact-us",
        {
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message,
        }
      );

      console.log("✅ Response:", res.data);
      toast.success("Message sent successfully ✅");

      // Reset form
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Homelayouts>
      <Toaster position="top-right" />
      <div className="w-full min-h-screen flex flex-col items-center mt-15 bg-[#F9FAFB] py-16 px-6">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A2E57] mb-2">Contact Us</h1>
          <p className="text-gray-500">
            Have a question or need assistance? Fill out the form below and our
            team will get back to you shortly.
          </p>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 mb-2 font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Write your message..."
                required
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A2E57] hover:bg-blue-700"
                } text-white px-8 py-3 rounded-xl font-semibold transition-all`}
              >
                {loading ? "Sending..." : "Send Message"}
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

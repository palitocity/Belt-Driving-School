"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

const Footer: React.FC = () => {
  const router = useRouter();

  const footerLinks = [
    { label: "About Us", path: "/aboutus" },
    { label: "Driving License", path: "/driver" },
    { label: "Book a Meeting", path: "/book" },
    { label: "Contact Us", path: "/contact" },
  ];

  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/newsletter/subscribe",
        {
          email,
        }
      );
      console.log(res.data);
      setemail("");
      toast.success("Subscribed successfully ✅");
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <footer className="bg-[#0B1D36] text-gray-300 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#002147]/40 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Belt <span className="text-[#E02828]">Driving School</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 mb-8">
              Nigeria’s premier driving academy since 2009 — empowering safe,
              confident, and skilled drivers across the nation.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={18} />, href: "https://facebook.com/beltdrivingschool" },
                { icon: <Twitter size={18} />, href: "https://x.com/beltdrivingschool" },
                { icon: <Linkedin size={18} />, href: "https://linkedin.com/beltdrivingschool" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/beltdrivingschool/" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#E02828]/10 flex items-center justify-center hover:bg-[#E02828] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <span
                    onClick={() => router.push(link.path)}
                    className="cursor-pointer text-gray-400 hover:text-[#E02828] transition-all duration-200 hover:pl-2 inline-block"
                  >
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#E02828]">📍</span>
                <span>No 12 Aba-Odan, Alakia Adegbayi, Ibadan, Oyo State</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E02828]">📍</span>
                <span>
                  No 2 Shamong Street, Abule-Ijoko, Ifo LGA, Ogun State
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E02828]">📍</span>
                <span>
                  Beside Captain Cook, Brigadier Ademulegun Rd, Ondo State
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828]">📞</span>
                <a href="tel:+2348155904487" className="hover:text-[#E02828]">
                  +234 815 590 4487
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828]">📞</span>
                <a href="tel:+2348084546863" className="hover:text-[#E02828]">
                  +234 808 454 6863
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828]">✉️</span>
                <a
                  href="mailto:info@beltdriving.com"
                  className="hover:text-[#E02828]"
                >
                  info@beltdriving.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828]">⏰</span>
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">
              Join Our Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with our latest driving programs and discounts.
            </p>
            <form
              className="flex items-center gap-2"
              onSubmit={handleNewsletter}
            >
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#E02828]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#E02828] hover:bg-[#c41d1d] text-white font-semibold px-5 py-3 rounded-md transition-all duration-300"
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mt-16 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-3">
          <p>
            © {new Date().getFullYear()} Belt Driving School. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <span
              onClick={() => router.push("/terms")}
              className="hover:text-[#E02828] transition"
            >
              Terms of Service & Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

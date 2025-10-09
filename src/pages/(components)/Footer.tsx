import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-[#002147] text-white min-h-[600px]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold text-[#E02828] mb-6">
              Belt Driving School
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-base">
              Nigeria&lsquo;s premier driving school, committed to producing
              safe, confident, and skilled drivers since 2009.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-[#0A2E57] rounded-full flex items-center justify-center hover:bg-[#E02828] hover:scale-110 transition-all duration-300"
              >
                <span className="font-bold text-lg">f</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#0A2E57] rounded-full flex items-center justify-center hover:bg-[#E02828] hover:scale-110 transition-all duration-300"
              >
                <span className="font-bold text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#0A2E57] rounded-full flex items-center justify-center hover:bg-[#E02828] hover:scale-110 transition-all duration-300"
              >
                <span className="font-bold text-lg">in</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-[#0A2E57] rounded-full flex items-center justify-center hover:bg-[#E02828] hover:scale-110 transition-all duration-300"
              >
                <span className="font-bold text-lg">IG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#E02828] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <span
                  onClick={() => router.push("/aboutus")}
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  About Us
                </span>
              </li>
              <li>
                <span
                  onClick={() => router.push("/driving")}
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Driving License
                </span>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Why Choose Us
                </a>
              </li>

              <li>
                <span
                  onClick={() => router.push("/book")}
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Book a Meeting
                </span>
              </li>
              <li>
                <span
                  onClick={() => router.push("/contact")}
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold text-[#E02828] mb-6">
              Our Services
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Beginner Driving Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Driver&lsquo;s License Processing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Defensive Driving
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Advanced Driving Skills
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Corporate Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#E02828] hover:pl-2 transition-all duration-200"
                >
                  Refresher Courses
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-[#E02828] mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#E02828] mt-1 text-xl">📍</span>
                <span>No 12 aba-odan alakia Adegbayi Ibadan, oyo state</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E02828] mt-1 text-xl">📍</span>
                <span>
                  No 2, Shamong Street, Abule-Ijoko, ifo LGA, ogun state..
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E02828] mt-1 text-xl">📍</span>
                <span>
                  Beside Captain Cook, Brigader ADEMULEGUN ROAD, ONDO WEST LGA,
                  ONDO state..
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828] text-xl">📞</span>
                <a
                  href="tel:+23408155904487"
                  className="hover:text-[#E02828] transition-colors duration-200"
                >
                  +234 081 559 04487
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828] text-xl">📞</span>
                <a
                  href="tel:+23408084546863"
                  className="hover:text-[#E02828] transition-colors duration-200"
                >
                  +234 080 845 46863
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828] text-xl">✉️</span>
                <a
                  href="mailto:info@beltdriving.com"
                  className="hover:text-[#E02828] transition-colors duration-200"
                >
                  info@beltdriving.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E02828] text-xl">⏰</span>
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0A2E57]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Belt Driving School. All rights
              reserved.
            </p>
            <div className="flex gap-8 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#E02828] transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E02828] transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E02828] transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

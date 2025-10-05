import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.jpg";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A2E57] shadow-lg h-[80px]"
          : "bg-[#0A2E57]/95 backdrop-blur-sm h-[90px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Belt Driving School Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            "Home",
            "Driving Training",
            "Driver's License",
            "Defensive Training",
            "Deals & Promo",
            "Contact Us",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="px-2 py-1 text-sm text-white font-medium hover:text-[#E02828] transition"
            >
              {item}
            </a>
          ))}

          {/* About Us Dropdown */}
          <div className="group relative">
            <button className="px-2 py-1 text-sm text-white font-medium hover:text-[#E02828]">
              About Us
            </button>
            <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              {[
                "Company Overview",
                "Awards & Achievements",
                "Why Choose Us?",
                "Our Facilities",
                "Our Partners",
                "Careers Opportunity",
                "Contact Us",
              ].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="block px-3 py-2 text-sm text-[#0A2E57] hover:bg-[#E02828] hover:text-white transition"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+2348001234567"
            className="text-[#E02828] font-semibold text-sm hover:text-white transition"
          >
            +234 800 123 4567
          </a>
          <button
            onClick={() => router.push("/auth/register")}
            className="bg-[#E02828] text-white font-bold px-4 py-2 text-sm rounded-md hover:bg-[#C02020] transition shadow"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="px-6 py-4 space-y-2">
            <a href="#" className="block text-[#0A2E57] font-medium">
              Home
            </a>

            {/* Mobile About Us Dropdown */}
            <div>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="w-full text-left text-[#0A2E57] font-semibold"
              >
                About Us {isAboutOpen ? "▲" : "▼"}
              </button>
              {isAboutOpen && (
                <div className="mt-2 space-y-1 pl-4">
                  {[
                    "Company Overview",
                    "Awards & Achievements",
                    "Why Choose Us?",
                    "Our Facilities",
                    "Our Partners",
                    "Careers Opportunity",
                  ].map((link, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block py-1 text-[#0A2E57] hover:bg-[#E02828]/20 rounded"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block text-[#0A2E57] font-medium">
              Driving Training
            </a>
            <a href="#" className="block text-[#0A2E57] font-medium">
              Driver&lsquo;s License
            </a>
            <a href="#" className="block text-[#0A2E57] font-medium">
              Defensive Training
            </a>
            <a href="#" className="block text-[#0A2E57] font-medium">
              Deals & Promo
            </a>
            <a href="#" className="block text-[#0A2E57] font-medium">
              Contact Us
            </a>

            <div className="pt-4 space-y-2">
              <a
                href="tel:+2348001234567"
                className="block text-center bg-[#0A2E57] text-white font-semibold py-2 rounded-md"
              >
                📞 +234 800 123 4567
              </a>
              <button
                onClick={() => router.push("/auth/register")}
                className="w-full bg-[#E02828] text-white font-bold py-2 rounded-md"
              >
                Enroll Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

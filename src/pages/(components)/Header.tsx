import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../../assets/logo-removebg-preview.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Driving Training", path: "/driver" },
    { name: "Hire a Driver", path: "/hire" },
    { name: "Book a Consult", path: "/book" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleNav = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f4077] shadow-lg h-[80px]"
          : "bg-[#0f4077]/95 backdrop-blur-sm h-[90px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex w-[50%] md:w-[16%]  h-[90%] justify-center items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="Belt Driving School Logo"
            className="h-[80%] w-[80%] object-cover"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNav(item.path)}
              className={`px-2 py-1 text-sm font-medium transition ${
                router.pathname === item.path
                  ? "text-[#E02828]"
                  : "text-white hover:text-[#E02828]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+2348084546863"
            className="text-[#E02828] font-semibold text-sm hover:text-white transition"
          >
            📞 070708 454 6863
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
          className="lg:hidden text-white p-2 text-2xl"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="px-6 py-4 space-y-3">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNav(link.path)}
                className="block text-[#0A2E57] font-medium w-full text-left"
              >
                {link.name}
              </button>
            ))}

            {/* CTA section */}
            <div className="pt-4 space-y-2">
              <a
                href="tel:+2348084546863"
                className="block text-center bg-[#0A2E57] text-white font-semibold py-2 rounded-md"
              >
                📞 +234 808 454 6863
              </a>
              <button
                onClick={() => handleNav("/auth/register")}
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

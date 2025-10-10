// admin/dasheader.tsx
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/logo-removebg-preview.png";
import { ChevronDown, LogOut, Search, User } from "lucide-react";

import userprofilepic from "../../../assets/blank-profile-picture.webp";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const [dropdown, setDropdown] = useState(false);

  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="w-full h-full flex items-center justify-between px-4 md:px-6 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" className="h-10 w-auto" />
        <h2 className="hidden md:block font-bold text-[#0A2E57] text-lg">
          Belt Driving School Admin
        </h2>
      </div>

      {/* Search (Desktop) */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md w-[300px]">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center gap-2"
          >
            <Image
              src={userprofilepic}
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
            <ChevronDown className="text-gray-600" />
          </button>

          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50">
              <button
                onClick={() => router.push("/admin/settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Profile
              </button>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden p-2 bg-gray-100 rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MdMenu size={22} className="text-[#0A2E57]" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#E02828] text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;

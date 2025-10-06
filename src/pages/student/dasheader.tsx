// admin/dasheader.tsx
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/logo-removebg-preview.png";
import { ChevronDown, LogOut, Search, Settings, User } from "lucide-react";

import userprofilepic from "../../../assets/blank-profile-picture.webp";
import { MdMenu } from "react-icons/md";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="w-full h-full flex items-center justify-between px-4 md:px-6 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" className="h-10 w-auto" />
        <h2 className="hidden md:block font-bold text-[#0A2E57] text-lg">
          Belt Driving School Student
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
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2">
                <User className="w-4 h-4" /> Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-sm flex items-center gap-2">
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
    </header>
  );
};

export default DashboardHeader;

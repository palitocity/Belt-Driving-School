"use client";
import React, { useState } from "react";
import { Users, Settings, LayoutDashboard, X, LogOut } from "lucide-react";
import { useRouter } from "next/router";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/instructor/main",
    },
    {
      name: "Add Student",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/instructor/addStudent",
    },
    {
      name: "Students",
      icon: <Users className="w-5 h-5" />,
      path: "/instructor/students",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/instructor/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[#0A2E57] text-white shadow-lg
          transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0 w-64" : "translate-x-full w-64"}
          md:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#E02828] transition"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Logout button */}
        <div className="px-4 py-4 border-t border-white/20">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 text-sm font-medium text-white hover:text-red-400 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#0A2E57] text-white h-full justify-between">
        <div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#E02828] transition"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="px-4 py-4 border-t border-white/20">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 text-sm font-medium text-white hover:text-red-400 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

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
    </>
  );
};

export default Sidebar;

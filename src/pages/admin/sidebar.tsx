import React from "react";
import {
  Users,
  Car,
  FileBadge,
  CreditCard,
  Settings,
  LayoutDashboard,
  Award,
  X,
} from "lucide-react";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "#",
    },
    { name: "Students", icon: <Users className="w-5 h-5" />, href: "#" },
    { name: "Instructors", icon: <Award className="w-5 h-5" />, href: "#" },
    { name: "Training Programs", icon: <Car className="w-5 h-5" />, href: "#" },
    {
      name: "Driver’s License",
      icon: <FileBadge className="w-5 h-5" />,
      href: "#",
    },
    { name: "Payments", icon: <CreditCard className="w-5 h-5" />, href: "#" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "#" },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-[#0A2E57] text-white shadow-lg
          transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0 w-64" : "translate-x-full w-64"}
          md:hidden
        `}
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
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#E02828] transition"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#0A2E57] text-white h-full">
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#E02828] transition"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

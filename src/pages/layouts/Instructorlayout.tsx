import React, { ReactNode, useState } from "react";
import DashboardHeader from "../instructor/dasheader";
import Sidebar from "../instructor/sidebar";

interface MainlayoutProps {
  children: ReactNode;
}

const InstructorLayouts: React.FC<MainlayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* HEADER */}
      <div className="h-[10vh]">
        <DashboardHeader
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InstructorLayouts;

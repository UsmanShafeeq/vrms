import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 ml-6 bg-gray-100 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

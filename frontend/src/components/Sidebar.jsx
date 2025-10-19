import React, { useState } from "react";
import {
  FaHome,
  FaCar,
  FaPlusCircle,
  FaChartBar,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaHouseUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ setView, activeView, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
   
    { name: "Dashboard", icon: <FaHome />, view: "dashboard" },
    { name: "Vehicle List", icon: <FaCar />, view: "list" },
    { name: "Add Vehicle", icon: <FaPlusCircle />, view: "add" },
    { name: "Reports", icon: <FaChartBar />, view: "reports" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? "80px" : "250px" }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-indigo-800 to-indigo-950 text-white shadow-2xl flex flex-col justify-between transition-all duration-300"
    >
      {/* Top Section */}
      <div>
        {/* Profile / Logo */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-3xl text-yellow-400" />
              <div>
                <p className="text-sm text-gray-300">Welcome</p>
                <h2 className="font-bold text-lg">Usman</h2>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white transition"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 flex flex-col space-y-1 px-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setView(item.view)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.view
                  ? "bg-indigo-700 text-yellow-300"
                  : "hover:bg-indigo-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span className="text-md font-medium">{item.name}</span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-indigo-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (onLogout) onLogout(); // Trigger logout from parent
          }}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-indigo-700 hover:text-red-300 transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          {!collapsed && <span className="text-md font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;

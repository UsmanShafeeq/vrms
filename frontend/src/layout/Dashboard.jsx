import React, { useEffect, useState } from "react";
import DashboardCharts from "./DashboardCharts";
import DashboardLayout from "./DashboardLayout";
import {
  FaCar,
  FaUsers,
  FaChartBar,
  FaPlusCircle,
  FaCheckCircle,
  FaCogs,
  FaCarSide,
} from "react-icons/fa";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/api/vehicles/";

const Dashboard = ({ setView }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setVehicles(data.results || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const totalVehicles = vehicles.length;
  const totalBrands = new Set(vehicles.map((v) => v.brand_name)).size;
  const activeVehicles = vehicles.filter((v) => v.status !== "inactive").length;
  const totalVariants = new Set(vehicles.map((v) => v.variant)).size;
  const totalTransmissions = new Set(vehicles.map((v) => v.transmission)).size;

  const stats = [
    { title: "Total Vehicles", value: totalVehicles, icon: FaCar, color: "from-blue-400 to-blue-200" },
    { title: "Total Brands", value: totalBrands, icon: FaChartBar, color: "from-green-400 to-green-200" },
    { title: "Active Vehicles", value: activeVehicles, icon: FaCheckCircle, color: "from-purple-400 to-purple-200" },
    { title: "Variants", value: totalVariants, icon: FaCogs, color: "from-pink-400 to-pink-200" },
    { title: "Transmissions", value: totalTransmissions, icon: FaCarSide, color: "from-yellow-400 to-yellow-200" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gray-800">
            Vehicle Management Dashboard
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setView("add")}
            className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlusCircle className="mr-2" /> Add New Vehicle
          </motion.button>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map(({ title, value, icon: Icon, color }, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className={`bg-gradient-to-br ${color} p-5 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer`}>
              <div>
                <h3 className="text-gray-700 font-semibold">{title}</h3>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </div>
              <Icon className="text-5xl text-white opacity-70" />
            </motion.div>
          ))}
        </div>

        {/* Recent Vehicles Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-5 text-gray-700 flex items-center gap-2">
            <FaCheckCircle className="text-blue-500" /> Recent Vehicle Entries
          </h2>

          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
            </div>
          ) : vehicles.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No vehicles found. Add some to get started!</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm tracking-wide">
                  <th className="py-3 px-4 border-b">Brand</th>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Model</th>
                  <th className="py-3 px-4 border-b">Variant</th>
                  <th className="py-3 px-4 border-b">Transmission</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Added On</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.slice(0, 5).map((v) => (
                  <motion.tr key={v.id} whileHover={{ scale: 1.01 }} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border-b">{v.brand_name}</td>
                    <td className="py-3 px-4 border-b">{v.vehicle_name}</td>
                    <td className="py-3 px-4 border-b">{v.model_number}</td>
                    <td className="py-3 px-4 border-b">{v.variant}</td>
                    <td className="py-3 px-4 border-b">{v.transmission}</td>
                    <td className="py-3 px-4 border-b">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        v.status === "inactive" ? "bg-red-100 text-red-600" :
                        v.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                        "bg-green-100 text-green-600"
                      }`}>
                        {v.status || "Active"}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-gray-500">{v.created_at ? new Date(v.created_at).toLocaleDateString() : "-"}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Dashboard Charts */}
        <DashboardCharts vehicles={vehicles} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

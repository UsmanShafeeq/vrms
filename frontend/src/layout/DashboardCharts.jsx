import React, { useMemo } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const DashboardCharts = ({ vehicles }) => {
  const COLORS = ["#4F46E5", "#FACC15", "#EF4444", "#10B981", "#F472B6", "#8B5CF6"];

  // ---------------- Bar Chart: Vehicle Types ----------------
  const barData = useMemo(() => {
    const typesCount = {};
    vehicles.forEach(v => typesCount[v.vehicle_type || "Other"] = (typesCount[v.vehicle_type || "Other"] || 0) + 1);
    return Object.keys(typesCount).map(key => ({ category: key, count: typesCount[key] }));
  }, [vehicles]);

  // ---------------- Pie Chart: Vehicle Status ----------------
  const pieData = useMemo(() => {
    const statusCount = { Active: 0, Inactive: 0, Pending: 0 };
    vehicles.forEach(v => {
      if (v.status === "inactive") statusCount.Inactive += 1;
      else if (v.status === "pending") statusCount.Pending += 1;
      else statusCount.Active += 1;
    });
    return Object.keys(statusCount).map(key => ({ name: key, value: statusCount[key] }));
  }, [vehicles]);

  // ---------------- Line Chart: Vehicles Added Over Time ----------------
  const lineData = useMemo(() => {
    const dateCount = {};
    vehicles.forEach(v => {
      if (!v.created_at) return;
      const date = new Date(v.created_at).toLocaleDateString();
      dateCount[date] = (dateCount[date] || 0) + 1;
    });
    return Object.keys(dateCount).sort((a, b) => new Date(a) - new Date(b))
      .map(date => ({ date, count: dateCount[date] }));
  }, [vehicles]);

  // ---------------- Bar Chart: Variants Distribution ----------------
  const variantData = useMemo(() => {
    const variantCount = {};
    vehicles.forEach(v => variantCount[v.variant || "Other"] = (variantCount[v.variant || "Other"] || 0) + 1);
    return Object.keys(variantCount).map(key => ({ variant: key, count: variantCount[key] }));
  }, [vehicles]);

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bar Chart: Vehicle Types */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Vehicle Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="category" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4F46E5" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Vehicle Status */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Vehicle Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Vehicles Added Over Time */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Vehicles Added Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Variants Distribution */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Variants Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={variantData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="variant" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#F472B6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardCharts;

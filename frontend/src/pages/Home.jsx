import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
  FaCar,
  FaCheckCircle,
  FaCogs,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = ({ setView, recentVehicles = [] }) => {
  return (
    <div className="font-sans scroll-smooth bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 md:px-10 py-4">
          <h1
            onClick={() => setView("home")}
            className="text-2xl font-bold text-blue-800 cursor-pointer"
          >
            Vehicle Record System
          </h1>
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <button onClick={() => setView("home")} className="hover:text-blue-600">
              Home
            </button>
            <button onClick={() => setView("login")} className="hover:text-blue-600">
              Admin Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 px-8 md:px-16 py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10" />

        <motion.div
          className="flex flex-col max-w-xl space-y-6 text-center lg:text-left"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            Vehicle Record <br />
            <span className="text-blue-500">Made Easy</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Access your vehicle details instantly. Manage your history and ensure security anytime, anywhere.
          </p>

          <motion.button
            onClick={() => setView("login")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold mt-6 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition w-fit mx-auto lg:mx-0 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Admin Login</span> <span className="text-xl">→</span>
          </motion.button>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start space-x-4 mt-6">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, color: "#2563EB" }}
                className="text-gray-500 hover:text-blue-600 text-lg cursor-pointer transition"
              >
                <Icon />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mt-10 lg:mt-0"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="https://pngimg.com/uploads/jeep/jeep_PNG94.png"
            alt="Vehicle"
            className="w-[90%] md:w-[500px] mx-auto drop-shadow-2xl rounded-xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Why Choose Our System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Secure Records", icon: FaCheckCircle, desc: "All your vehicle data is securely stored and accessible only to authorized users." },
            { title: "Easy Management", icon: FaCogs, desc: "Quickly add, update, and track vehicle records with minimal effort." },
            { title: "Multiple Vehicles", icon: FaCar, desc: "Manage multiple vehicles efficiently, including their status, variants, and history." },
          ].map(({ title, icon: Icon, desc }, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg text-center">
              <Icon className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Vehicles Preview */}
      {recentVehicles.length > 0 && (
        <section className="py-16 px-6 md:px-16 bg-gray-50">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Recent Vehicles</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-lg">
              <thead>
                <tr className="bg-blue-100 text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Model</th>
                  <th className="py-3 px-4">Variant</th>
                  <th className="py-3 px-4">Transmission</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentVehicles.slice(0, 5).map((v, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{v.brand_name}</td>
                    <td className="py-3 px-4">{v.vehicle_name}</td>
                    <td className="py-3 px-4">{v.model_number}</td>
                    <td className="py-3 px-4">{v.variant}</td>
                    <td className="py-3 px-4">{v.transmission}</td>
                    <td className={`py-3 px-4 font-medium text-sm ${
                      v.status === "inactive" ? "text-red-600" :
                      v.status === "pending" ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                      {v.status || "Active"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2025 Vehicle Record System. All rights reserved.</p>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP].map((Icon, i) => (
              <Icon key={i} className="text-white hover:text-blue-300 cursor-pointer transition text-lg" />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

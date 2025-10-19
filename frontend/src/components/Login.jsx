import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLoginSuccess();
    } catch {
      setError("Invalid credentials or not an admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 relative z-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Admin Login</h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Forgot your password? <button className="text-blue-600 font-semibold hover:underline">Reset</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

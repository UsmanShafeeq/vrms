import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./layout/Dashboard";
import VehicleList from "./components/VehicleList";
import VehicleForm from "./components/VehicleForm";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) setView("dashboard"); // automatically go to dashboard
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setView("home");
  };

  // Motion variants for smooth transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key={view}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {view === "home" && <Home setView={setView} />}
            {view === "login" && (
              <Login
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  setView("dashboard");
                }}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            className="flex w-full"
          >
            <Sidebar setView={setView} activeView={view} onLogout={handleLogout} />
            <div className="flex-1 p-6 ml-64 overflow-y-auto">
              <AnimatePresence mode="wait">
                {view === "dashboard" && <Dashboard setView={setView} />}
                {view === "list" && <VehicleList />}
                {view === "add" && <VehicleForm />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

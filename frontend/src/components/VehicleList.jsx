import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const VehicleList = ({ updateStats }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editForm, setEditForm] = useState({
    vehicle_name: "",
    brand_name: "",
    registration_number: "",
    model_number: "",
  });

  const fetchVehicles = async (page = 1, query = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/vehicles/?page=${page}&search=${query}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      setVehicles(res.data.results);
      setTotalPages(Math.ceil(res.data.count / res.data.page_size));

      if (updateStats) {
        const brands = new Set(res.data.results.map((v) => v.brand_name)).size;
        updateStats(res.data.count, brands);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/vehicles/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete vehicle.");
    }
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setEditForm({
      vehicle_name: vehicle.vehicle_name,
      brand_name: vehicle.brand_name,
      registration_number: vehicle.registration_number,
      model_number: vehicle.model_number,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://127.0.0.1:8000/api/vehicles/${editingVehicle.id}/`,
        editForm,
        { headers: { Authorization: `Token ${token}` } }
      );
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingVehicle.id ? res.data : v))
      );
      setIsModalOpen(false);
      setEditingVehicle(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Vehicle List</h2>

      {/* Search */}
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search by name, brand or registration..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => fetchVehicles(1, searchQuery)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </motion.button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-6 animate-pulse">Loading vehicles...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-6">{error}</p>
      ) : vehicles.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No vehicles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                  Vehicle Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {vehicles.map((v, i) => (
                <motion.tr
                  key={v.id}
                  whileHover={{ scale: 1.02 }}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-transform`}
                >
                  <td className="px-6 py-4 text-gray-700">{v.vehicle_name}</td>
                  <td className="px-6 py-4 text-gray-700">{v.brand_name}</td>
                  <td className="px-6 py-4 text-gray-700">{v.registration_number}</td>
                  <td className="px-6 py-4 text-gray-700">{v.model_number}</td>
                  <td className="px-6 py-4 text-gray-700 space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => openEditModal(v)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(v.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrash />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <FaArrowLeft className="mr-2" /> Prev
            </motion.button>

            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Edit Vehicle</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col space-y-3">
              <input
                type="text"
                name="vehicle_name"
                value={editForm.vehicle_name}
                onChange={handleEditChange}
                className="px-4 py-2 border rounded-lg outline-none"
                placeholder="Vehicle Name"
                required
              />
              <input
                type="text"
                name="brand_name"
                value={editForm.brand_name}
                onChange={handleEditChange}
                className="px-4 py-2 border rounded-lg outline-none"
                placeholder="Brand Name"
                required
              />
              <input
                type="text"
                name="registration_number"
                value={editForm.registration_number}
                onChange={handleEditChange}
                className="px-4 py-2 border rounded-lg outline-none"
                placeholder="Registration Number"
                required
              />
              <input
                type="text"
                name="model_number"
                value={editForm.model_number}
                onChange={handleEditChange}
                className="px-4 py-2 border rounded-lg outline-none"
                placeholder="Model Number"
                required
              />

              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;

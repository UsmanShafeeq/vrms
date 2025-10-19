import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaCog,
  FaIdCard,
  FaClipboardList,
  FaCogs,
  FaInfoCircle,
} from "react-icons/fa";

const VehicleForm = ({ onSubmit, vehicleToEdit }) => {
  const [formData, setFormData] = useState({
    brand_name: "",
    vehicle_name: "",
    model_number: "",
    registration_number: "",
    vehicle_type: "",
    variant: "",
    transmission: "",
    chassis_number: "",
    engine_number: "",
    description: "",
  });

  useEffect(() => {
    if (vehicleToEdit) setFormData(vehicleToEdit);
  }, [vehicleToEdit]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center  px-4">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md "></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20  p-10  transition-transform transform hover:-translate-y-1"
        >
          <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10 tracking-wide">
            {vehicleToEdit ? "Update Vehicle" : "Add New Vehicle"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Name */}
            <div className="relative">
              <FaCar className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="Brand Name"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>

            {/* Vehicle Name */}
            <div className="relative">
              <FaClipboardList className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="vehicle_name"
                value={formData.vehicle_name}
                onChange={handleChange}
                placeholder="Vehicle Name"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>

            {/* Model Number */}
            <div className="relative">
              <FaIdCard className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="model_number"
                value={formData.model_number}
                onChange={handleChange}
                placeholder="Model Number"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>

            {/* Registration Number */}
            <div className="relative">
              <FaIdCard className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                placeholder="Registration Number"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div className="relative">
              <FaCar className="absolute left-3 top-4 text-blue-400" />
              <select
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200"
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
                <option value="bus">Bus</option>
                <option value="van">Van</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Variant */}
            <div className="relative">
              <FaCog className="absolute left-3 top-4 text-blue-400" />
              <select
                name="variant"
                value={formData.variant}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200"
                required
              >
                <option value="">Select Variant</option>
                <option value="base">Base</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="sport">Sport</option>
                <option value="luxury">Luxury</option>
                <option value="limited">Limited Edition</option>
                <option value="premium">Premium</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="relative">
              <FaCogs className="absolute left-3 top-4 text-blue-400" />
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200"
                required
              >
                <option value="">Select Transmission</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="semi_automatic">Semi-Automatic</option>
              </select>
            </div>

            {/* Chassis Number */}
            <div className="relative">
              <FaIdCard className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="chassis_number"
                value={formData.chassis_number}
                onChange={handleChange}
                placeholder="Chassis Number"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>

            {/* Engine Number */}
            <div className="relative">
              <FaCog className="absolute left-3 top-4 text-blue-400" />
              <input
                type="text"
                name="engine_number"
                value={formData.engine_number}
                onChange={handleChange}
                placeholder="Engine Number"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="relative mt-6">
            <FaInfoCircle className="absolute left-3 top-4 text-blue-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Vehicle Description (optional)"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-blue-400 outline-none border border-gray-200 placeholder-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-10 w-50 items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 rounded-2xl text-lg shadow-lg hover:shadow-blue-500/40 transition-transform transform hover:scale-105"
          >
            {vehicleToEdit ? "Update Vehicle " : "Add Vehicle "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;

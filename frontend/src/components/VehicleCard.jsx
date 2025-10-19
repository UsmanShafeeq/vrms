import React from "react";

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        {vehicle.brand_name} {vehicle.vehicle_name}
      </h2>
      <p className="text-gray-500 text-sm mb-1">
        <strong>Model:</strong> {vehicle.model_number}
      </p>
      <p className="text-gray-500 text-sm mb-1">
        <strong>Registration:</strong> {vehicle.registration_number}
      </p>
      <p className="text-gray-500 text-sm mb-1">
        <strong>Type:</strong> {vehicle.vehicle_type}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <strong>Transmission:</strong> {vehicle.transmission}
      </p>
      <div className="flex space-x-4 mt-2">
        <button
          onClick={() => onEdit(vehicle)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(vehicle.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;

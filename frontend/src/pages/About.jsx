import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
      <h1 className="text-2xl font-semibold text-blue-700 mb-3">
        About Vehicle Management System
      </h1>
      <p className="text-gray-600 leading-relaxed">
        The Vehicle Management System allows users to maintain detailed
        records of vehicles, including brand, model, type, variant, and more.
        Built with Django REST Framework on the backend and React with Tailwind
        on the frontend, it provides a smooth, modern, and responsive experience.
      </p>
    </div>
  );
};

export default About;

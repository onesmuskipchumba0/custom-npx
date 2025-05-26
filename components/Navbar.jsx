import React from "react";
import { FaRocket, FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full py-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 ml-3">
          <FaRocket size={28} className="text-blue-500" />
          <span className="text-xl font-bold dark:text-gray-300">Custom NPX</span>
        </div>
        <div className="flex items-center space-x-4 mr-3">
          <a href="#" className="flex items-center px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
            <FaHome className="mr-1" />
            Home
          </a>
          <a href="about" className="flex items-center px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
            <FaInfoCircle className="mr-1" />
            About
          </a>
          <a href="#" className="flex items-center px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 transition">
            <FaEnvelope className="mr-1" />
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

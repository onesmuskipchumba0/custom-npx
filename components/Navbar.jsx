import React from "react";

function Navbar() {
  return (
    <nav className="w-full py-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Custom NPX</div>
        <div>
          <a href="#" className="px-3 text-sm hover:underline">Home</a>
          <a href="#" className="px-3 text-sm hover:underline">About</a>
          <a href="#" className="px-3 text-sm hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

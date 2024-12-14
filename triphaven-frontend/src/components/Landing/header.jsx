import { LogIn, LogInIcon, Menu } from "lucide-react";
import React from "react";

const LandingPageCommonHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent shadow-md transition-all duration-300 flex items-center justify-between bg-opacity-5">
      <div className="p-4 text-xl font-bold font-poppins">TripHeaven</div>
      <div className="p-4 text-xl font-bold hidden md:flex items-center space-x-4 ">
        <span className="hover:text-red-700 border-b hover:border-red-700">
          Home
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700">
          Towns
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700">
          Places
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700">
          Restaurants
        </span>
        <div className="flex items-center">
          <LogInIcon className="w-6 h-6 mr-2" />
        </div>
      </div>

      {/* Menu icon for smaller screens */}
      <div className="md:hidden p-4">
        <Menu className="w-6 h-6" />
      </div>
    </header>
  );
};

export default LandingPageCommonHeader;

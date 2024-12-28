import { logout } from "@/redux/slices/authSlice";
import { LogIn, LogInIcon, Menu } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPageCommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    // <header className="sticky top-0 z-50 bg-transparent shadow-md transition-all duration-300 flex items-center justify-between bg-opacity-5">
    <header className="sticky top-0 z-50 bg-headerBackgroundColor text-white transition-all duration-300 flex items-center justify-between">

      <div className="p-4 text-xl font-bold font-poppins">TripHeaven</div>
      <div className="p-4 text-xl font-bold hidden md:flex items-center space-x-4 ">
        <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
          Home
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
          Towns
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
          Places
        </span>
        <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
          Restaurants
        </span>
        <div className="flex items-center cursor-pointer" onClick={() => {
          dispatch(logout());
          navigate('/')
        }}>
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

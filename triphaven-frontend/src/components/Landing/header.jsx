import { logout } from "@/redux/slices/authSlice";
import { LogIn, LogInIcon, Menu } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LandingPageCommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    // <header className="sticky top-0 z-50 bg-transparent shadow-md transition-all duration-300 flex items-center justify-between bg-opacity-5">
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 flex items-center justify-between ${
        location.pathname.includes("towns")
          ? "bg-headerForTownsBackgroundColor"
          : location.pathname.includes("destinations")
          ? "bg-headerForDestinationsBackgroundColor"
          : location.pathname.includes("restaurants")
          ? "bg-headerForRestaurantsBackgroundColor"
          : "bg-headerBackgroundColor"
      }`}
    >
      <div
        className="p-4 text-xl font-bold font-poppins cursor-pointer"
        onClick={() => navigate("/traveller")}
      >
        TripHeaven
      </div>
      <div className="p-4 text-xl font-bold hidden md:flex items-center space-x-4 ">
        <Link to="/traveller">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Home
          </span>
        </Link>
        <Link to="/traveller/towns">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Towns
          </span>
        </Link>
        <Link to="/traveller/destinations">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Destinations
          </span>
        </Link>
        <Link to="/traveller/restaurants">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Restaurants
          </span>
        </Link>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
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

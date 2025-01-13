import { logout } from "@/redux/slices/authSlice";
import { LogIn, LogInIcon, Menu } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LandingPageCommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");
  // console.log('token', token)

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
        onClick={() => navigate("/")}
      >
        TripHeaven
      </div>
      <div className="p-4 text-xl font-bold hidden md:flex items-center space-x-4 ">
        <Link to="/">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Home
          </span>
        </Link>
        <Link to="/towns">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Towns
          </span>
        </Link>
        <Link to="/destinations/">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Destinations
          </span>
        </Link>
        <Link to="/restaurants">
          <span className="hover:text-red-700 border-b hover:border-red-700 cursor-pointer">
            Restaurants
          </span>
        </Link>
        {token === null ? (
          <Link to="/auth" className="flex items-center justify-center">
            <span className="rounded-xl p-1 px-4 border-2 border-red-600 hover:bg-red-600">Login</span>
          </Link>
        ) : (
          <div
            className="flex items-center cursor-pointer hover:text-red-700"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <LogInIcon className="w-6 h-6 mr-2" />
          </div>
        )}
      </div>

      {/* Menu icon for smaller screens */}
      <div className="md:hidden p-4">
        <Menu className="w-6 h-6" />
      </div>
    </header>
  );
};

export default LandingPageCommonHeader;

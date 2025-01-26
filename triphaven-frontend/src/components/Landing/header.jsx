import { logout } from "@/redux/slices/authSlice";
import { LogInIcon, Menu } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/towns", label: "Towns" },
  { path: "/destinations", label: "Destinations" },
  { path: "/restaurants", label: "Restaurants" },
];

const LandingPageCommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isActive = (path) => {
    // Special handling for the home path, avoid highlighting on root `/`
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 flex items-center justify-between lg:px-14 md:px-8 ${
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
        className="p-4 text-3xl font-bold font-poppins cursor-pointer"
        onClick={() => navigate("/")}
      >
        TripHeaven
      </div>
      <div className="p-4 text-lg font-bold hidden md:flex items-center lg:space-x-6 md:space-x-2 uppercase">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <span
              className={`cursor-pointer ${
                isActive(item.path)
                  ? "text-black"
                  : "hover:text-white hover:bg-[#68d4ff] hover:rounded-xl hover:p-1 hover:px-3 hover:border-2 hover:border-[#68d4ff]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
        {token === null ? (
          <Link to="/auth" className="flex items-center justify-center">
            <span className="rounded-xl p-1 px-4 border-2 border-[#68d4ff] hover:bg-[#68d4ff]">
              Login
            </span>
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

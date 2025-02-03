import { logout } from "@/redux/slices/authSlice";
import { LogInIcon, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

      {/* Desktop Navigation */}
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
            Logout
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white shadow-lg p-6 flex flex-col space-y-6 z-50"
        >
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Menu</span>
            <X className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg ${
                  isActive(item.path)
                    ? "text-[#68d4ff]"
                    : "hover:text-[#68d4ff]"
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            {token === null ? (
              <Link to="/auth" onClick={toggleMenu}>
                <span className="rounded-xl p-2 px-4 border-2 border-[#68d4ff] hover:bg-[#68d4ff]">
                  Login
                </span>
              </Link>
            ) : (
              <div
                className="flex items-center cursor-pointer hover:text-red-700"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  toggleMenu();
                }}
              >
                <LogInIcon className="w-6 h-6 mr-2" />
                Logout
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default LandingPageCommonHeader;

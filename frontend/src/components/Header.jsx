import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/logo.png"; // ✅ changed to PNG

import React, { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 🔑 for route change detection

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update login state on route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "FAQs", path: "/faq" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false); // immediately update header
    navigate("/home"); // go to home after logout
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md animate-fadeInDown">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2.5 px-5 md:px-10">
        {/* Logo + Title */}
        <div className="relative flex items-center gap-2.5">
          <div className="absolute w-10 h-10 md:w-12 md:h-12 bg-[#FF6EC7] rounded-full opacity-20 blur-xl animate-glow-soft"></div>
          <img
            src={Logo} 
            alt="Pro-Connect Logo"
            className="w-10 h-10 md:w-12 md:h-12 relative z-10 rounded-full shadow-md"
          />

          <Link
            to="/home"
            className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-[#ffffff] via-[#2c6995] to-[#ddb7c3] bg-clip-text text-transparent animate-gradient-x"
          >
            Pro-Connect
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium text-gray-800 relative">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="relative group hover:text-[#00F5FF] transition duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#00F5FF] group-hover:w-full transition-all duration-300 rounded"></span>
            </Link>
          ))}

          {/* Login or Logout button */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-gray-800 focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-md transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col gap-3 py-3 px-5 text-gray-800">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="py-2 hover:text-[#00F5FF] transition duration-300 border-b border-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

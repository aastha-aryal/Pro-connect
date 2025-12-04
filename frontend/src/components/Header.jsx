import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Feedback", path: "/feedback" },
    { name: "FAQs", path: "/faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1f4a6d]  backdrop-blur-lg shadow-lg animate-fadeInDown">
    
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
            to="/"
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#ffffff] via-[#2c6995] to-[#ddb7c3] bg-clip-text text-transparent animate-gradient-x"
          >
            Pro-Connect
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-medium text-white">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="relative group hover:text-[#00F5FF] transition duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#00F5FF] group-hover:w-full transition-all duration-300 rounded"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-3xl text-white focus:outline-none">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white/10 backdrop-blur-lg transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col gap-3 py-3 px-5 text-white">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="py-2 hover:text-[#00F5FF] transition duration-300 border-b border-white/20"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradient-x {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }

        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }

        @keyframes glow-soft {
          0%,100% { transform: scale(1); opacity: 0.2; box-shadow: 0 0 8px #FF6EC7, 0 0 16px #FF6EC7; }
          50% { transform: scale(1.1); opacity: 0.4; box-shadow: 0 0 16px #FF6EC7, 0 0 32px #FF6EC7; }
        }
        .animate-glow-soft { animation: glow-soft 2.5s ease-in-out infinite; }

        @keyframes text-glow-soft {
          0%,100% { text-shadow: 0 0 3px #00F5FF, 0 0 6px #FF6EC7; }
          50% { text-shadow: 0 0 6px #00F5FF, 0 0 12px #FF6EC7; }
        }
        .animate-text-glow-soft { animation: text-glow-soft 2.5s ease-in-out infinite; }
      `}</style>
    </header>
  );
};

export default Header;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/blog"); // redirect to blog after loader
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-b from-[#e9f3ff] to-[#f9faef] animate-fadeIn">
      {/* Logo */}
      <img
        src={Logo}
        alt="Pro-Connect Logo"
        className="w-72 h-72 mb-8"
      />

      {/* Loading dots */}
      <div className="flex space-x-3">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-0"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
      </div>

      {/* Loading text */}
      <p className="mt-10 text-black text-lg font-semibold animate-pulse tracking-wide">
        Loading Pro-Connect
      </p>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce { animation: bounce 0.6s infinite; }
      `}</style>
    </div>
  );
};

export default Loader;

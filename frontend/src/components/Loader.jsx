import React from "react";
import Logo from "../assets/logo.svg";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-b from-[#0D1B2A] to-[#415A77] animate-fadeIn">
    <img
      src={Logo}
      alt="Pro-Connect Logo"
      className="w-40 h-40 mb-6 animate-bounceSlow filter drop-shadow-lg"
    />
    <div className="flex space-x-3">
      <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-0"></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
    </div>
    <p className="mt-6 text-white text-lg font-semibold animate-pulse tracking-wide">
      Loading Pro-Connect...
    </p>

    <style>{`
      @keyframes fadeIn { 0% { opacity:0; transform: translateY(20px);} 100% { opacity:1; transform: translateY(0);} }
      .animate-fadeIn { animation: fadeIn 1s ease forwards; }

      @keyframes bounceSlow { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-15px);} }
      .animate-bounceSlow { animation: bounceSlow 2s infinite; }
    `}</style>
  </div>
);

export default Loader;

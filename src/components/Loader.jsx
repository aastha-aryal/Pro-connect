import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"; 

const Loader = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create a 5-second loading timer with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Update every 50ms for 5 seconds total

    const timer = setTimeout(() => {
      navigate("/blog"); // redirect to blog after 5 seconds
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 animate-fadeIn">
      
      {/* Outer Yellow Circling Animation */}
      <div className="absolute w-96 h-96 border-4 border-transparent rounded-full">
        <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full animate-spin-slow"></div>
      </div>

      {/* Middle Yellow Circling Animation */}
      <div className="absolute w-80 h-80">
        <div className="absolute inset-0 border-2 border-yellow-300 rounded-full animate-pulse"></div>
      </div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="p-8 rounded-full bg-linear-to-br from-gray-800 to-black shadow-2xl mb-8 animate-pulse-slow">
          <img
            src={Logo}
            alt="Pro-Connect Logo"
            className="w-64 h-64 object-contain filter brightness-125"
          />
        </div>

        {/* Loading Progress Bar */}
        <div className="w-80 mb-8">
          <div className="flex justify-between text-yellow-100 mb-2">
            <span className="text-sm font-semibold">Loading...</span>
            <span className="text-sm font-bold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-linear-to-r from-yellow-500 via-yellow-400 to-yellow-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-8 bg-linear-to-r from-transparent via-yellow-200 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-4 mb-6">
          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce-slow delay-0 shadow-lg shadow-yellow-500/50"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce-slow delay-200 shadow-lg shadow-yellow-400/50"></div>
          <div className="w-4 h-4 bg-yellow-300 rounded-full animate-bounce-slow delay-400 shadow-lg shadow-yellow-300/50"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-3xl font-bold bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent animate-glow mb-2">
            Pro-Connect
          </p>
          <p className="text-gray-300 text-lg font-semibold animate-pulse tracking-wider">
            Connecting Professionals...
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 w-full flex justify-center space-x-12">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping delay-1000"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-1500"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping delay-2000"></div>
      </div>

      <style>{`
        @keyframes fadeIn { 
          0% { opacity:0; transform: translateY(20px);} 
          100% { opacity:1; transform: translateY(0);} 
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 193, 7, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 193, 7, 0.8)); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fadeIn { 
          animation: fadeIn 1s ease forwards; 
        }
        
        .animate-spin-slow { 
          animation: spin-slow 8s linear infinite; 
        }
        
        .animate-spin-reverse { 
          animation: spin-reverse 6s linear infinite; 
        }
        
        .animate-bounce-slow { 
          animation: bounce-slow 2s infinite ease-in-out; 
        }
        
        .animate-ping-slow { 
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; 
        }
        
        .animate-pulse-slow { 
          animation: pulse-slow 2s infinite; 
        }
        
        .animate-glow { 
          animation: glow 3s infinite; 
        }
        
        .animate-shimmer { 
          animation: shimmer 2s infinite; 
        }
      `}</style>
    </div>
  );
};

export default Loader;
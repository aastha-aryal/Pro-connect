import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/*
  Verification.jsx
  - shows success message based on userType
  - Back to Homepage button navigates to "/"
*/

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "user";

  const title = userType === "provider"
    ? "Provider Registration Successful!"
    : "Customer Registration Successful!";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0b1620] to-[#2b3b49] p-6">
      <div className="max-w-xl w-full bg-[#243240]/90 border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
        <div className="mx-auto w-28 h-28 rounded-full bg-linear-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497] flex items-center justify-center mb-6 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.2" fill="none" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-200 mb-6">Thank you for joining Pro-Connect. Your submission has been received and will be verified shortly.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#31d7c9] text-black font-semibold rounded-xl hover:scale-105 transition">
            Back to Homepage for Login
          </button>

        </div>

        <p className="text-xs text-gray-400 mt-4">You will also receive an email once verification is complete (in a real app).</p>
      </div>
    </div>
  );
};

export default Verification;

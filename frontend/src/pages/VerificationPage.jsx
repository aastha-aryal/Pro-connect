import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "user";

  const title =
    userType === "provider"
      ? "Provider Registration Successful!"
      : "Customer Registration Successful!";

  // OTP logic
  const [otpMethod, setOtpMethod] = useState("email"); // "email" or "sms"
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");

  // Simulate sending OTP
  const sendOtp = () => {
    setLoading(true);
    setError("");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // Simulate backend sending OTP
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log(`Simulated OTP (${otpMethod}): ${otp}`);
      alert(`OTP sent via ${otpMethod.toUpperCase()}! Check your ${otpMethod}`);
    }, 1000);
  };

  // Verify OTP
  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      alert("OTP Verified! You can now proceed to login.");
      navigate("/login");
    } else {
      setError("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#f5fbff] to-[#e9f6ff] p-6">
      <div className="max-w-xl w-full bg-white/90 border border-[#d0e6f5] rounded-2xl p-8 shadow-xl text-center">
        {/* Header */}
        <div className="mx-auto w-28 h-28 rounded-full bg-linear-to-r from-[#8de8ff] via-[#baf4ff] to-[#e0f9ff] flex items-center justify-center mb-6 shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#0b4a6f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" stroke="#0b4a6f" strokeWidth="1.2" fill="none" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#0b4a6f] mb-2">{title}</h1>

        {!otpSent && (
          <>
            <p className="text-[#3f6b82] mb-4">Choose how to receive your OTP:</p>
            <div className="flex justify-center gap-4 mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  checked={otpMethod === "email"}
                  onChange={() => setOtpMethod("email")}
                />
                Email
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="otpMethod"
                  value="sms"
                  checked={otpMethod === "sms"}
                  onChange={() => setOtpMethod("sms")}
                />
                SMS
              </label>
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="px-6 py-3 bg-[#b7ecff] text-[#033b5a] font-semibold rounded-xl hover:scale-105 transition shadow-md"
            >
              {loading ? "Sending OTP..." : `Send OTP via ${otpMethod.toUpperCase()}`}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <p className="text-[#3f6b82] mb-4">Enter the 6-digit OTP sent to your {otpMethod}:</p>
            <input
              type="text"
              maxLength={6}
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center tracking-widest text-xl p-3 rounded-md border border-[#b0cde1] mb-3"
              placeholder="______"
            />
            {error && <p className="text-red-500 mb-3">{error}</p>}

            <button
              onClick={verifyOtp}
              className="px-6 py-3 bg-[#31d7c9] text-black font-semibold rounded-xl hover:scale-105 transition shadow-md"
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="text-xs text-[#6f8fa1] mt-6">
          You will receive the OTP on your chosen method. This is a demo; in a real app, OTP is sent securely via SMS or Email.
        </p>
      </div>
    </div>
  );
};

export default Verification;

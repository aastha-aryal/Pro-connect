import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaLock, FaClock, FaArrowRight, FaPaperPlane, FaShieldAlt } from "react-icons/fa";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "user";

  const title =
    userType === "provider"
      ? "Professional Account Created Successfully!"
      : "Account Registration Successful!";

  const subtitle = userType === "provider" 
    ? "Your professional profile has been created and is pending verification"
    : "Welcome to our platform! Your account is ready for activation";

  // OTP logic
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  // Simulate sending OTP to Email
  const sendOtp = () => {
    setLoading(true);
    setError("");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate backend OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log(`Simulated Email OTP: ${otp}`);
    }, 1500);
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...enteredOtp];
    newOtp[index] = value;
    setEnteredOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    const enteredOtpString = enteredOtp.join("");
    if (enteredOtpString === generatedOtp) {
      alert("OTP Verified Successfully! Redirecting to homepage...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setError("Invalid OTP. Please try again.");
      setEnteredOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    }
  };

  // Resend OTP
  const resendOtp = () => {
    if (timer > 0) return;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setTimer(60);
    setError("");
    setEnteredOtp(["", "", "", "", "", ""]);
    
    // Start timer again
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    alert("New OTP has been sent to your email!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Left Side - Information Panel */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <FaShieldAlt className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold">Secure Verification</h1>
            </div>

            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <p className="text-gray-300 mb-8 text-lg">{subtitle}</p>

            <div className="space-y-6">
              {/* Verification Steps */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Account Registration</h3>
                  <p className="text-gray-400">Your account details have been successfully saved in our secure database.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Verification</h3>
                  <p className="text-gray-400">A 6-digit OTP will be sent to your registered email address for verification.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Complete Setup</h3>
                  <p className="text-gray-400">Enter the OTP to verify your identity and complete the registration process.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <FaLock className="text-gray-400" />
              <p className="text-gray-400 text-sm">
                Your information is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Verification Panel */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              {otpSent ? (
                <FaEnvelope className="text-3xl text-gray-700" />
              ) : (
                <FaCheckCircle className="text-3xl text-gray-700" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {otpSent ? "Enter Verification Code" : "Verify Your Email"}
            </h3>
            <p className="text-gray-600">
              {otpSent 
                ? "Enter the 6-digit code sent to your email address"
                : "Click the button below to receive a verification code"}
            </p>
          </div>

          {/* Send OTP Section */}
          {!otpSent && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaEnvelope className="text-gray-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Email Verification</h4>
                    <p className="text-sm text-gray-600">OTP will be sent to your registered email</p>
                  </div>
                </div>
                
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Verification Code
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p className="flex items-center justify-center gap-2">
                  <FaClock className="text-gray-400" />
                  OTP will expire in 10 minutes
                </p>
              </div>
            </div>
          )}

          {/* Verify OTP Section */}
          {otpSent && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex justify-center gap-3 mb-6">
                    {enteredOtp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                        }}
                        className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="text-center text-red-600 bg-red-50 py-2 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={verifyOtp}
                    disabled={enteredOtp.join("").length !== 6}
                    className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify & Continue <FaArrowRight />
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-2">Didn't receive the code?</p>
                  <button
                    onClick={resendOtp}
                    disabled={timer > 0}
                    className={`text-sm font-medium ${timer > 0 ? "text-gray-400" : "text-gray-900 hover:text-gray-700"}`}
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${!otpSent ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                    <span className={`text-sm ${!otpSent ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                      Request OTP
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gray-300 mx-4"></div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${otpSent ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                    <span className={`text-sm ${otpSent ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                      Verify OTP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
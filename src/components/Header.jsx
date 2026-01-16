import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate,useLocation} from "react-router-dom";
import { HiX, HiLogout, HiLocationMarker, HiUser } from "react-icons/hi";
import Logo from "../assets/logo.png"; //

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, setRole] = useState("customer");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [location, setLocation] = useState("Select Location");
  const [locationVerified, setLocationVerified] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
const locationPath = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isLoggedIn = !!token;
  const userName = userData.name || "User";
  const dropdownRef = useRef(null);

 // ✅ FIXED: prevent redirect flickering
  useEffect(() => {
    if (!token || !userData.role) return;

    const isDashboard =
      locationPath.pathname.startsWith("/customer-dashboard") ||
      locationPath.pathname.startsWith("/provider-dashboard");

    if (!isDashboard) {
      navigate(
        userData.role === "customer"
          ? "/customer-dashboard"
          : "/provider-dashboard",
        { replace: true }
      );
    }
  }, [token, userData.role, locationPath.pathname, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "unset";
  }, [drawerOpen]);


  // Detect location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
          setLocationVerified(true);
        },
        () => {
          setLocation("Location access was denied");
          setLocationVerified(false);
        }
      );
    } 
  };

  // Validate login form
  const validate = () => {
    let valid = true;
    const errs = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      errs.email = "Please enter a valid email";
      valid = false;
    }

    if (loginData.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!locationVerified) {
      alert("Please enable location services to continue.");
      detectLocation();
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      // Simulate login
      const fakeToken = "proconnect_logged_in_user";
      const mockUserData = {
        id: 1,
        name: loginData.email.split("@")[0],
        email: loginData.email,
        role,
        location,
      };

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userData", JSON.stringify(mockUserData));
      localStorage.setItem("role", role);

      navigate(role === "customer" ? "/customer-dashboard" : "/provider-dashboard", {
        replace: true,
      });
      setDrawerOpen(false);
    } catch {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("role");
    setLocationVerified(false);
    setLocation("Select Location");
    setDropdownOpen(false);
    navigate("/", { replace: true });
  };

  // Go to profile dashboard
  const goToProfile = () => {
    setDropdownOpen(false);
    navigate(userData.role === "customer" ? "/customer-dashboard" : "/provider-dashboard");
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "unset";
  }, [drawerOpen]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
               <img
            src={Logo} 
            alt="Pro-Connect Logo"
            className="w-10 h-10 md:w-12 md:h-12 relative z-10 rounded-full shadow-md"
          />
              <div className="hidden sm:block">
                <span className="text-4xl font-bold text-black">Pro-</span>
                <span className="text-3xl font-bold text-gray-400">Connect</span>
              </div>
            </Link>

            <div className="relative flex items-center gap-2.5">
        
            {/* Nav Links */}
            <nav className="flex items-center space-x-10">
              <Link to="/about" className="text-gray-600 hover:text-black font-medium text-base transition-colors duration-200 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/faq" className="text-gray-600 hover:text-black font-medium text-base transition-colors duration-200 relative group">
                FAQs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {!isLoggedIn ? (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="px-8 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center space-x-5" ref={dropdownRef}>
                 
                  {/* User Button with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                        <span className="text-white font-bold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 hidden md:block">{userName}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                        {/* User Info */}
                        <div className="px-5 py-4 border-b border-gray-100">
                          <p className="font-bold text-gray-900 text-lg">{userName}</p>
                          <p className="text-sm text-gray-500 capitalize mt-1">{userData.role || "User"}</p>
                        </div>

                        {/* Profile Button */}
                        <button
                          onClick={goToProfile}
                          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 text-left transition-colors duration-200 group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <HiUser className="text-gray-600 text-lg" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">My Profile</p>
                            <p className="text-xs text-gray-500 mt-0.5">Go to your dashboard</p>
                          </div>
                        </button>

                        {/* Logout Button */}
                        <div className="border-t border-gray-100 pt-2 px-3 mt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold transform hover:scale-[1.02]"
                          >
                            <HiLogout className="text-lg" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
        </div>
      </header>

      {/* Login Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          drawerOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            drawerOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Drawer Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-gray-50 to-white">
              <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <HiX className="text-gray-700 text-2xl group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* Location */}
              <div className={`mb-8 p-5 rounded-2xl border-2 transition-all duration-300 ${
                locationVerified 
                  ? 'bg-linear-to-br from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-linear-to-br from-gray-50 to-slate-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      locationVerified ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      <HiLocationMarker className={`text-xl ${locationVerified ? "text-green-600" : "text-blue-500"}`} />
                    </div>
                    <span className={`font-bold text-base ${locationVerified ? "text-green-700" : "text-gray-600"}`}>
                      {locationVerified ? "Location Verified ✓" : "Location Required"}
                    </span>
                  </div>
                  <button
                    onClick={detectLocation}
                    className="px-5 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Allow Loaction
                  </button>
                </div>
                <p className={`text-sm font-semibold ml-1 ${locationVerified ? "text-green-600" : "text-gray-600"}`}>
                  {location}
                </p>
                {!locationVerified && (
                  <p className="text-xs text-red-600 mt-2 ml-1 font-medium">⚠ Enable location to continue</p>
                )}
              </div>

              {/* Login Form */}
              <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                {/* Role Selector */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                      role === "customer"
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("provider")}
                    className={`px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                      role === "provider"
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    Provider
                  </button>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-black focus:outline-none transition-colors duration-200 text-gray-800 font-medium"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-black focus:outline-none transition-colors duration-200 text-gray-800 font-medium"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-5 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Registration Links */}
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-5 font-semibold">Don't have an account?</p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/register-customer"
                    onClick={() => setDrawerOpen(false)}
                    className="px-7 py-3 rounded-xl border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Register as Customer
                  </Link>
                  <Link
                    to="/register-provider"
                    onClick={() => setDrawerOpen(false)}
                    className="px-7 py-3 rounded-xl border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Register as Provider
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logout */}
      {isLoggedIn && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={handleLogout}
            className="px-5 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 flex items-center space-x-2 shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <HiLogout className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
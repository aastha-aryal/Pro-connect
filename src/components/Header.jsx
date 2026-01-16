import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiX, HiLogout, HiLocationMarker } from "react-icons/hi";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, setRole] = useState("customer"); // customer | provider
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [location, setLocation] = useState("Select Location");
  const [locationVerified, setLocationVerified] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isLoggedIn = !!token;
  const userName = userData.name || "User";

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && userData.role) {
      navigate(
        userData.role === "customer"
          ? "/customer-dashboard"
          : "/provider-dashboard",
        { replace: true }
      );
    }
  }, [isLoggedIn, userData.role, navigate]);

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
          setLocation("Location access denied");
          setLocationVerified(false);
        }
      );
    } else {
      setLocation("Not supported");
      setLocationVerified(false);
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
    navigate("/", { replace: true });
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "unset";
  }, [drawerOpen]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#c49b6f] to-[#a67c52] flex items-center justify-center">
                <span className="text-white font-bold text-xl">PC</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">Pro</span>
                <span className="text-xl font-bold text-gray-500">Connect</span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center space-x-8">
              <Link to="/about" className="text-gray-700 hover:text-[#a67c52] font-medium">
                About Us
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-[#a67c52] font-medium">
                FAQs
              </Link>

              {!isLoggedIn ? (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="px-6 py-2 bg-[#c49b6f] text-white rounded-lg hover:bg-[#a67c52] font-medium transition-colors shadow-sm"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                    <HiLocationMarker className="text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{location}</span>
                  </div>
                  <button
                    onClick={() =>
                      navigate(userData.role === "customer" ? "/customer-dashboard" : "/provider-dashboard")
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c49b6f] to-[#a67c52] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 hidden md:block">{userName}</span>
                  </button>
                </div>
              )}
            </nav>
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
            drawerOpen ? "opacity-30" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HiX className="text-gray-700 text-xl" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Location */}
              <div className="mb-8 p-4 bg-gradient-to-r from-[#f5f2ea] to-[#e8f1f2] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HiLocationMarker className={locationVerified ? "text-green-600" : "text-yellow-600"} />
                    <span className={`font-medium ${locationVerified ? "text-green-600" : "text-yellow-600"}`}>
                      {locationVerified ? "Location Verified ✓" : "Location Required"}
                    </span>
                  </div>
                  <button
                    onClick={detectLocation}
                    className="text-sm text-[#a67c52] hover:text-[#8b6a4a] font-medium"
                  >
                    Detect
                  </button>
                </div>
                <p className={`text-sm font-medium ${locationVerified ? "text-green-600" : "text-gray-700"}`}>
                  {location}
                </p>
                {!locationVerified && <p className="text-xs text-red-600 mt-1">⚠ Please enable location services to continue</p>}
              </div>

              {/* Login Form */}
              <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                {/* Role Selector */}
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`px-5 py-2 rounded-full font-medium border transition ${
                      role === "customer"
                        ? "bg-[#c49b6f] text-white border-[#c49b6f]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("provider")}
                    className={`px-5 py-2 rounded-full font-medium border transition ${
                      role === "provider"
                        ? "bg-[#c49b6f] text-white border-[#c49b6f]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Service Provider
                  </button>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="example@gmail.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#c49b6f] text-white rounded-xl font-semibold"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Registration Links */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 mb-4 font-medium">Don't have an account? Register as:</p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/register-customer"
                    onClick={() => setDrawerOpen(false)}
                    className="px-5 py-2 rounded-xl border border-[#c49b6f] text-[#a67c52] hover:bg-[#c49b6f]/10 transition-colors"
                  >
                    Customer
                  </Link>
                  <Link
                    to="/register-provider"
                    onClick={() => setDrawerOpen(false)}
                    className="px-5 py-2 rounded-xl border border-[#c49b6f] text-[#a67c52] hover:bg-[#c49b6f]/10 transition-colors"
                  >
                    Service Provider
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logout */}
      {isLoggedIn && (
        <div className="md:hidden fixed bottom-4 right-4 z-40">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 flex items-center space-x-2 shadow-sm"
          >
            <HiLogout />
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Header;

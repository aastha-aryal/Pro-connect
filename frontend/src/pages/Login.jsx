import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer"); // customer | provider
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token && savedRole) {
      navigate(
        savedRole === "customer"
          ? "/customer-dashboard"
          : "/provider-dashboard",
        { replace: true }
      );
    }
  }, [navigate]);

  const validate = () => {
    let valid = true;
    let errs = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      errs.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (loginData.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // ✅ Simulate login
      const fakeToken = "proconnect_logged_in_user";

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("role", role);

      // Navigate to correct dashboard
      navigate(
        role === "customer" ? "/customer-dashboard" : "/provider-dashboard",
        { replace: true }
      );
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f5f2ea] to-[#e8f1f2] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-[#e5d9c4]">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Log in to your account to continue
        </p>

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

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#c49b6f] text-white rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4 font-medium">
            Don't have an account? Register as:
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/register-customer")}
              className="px-5 py-2 rounded-xl border border-[#c49b6f]"
            >
              Customer
            </button>
            <button
              onClick={() => navigate("/register-provider")}
              className="px-5 py-2 rounded-xl border border-[#c49b6f]"
            >
              Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

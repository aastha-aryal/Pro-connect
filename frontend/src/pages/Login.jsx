import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer"); // customer or provider
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace this with your actual login API call
      // Example:
      // const res = await axios.post("/api/login", loginData);
      // localStorage.setItem("token", res.data.token);
      console.log("Logging in:", loginData, "as", role);
      alert(`Logged in as ${role}`);
      // Redirect based on role
      navigate(role === "customer" ? "/customer-dashboard" : "/provider-dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7faff] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Login</h1>
        <p className="text-gray-500 mb-6 text-center">Welcome back! Log in to your account.</p>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("customer")}
            className={`px-4 py-2 rounded-full font-medium border transition ${
              role === "customer" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole("provider")}
            className={`px-4 py-2 rounded-full font-medium border transition ${
              role === "provider" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Service Provider
          </button>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-500 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-teal-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/register-customer")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

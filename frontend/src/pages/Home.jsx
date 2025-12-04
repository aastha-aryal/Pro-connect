import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


/* ------------------- Decorative Droplets ---------------------- */
const Droplets = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        size: Math.random() * 7 + 3 + "px",
        duration: Math.random() * 6 + 4 + "s",
      });
    }
    setDrops(temp);
  }, []);

  return drops.map((drop) => (
    <div
      key={drop.id}
      className="absolute bg-white/60 rounded-full animate-drop sparkle"
      style={{
        left: drop.left,
        top: drop.top,
        width: drop.size,
        height: drop.size,
        animationDuration: drop.duration,
      }}
    ></div>
  ));
};

const Home = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("");
  const [roleChoice, setRoleChoice] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  /* ------------------------- Logic (UNCHANGED) ------------------------- */

  const handleRoleSelect = (role) => {
    setRoleChoice(role);
    if (modalType === "register") {
      if (role === "customer") navigate("/register-customer");
      else navigate("/register-provider");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const temp = {};
    if (!formData.email) temp.email = "Email is required *";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      temp.email = "Enter a valid email *";

    if (!formData.password) temp.password = "Password is required *";
    else if (formData.password.length < 8)
      temp.password = "Password must be at least 8 characters *";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(`Logged in as ${roleChoice}`);
    navigate(
      roleChoice === "customer" ? "/customer-dashboard" : "/provider-dashboard"
    );

    setModalType("");
    setRoleChoice("");
    setErrors({});
    setFormData({ email: "", password: "" });
  };

  const closeModal = () => {
    setModalType("");
    setRoleChoice("");
    setErrors({});
    setFormData({ email: "", password: "" });
  };

  /* -------------------------- UI ------------------------------ */

  return (
    
   <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden
     bg-linear-to-b from-[#18334f] to-[#445f7e] text-white">
    
      {/* Small floating droplets */}
      <Droplets />

      {/* Title */}
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-linear-to-r from-[#ffffff] via-[#00ffff] to-[#ddb7c3] animate-gradient-x animate-soft-text-glow">
        Welcome to Pro-Connect</h1>

      {/* Sub-Title */}
      <p className="text-lg md:text-xl text-center mt-4 max-w-[600px] opacity-90 animate-fadeInSlow">
        Connecting you with trusted professionals for all your household needs.
      </p>

      {/* Buttons */}
      <div className="flex gap-8 mt-10 animate-popUp">
        <button
          onClick={() => setModalType("login")}
          className="px-10 py-4 rounded-2xl font-bold text-black
         bg-[#00F5FF]/90 shadow-xl hover:shadow-2xl hover:scale-110 transition duration-300 sparkle"
        >
          Login
        </button>

        <button
          onClick={() => setModalType("register")}
          className="px-10 py-4 rounded-2xl font-bold text-black
          bg-[#c13497] shadow-xl hover:shadow-2xl hover:scale-110 transition duration-300 sparkle"
        >
          Register
        </button>
      </div>
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-[#3fbec3] rounded-full opacity-10 animate-pulseSlow"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-[#41d5da] rounded-full opacity-10 animate-pulseSlow"></div>
      
      {/* ------------------ Modal ------------------ */}
      {modalType && (
        <div className="fixed inset-0 bg-grey backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-[#31404e] p-8 rounded-2xl shadow-xl w-[90%] md:w-[450px] relative animate-fadeInFast">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-3xl font-bold"
            >
              ×
            </button>

            {/* Choose Role */}
            {!roleChoice && (
              <>
                <h2 className="text-2xl text-center font-bold mb-6 sparkle">
                  {modalType === "login" ? "Login as" : "Register as"}
                </h2>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => handleRoleSelect("customer")}
                    className="px-6 py-3 bg-[#31d7c9] text-black font-semibold rounded-xl hover:scale-110 transition"
                  >
                    Customer
                  </button>

                  <button
                    onClick={() => handleRoleSelect("provider")}
                    className="px-6 py-3 bg-[#A772FF]/70 text-black font-semibold rounded-xl hover:scale-110 transition"
                  >
                    Service Provider
                  </button>
                </div>
              </>
            )}

            {/* Login Form */}
            {modalType === "login" && roleChoice && (
              <form
                onSubmit={handleLoginSubmit}
                className="mt-6 flex flex-col gap-3"
              >
                <h3 className="text-xl font-bold text-center mb-3">
                  Login as {roleChoice}
                </h3>

                <label>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@email.com"
                  className="w-full p-3 rounded-md bg-white text-black placeholder-gray-400 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}

                <label>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-3 rounded-md bg-white text-black placeholder-gray-400 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}

                <button
                  type="submit"
                  className="mt-3 py-3 bg-[#31d7c9] text-black font-bold rounded-xl hover:scale-105 transition"
                >
                  Login
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes drop {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(100vh) translateX(20px); }
        }
        .animate-drop {
          animation: drop linear infinite;
        }

        @keyframes fade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fade 1.5s ease forwards; }
        .animate-fadeInSlow { animation: fade 2.3s ease forwards; }

        @keyframes pop {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-popUp { animation: pop 1s ease forwards; }

        .sparkle {
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.6));
        }
      `}</style>
    </div>
  );
};

export default Home;

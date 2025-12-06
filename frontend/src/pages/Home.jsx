// frontend/src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerCustomer, login as loginCustomer } from "../services/auth";
import { registerServiceProvider, loginServiceProvider } from "../services/serviceProvider";

// 16 services with placeholder images
const SERVICES = [
  { id: 1, title: "Plumber", img: "/assets/services/plumber.jpg" },
  { id: 2, title: "Electrician", img: "/assets/services/electrician.jpg" },
  { id: 3, title: "Home Tutors", img: "/assets/services/tutor.jpg" },
  { id: 4, title: "Painter", img: "/assets/services/painter.jpg" },
  { id: 5, title: "House Help", img: "/assets/services/cleaner.jpg" },
  { id: 6, title: "Babysitters", img: "/assets/services/babysitter.jpg" },
  { id: 7, title: "Beauty & Salon", img: "/assets/services/beautician.jpg" },
  { id: 8, title: "Event Decorators / Band Baja", img: "/assets/services/bandbaja.jpg" },
  { id: 9, title: "Carpenter", img: "/assets/services/carpenter.jpg" },
  { id: 10, title: "Photographer", img: "/assets/services/photographer.jpg" },
  { id: 11, title: "Band Baja", img: "/assets/services/bandbaja.jpg" },
  { id: 12, title: "Private Chef", img: "/assets/services/chef.jpg" },
  { id: 13, title: "Locksmith", img: "/assets/services/locksmith.jpg" },
  { id: 14, title: "Boutiques / Tailoring", img: "/assets/services/boutique.jpg" },
  { id: 15, title: "Movers & Packers", img: "/assets/services/movers.jpg" },
  { id: 16, title: "Catering Server", img: "/assets/services/catering.jpg" },
];

const TESTIMONIALS = [
  { id: 1, name: "Sita", text: "Quick, reliable, and courteous. Found a great electrician in 30 minutes!" },
  { id: 2, name: "Ramesh", text: "Pro-Connect helped me find a tutor for my child. Highly recommended." },
];

const BLOGS = [
  { id: 1, title: "How to choose a reliable plumber", excerpt: "Simple tips to verify experience, rates, and reviews." },
  { id: 2, title: "5 questions to ask your electrician", excerpt: "Make sure the job is safe and long-lasting." },
];

const Home = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(""); // "login" or "register"
  const [roleChoice, setRoleChoice] = useState(""); // "customer" or "provider"
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setRoleChoice(role);
    if (modalType === "register") {
      if (role === "customer") navigate("/register-customer");
      else navigate("/register-provider");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const temp = {};
    if (!formData.email) temp.email = "Email is required *";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = "Enter a valid email *";

    if (!formData.password) temp.password = "Password is required *";
    else if (formData.password.length < 8) temp.password = "Password must be at least 8 characters *";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let res;
      if (roleChoice === "customer") res = await loginCustomer(formData);
      else res = await loginServiceProvider(formData);

      const token = res.data.token;
      if (token) localStorage.setItem("token", token);
      navigate(roleChoice === "customer" ? "/customer-dashboard" : "/provider-dashboard");

      setModalType("");
      setRoleChoice("");
      setFormData({ email: "", password: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed — check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalType("");
    setRoleChoice("");
    setErrors({});
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-[#fef9f3] text-gray-800">
      {/* HERO */}
      <section className="pt-16 pb-20 bg-[#fef9f3]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1a1a1a]">
              Find trusted professionals near you — fast.
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Pro-Connect helps you hire verified electricians, plumbers, tutors, cleaners, and more — with transparent pricing and real reviews.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/register-customer")}
                className="px-6 py-3 rounded-md bg-[#d6bca6] text-white font-semibold shadow hover:scale-105 transition"
              >
                Become a Customer
              </button>
              <button
                onClick={() => navigate("/register-provider")}
                className="px-6 py-3 rounded-md bg-white border border-gray-200 text-gray-800 font-semibold hover:shadow-lg transition"
              >
                Become a Provider
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-gray-600 text-sm">
             
            </div>
          </div>
          <div className="order-first md:order-last">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
              <img src="/assets/hero/hero-phone.png" alt="app preview" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Services</h2>
          <p className="text-gray-600 mb-6">Common tasks solved by local professionals.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow p-4 hover:shadow-2xl hover:scale-105 transform transition-all cursor-pointer"
                onClick={() => alert(`Open ${s.title} service page`)}
              >
                <div className="h-40 w-full overflow-hidden rounded-lg mb-3">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition transform hover:scale-110" />
                </div>
                <h3 className="font-semibold text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Trusted local professionals</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Tell Us What You Need", "Get Matched", "Compare & Book", "Rate & Review"].map((step, idx) => (
              <div key={idx} className="bg-white p-6 border rounded-lg hover:shadow-xl transition transform hover:scale-105">
                <div className="text-3xl font-bold mb-2">{idx + 1}</div>
                <h4 className="font-semibold text-gray-800">{step}</h4>
                <p className="text-gray-500 text-sm mt-1">
                  {step === "Tell Us What You Need" && "Describe the task and preferred time."}
                  {step === "Get Matched" && "We show qualified professionals nearby."}
                  {step === "Compare & Book" && "View reviews and transparent pricing."}
                  {step === "Rate & Review" && "Share feedback to help others."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & BLOG */}
      <section id="blog" className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">What customers say</h3>
            <div className="space-y-4">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="p-4 bg-white border rounded-lg hover:shadow-lg transition cursor-pointer">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-gray-600 text-sm mt-1">{t.text}</div>
                </div>
              ))}
            </div>
          </div>
          <aside>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">From our blog</h3>
            <div className="space-y-3">
              {BLOGS.map((b) => (
                <div
                  key={b.id}
                  className="p-3 bg-white border rounded-lg hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/blog/${b.id}`)}
                >
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-gray-500 text-sm mt-1">{b.excerpt}</div>
                </div>
              ))}
              <button onClick={() => navigate("/blog")} className="mt-3 text-sm text-[#0ea5a4] hover:underline">
                View all articles
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Home;

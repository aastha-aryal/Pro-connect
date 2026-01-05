// frontend/src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerCustomer, login as loginCustomer } from "../services/auth";
import { registerServiceProvider, loginServiceProvider } from "../services/serviceProvider";

// Services
import plumber from "../assets/services/plumber.jpeg";
import electrician from "../assets/services/electrician.jpeg";
import tutor from "../assets/services/tutor.jpeg";
import painter from "../assets/services/painter.jpeg";
import cleaner from "../assets/services/cleaner.jpeg";
import babysitter from "../assets/services/babysitter.jpeg";
import beautician from "../assets/services/beautician.jpeg";
import decorator from "../assets/services/event-decorators.jpeg";
import carpenter from "../assets/services/carpenter.jpeg";
import photographer from "../assets/services/photographer.jpeg";
import bandbaja from "../assets/services/bandbaja.jpeg";
import chef from "../assets/services/chef.jpeg";
import locksmith from "../assets/services/locksmith.jpeg";
import tailoring from "../assets/services/tailoring.jpeg";
import movers from "../assets/services/movers.jpeg";
import catering from "../assets/services/catering.jpeg";

const SERVICES = [
  { id: 1, title: "Plumber", img: plumber },
  { id: 2, title: "Electrician", img: electrician },
  { id: 3, title: "Home Tutors", img: tutor },
  { id: 4, title: "Painter", img: painter },
  { id: 5, title: "House Help", img: cleaner },
  { id: 6, title: "Babysitters", img: babysitter },
  { id: 7, title: "Beauty & Salon", img: beautician },
  { id: 8, title: "Event Decorators", img: decorator },
  { id: 9, title: "Carpenter", img: carpenter },
  { id: 10, title: "Photographer", img: photographer },
  { id: 11, title: "Band Baja", img: bandbaja },
  { id: 12, title: "Private Chef", img: chef },
  { id: 13, title: "Locksmith", img: locksmith },
  { id: 14, title: "Boutiques & Tailoring", img: tailoring },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Catering Server", img: catering },
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
  const [modalType, setModalType] = useState("");
  const [roleChoice, setRoleChoice] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#fef9f3] text-gray-800">
      {/* HERO */}
      <section className="pt-16 pb-20 bg-[#fef9f3]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1a1a1a]">
              Find trusted professionals near you — fast.
            </h1>
           
            <p className="mt-4 text-gray-700 max-w-xl">
              New here? Register now and get professional services delivered straight to your door! It's quick, easy, and hassle-free — one click and your help is on the way.
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
          </div>

          <div className="order-first md:order-last">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                App preview coming soon....
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 mb-6">Services available in our app.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow p-4 hover:shadow-2xl hover:scale-110 transform transition-all cursor-pointer"
              >
                <div className="h-40 w-full overflow-hidden rounded-lg mb-1">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-100 transition" />
                </div>
                <h3 className="font-semibold text-gray-800">{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

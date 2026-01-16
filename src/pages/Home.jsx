// frontend/src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBolt, FaFemale, FaMale, FaBroom, FaWrench,
  FaSearch, FaCheckCircle, FaTools, FaUsers, FaStar,
  FaArrowRight, FaClock, FaShieldAlt, FaThumbsUp,
  FaUser, FaMapMarkerAlt, FaEnvelope, FaLock
} from "react-icons/fa";

// Services images
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
  { id: 1, title: "Plumber", img: plumber, category: "home" },
  { id: 2, title: "Electrician", img: electrician, category: "home" },
  { id: 3, title: "Home Tutors", img: tutor, category: "education" },
  { id: 4, title: "Painter", img: painter, category: "home" },
  { id: 5, title: "House Help", img: cleaner, category: "home" },
  { id: 6, title: "Babysitters", img: babysitter, category: "care" },
  { id: 7, title: "Beauty & Salon", img: beautician, category: "beauty" },
  { id: 8, title: "Event Decorators", img: decorator, category: "events" },
  { id: 9, title: "Carpenter", img: carpenter, category: "home" },
  { id: 10, title: "Photographer", img: photographer, category: "events" },
  { id: 11, title: "Band Baja", img: bandbaja, category: "events" },
  { id: 12, title: "Private Chef", img: chef, category: "food" },
  { id: 13, title: "Locksmith", img: locksmith, category: "home" },
  { id: 14, title: "Boutiques & Tailoring", img: tailoring, category: "fashion" },
  { id: 15, title: "Movers & Packers", img: movers, category: "home" },
  { id: 16, title: "Catering Server", img: catering, category: "food" },
];

const QUICK_SERVICES = [
  { icon: <FaBolt />, title: "Insta Help", subtitle: "4 Help in 10 mins", color: "from-yellow-400 to-orange-500", isNew: true },
  { icon: <FaFemale />, title: "Women's Salon & Spa", color: "from-pink-500 to-purple-500" },
  { icon: <FaMale />, title: "Men's Salon & Massage", color: "from-blue-500 to-cyan-500" },
  { icon: <FaBroom />, title: "Cleaning & Pest Control", color: "from-green-500 to-emerald-500" },
  { icon: <FaWrench />, title: "Electrician, Plumber & Water Purifier", color: "from-indigo-500 to-blue-500" },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "customer",
    locationGranted: false,
    locationLoading: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO SECTION (Like your first image) */}
      <section className="pt-8 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
                Find trusted professionals near you — fast.
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                New here? Register now and get professional services delivered straight to your door! 
                It's quick, easy, and hassle-free — one click and your help is on the way.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => navigate("/register-customer")}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#2a4f77] to-[#00a8ff] text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Become a Customer
                </button>
                <button
                  onClick={() => navigate("/register-provider")}
                  className="px-8 py-3 rounded-full bg-white border-2 border-[#2a4f77] text-[#2a4f77] font-bold hover:bg-[#2a4f77] hover:text-white transition-all"
                >
                  Become a Provider
                </button>
              </div>
            </div>

            {/* Right Side - Photo Collage (Different sized images) */}
            <div className="relative h-[400px] md:h-[500px]">
              {/* Main collage container */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-3 md:gap-4 p-2">
                {/* Large vertical image (top left) */}
                <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={electrician} 
                    alt="Electrician at work" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Medium horizontal image (top right) */}
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg transform -translate-y-2">
                  <img 
                    src={plumber} 
                    alt="Plumber fixing pipes" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Small square image (middle right) */}
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg transform translate-x-2">
                  <img 
                    src={cleaner} 
                    alt="House cleaning service" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Large horizontal image (bottom left) */}
                <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-xl transform -translate-y-3">
                  <img 
                    src={carpenter} 
                    alt="Carpenter working" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Small vertical image (bottom right) */}
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg transform translate-x-4 translate-y-2">
                  <img 
                    src={painter} 
                    alt="Painter painting wall" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-100 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - URBANCLAP STYLE */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#2a4f77] focus:outline-none focus:shadow-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Services Grid (Like UrbanClap) */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Popular Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {QUICK_SERVICES.map((service, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${service.color} rounded-xl p-4 cursor-pointer transform hover:scale-105 transition-all hover:shadow-xl text-white relative`}
                >
                  {service.isNew && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                  {service.subtitle && (
                    <p className="text-xs opacity-90">{service.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {SERVICES.map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all p-2 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <div className="aspect-square mb-2 rounded-lg overflow-hidden">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-800 text-center line-clamp-2">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Pro-Connect?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaCheckCircle className="text-4xl text-[#2a4f77]" />,
                  title: "Verified Professionals",
                  desc: "Every provider is verified to ensure trust and reliability."
                },
                {
                  icon: <FaTools className="text-4xl text-[#2a4f77]" />,
                  title: "All Services in One Place",
                  desc: "Hire electricians, tutors, cleaners, decorators & more."
                },
                {
                  icon: <FaUsers className="text-4xl text-[#2a4f77]" />,
                  title: "Easy & Fast",
                  desc: "Find nearby professionals within seconds — no hassle."
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">{card.title}</h3>
                  <p className="text-gray-600 text-center">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-8 bg-gradient-to-r from-[#2a4f77] to-[#00a8ff] rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-8 text-center">
              How Pro-Connect Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "1", title: "Select Your Service", desc: "Choose from 16+ categories available." },
                { num: "2", title: "Compare Professionals", desc: "Check experience, ratings, and reviews." },
                { num: "3", title: "Connect & Hire", desc: "Request the provider directly — simple!" },
              ].map((step, i) => (
                <div
                  key={i}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="opacity-90">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                { q: "Is Pro-Connect free to use?", a: "Yes! Both customers and providers can register and use the platform for free." },
                { q: "How do I register?", a: "Choose whether you are a customer or provider, fill in your details, and you're ready to begin." },
                { q: "Do you include service charges?", a: "No, charges are negotiated directly between the customer and provider." },
                { q: "Can I cancel a request?", a: "Yes, anytime before the provider accepts your request." },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-xl hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-[#2a4f77]">{faq.q}</h3>
                  <p className="text-gray-600 mt-2">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Anish", review: "Found an electrician within minutes — super easy and reliable!" },
                { name: "Sujata", review: "Hired a tutor for my brother. The process was smooth and fast." },
                { name: "Ramesh", review: "Loved how quickly Pro-Connect suggested verified professionals!" },
              ].map((r, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                  </div>
                  <p className="text-gray-700 text-center mb-4 italic">"{r.review}"</p>
                  <h4 className="font-semibold text-[#2a4f77] text-center">– {r.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#2a4f77] to-[#00a8ff] rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users finding trusted service providers every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register-customer")}
              className="px-8 py-4 bg-white text-[#2a4f77] font-bold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Join Pro-Connect Now
            </button>
          </div>
        </div>
      </main>

      

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsLoginOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md h-[90vh] rounded-t-2xl shadow-2xl animate-slideUp">
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Login to Pro-Connect</h2>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-4 border-2 border-blue-500 rounded-xl text-blue-600 font-semibold">
                  Customer
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-blue-500">
                  Service Provider
                </button>
              </div>
              
              {/* Login Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    <FaLock className="inline mr-2" />
                    Password
                  </label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#2a4f77] to-[#00a8ff] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </form>
              
              <div className="text-center mt-4">
                <button className="text-blue-600 hover:underline">
                  Don't have an account? Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
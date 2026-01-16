import React, { useState } from "react";
import { FaCheckCircle, FaTools, FaUsers, FaStar, FaUserPlus, FaBriefcase } from 'react-icons/fa';

// Placeholder images for demo
const plumber = "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400";
const electrician = "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400";
const tutor = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400";
const painter = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400";
const cleaner = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";
const babysitter = "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400";
const beautician = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400";
const decorator = "https://images.unsplash.com/photo-1519741497674-611481863552?w=400";
const carpenter = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400";
const photographer = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400";
const bandbaja = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400";
const chef = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400";
const locksmith = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400";
const sofaCleaner = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400";
const movers = "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400";
const waterproofing = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";

const SERVICES = [
  { id: 1, title: "Plumber", img: plumber },
  { id: 2, title: "Electrician", img: electrician },
  { id: 3, title: "Home Tutors", img: tutor },
  { id: 4, title: "Painter", img: painter },
  { id: 5, title: "House Help", img: cleaner },
  { id: 6, title: "Babysitters", img: babysitter },
  { id: 7, title: "Laundry", img: beautician },
  { id: 8, title: "Event Decorators", img: decorator },
  { id: 9, title: "Carpenter", img: carpenter },
  { id: 10, title: "Photographer", img: photographer },
  { id: 11, title: "Band Baja", img: bandbaja },
  { id: 12, title: "Private Chef", img: chef },
  { id: 13, title: "Locksmith", img: locksmith },
  { id: 14, title: "Sofa/Carpet Cleaner", img: sofaCleaner },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Waterproofing", img: waterproofing },
];

const COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400",
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (path) => {
    console.log("Navigate to:", path);
  };

  const handleServiceClick = (serviceId) => {
    console.log("Service clicked:", serviceId);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* HERO SECTION */}
      <section className="pt-12 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            
            {/* Left Side - Text Content (2 columns) */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-5 animate-fade-in">
                Find trusted professionals near you — fast.
              </h1>
              
              <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                New here? Register now and get professional services delivered straight to your door! 
                It's quick, easy, and hassle-free.
              </p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                <button
                  onClick={() => handleNavigate("/register-customer")}
                  className="group relative px-6 py-4 rounded-xl bg-linear-to-r from-slate-800 to-slate-700 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-slate-700 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <FaUserPlus className="w-5 h-5" />
                    <span>Become a Customer</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleNavigate("/register-provider")}
                  className="group relative px-6 py-4 rounded-xl bg-white border-2 border-slate-300 text-slate-800 font-semibold hover:border-slate-800 hover:bg-slate-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaBriefcase className="w-5 h-5" />
                    <span>Become a Provider</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Side - Premium Collage (3 columns) */}
            <div className="lg:col-span-3 relative w-full h-[450px] lg:h-[550px]">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-3">
                {/* Large top-left image */}
                <div className="col-span-7 row-span-7 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
                  <img 
                    src={COLLAGE_IMAGES[1]}
                    alt="Electrician" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Top-right small square */}
                <div className="col-start-8 col-span-5 row-span-3 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <img 
                    src={COLLAGE_IMAGES[0]}
                    alt="Plumber" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Middle-right rectangle */}
                <div className="col-start-8 row-start-4 col-span-5 row-span-4 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <img 
                    src={COLLAGE_IMAGES[4]}
                    alt="House Help" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-left wide rectangle */}
                <div className="col-span-5 row-start-8 row-span-5 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <img 
                    src={COLLAGE_IMAGES[8]}
                    alt="Carpenter" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-middle */}
                <div className="col-start-6 row-start-8 col-span-4 row-span-3 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <img 
                    src={COLLAGE_IMAGES[3]}
                    alt="Painter" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-right tall */}
                <div className="col-start-10 row-start-8 col-span-3 row-span-5 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <img 
                    src={COLLAGE_IMAGES[6]}
                    alt="Beauty & Salon" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Small accent bottom */}
                <div className="col-start-6 row-start-11 col-span-4 row-span-2 rounded-3xl overflow-hidden shadow-lg animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <img 
                    src={COLLAGE_IMAGES[9]}
                    alt="Photographer" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <div className="mb-6 bg-linear-to-br from-slate-100 to-blue-50 rounded-2xl p-8 mx-4 md:mx-8 shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">
          Why Choose Pro-Connect?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <FaCheckCircle className="w-12 h-12" />,
              title: "Verified Professionals",
              desc: "Every provider is verified to ensure trust and reliability."
            },
            {
              icon: <FaTools className="w-12 h-12" />,
              title: "All Services in One Place",
              desc: "Hire electricians, tutors, cleaners, decorators & more."
            },
            {
              icon: <FaUsers className="w-12 h-12" />,
              title: "Easy & Fast",
              desc: "Find nearby professionals within seconds — no hassle."
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl hover:bg-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4 text-slate-700">{card.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-center text-slate-800">{card.title}</h3>
              <p className="text-slate-600 text-center text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-6 bg-white rounded-2xl p-8 mx-4 md:mx-8 shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">
          How Pro-Connect Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { num: "1", title: "Select Your Service", desc: "Choose from 16+ categories available." },
            { num: "2", title: "Compare Professionals", desc: "Check experience, ratings, and reviews." },
            { num: "3", title: "Connect & Hire", desc: "Request the provider directly — simple!" },
          ].map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-linear-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-4">
        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-8 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            {SERVICES.map(service => (
              <div
                key={service.id}
                className="group cursor-pointer border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50 transition-all duration-300"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={service.img}
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="font-semibold text-xs text-slate-800 group-hover:text-slate-600 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-6 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
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
                className="bg-linear-to-br from-slate-50 to-blue-50 p-5 rounded-xl hover:shadow-lg transition-all duration-300 border border-slate-100"
              >
                <h3 className="font-bold text-base text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-6 bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Anish", review: "Found an electrician within minutes — super easy and reliable!" },
              { name: "Sujata", review: "Hired a tutor for my brother. The process was smooth and fast." },
              { name: "Ramesh", review: "Loved how quickly Pro-Connect suggested verified professionals!" },
            ].map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="w-5 h-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-center mb-4 italic text-sm leading-relaxed">"{r.review}"</p>
                <h4 className="font-bold text-slate-800 text-center">– {r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
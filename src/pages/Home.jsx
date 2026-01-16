import React, { useState } from "react";
import { FaCheckCircle, FaTools, FaUsers, FaStar } from 'react-icons/fa';

// Import your local images
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
import sofaCleaner from "../assets/services/tailoring.jpeg";
import movers from "../assets/services/movers.jpeg";
import waterproofing from "../assets/services/catering.jpeg";

// Your local services
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
  { id: 14, title: "Sofa/Carpet Cleaner", img: sofaCleaner },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Waterproofing", img: waterproofing },
];

// Online images for collage (different from your local images)
const COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400", // Plumber
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400", // Electrician
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", // Tutor
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400", // Painter
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400", // House Help
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400", // Babysitter
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", // Beauty & Salon
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", // Event Decorator
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400", // Carpenter
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400", // Photographer
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (path) => {
    console.log("Navigate to:", path);
    // Add your navigation logic here
  };

  const handleServiceClick = (serviceId) => {
    console.log("Service clicked:", serviceId);
    // Add your service click logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="pt-8 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-black mb-4">
                Find trusted professionals near you — fast.
              </h1>
              
              <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
                New here? Register now and get professional services delivered straight to your door! 
                It's quick, easy, and hassle-free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => handleNavigate("/register-customer")}
                  className="px-7 py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Become a Customer
                </button>
                <button
                  onClick={() => handleNavigate("/register-provider")}
                  className="px-7 py-3 rounded-lg bg-white border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Become a Provider
                </button>
              </div>
            </div>

            {/* Right Side - Premium Collage (using online images) */}
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2">
                {/* Large top-left image */}
                <div className="col-span-7 row-span-7 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={COLLAGE_IMAGES[1]}
                    alt="Electrician" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Top-right small square */}
                <div className="col-start-8 col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={COLLAGE_IMAGES[0]}
                    alt="Plumber" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Middle-right rectangle */}
                <div className="col-start-8 row-start-4 col-span-5 row-span-4 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={COLLAGE_IMAGES[4]}
                    alt="House Help" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-left wide rectangle */}
                <div className="col-span-5 row-start-8 row-span-5 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={COLLAGE_IMAGES[8]}
                    alt="Carpenter" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-middle */}
                <div className="col-start-6 row-start-8 col-span-4 row-span-3 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={COLLAGE_IMAGES[3]}
                    alt="Painter" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Bottom-right tall */}
                <div className="col-start-10 row-start-8 col-span-3 row-span-5 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={COLLAGE_IMAGES[6]}
                    alt="Beauty & Salon" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Small accent bottom */}
                <div className="col-start-6 row-start-11 col-span-4 row-span-2 rounded-2xl overflow-hidden shadow-md">
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
      <div className="mb-4 bg-gray-100 rounded-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Choose Pro-Connect?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="bg-white/10 backdrop-blur-sm p-5 rounded-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{card.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-center">{card.title}</h3>
              <p className="text-gray-800 text-center text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-4 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          How Pro-Connect Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "Select Your Service", desc: "Choose from 16+ categories available." },
            { num: "2", title: "Compare Professionals", desc: "Check experience, ratings, and reviews." },
            { num: "3", title: "Connect & Hire", desc: "Request the provider directly — simple!" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto text-white shadow-lg">
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2 text-black">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-4">
        {/* Services Grid - 2 Rows Only (using YOUR local images) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-8 gap-0 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            {SERVICES.map(service => (
              <div
                key={service.id}
                className="group cursor-pointer border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors"
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
                  <h3 className="font-semibold text-xs text-black group-hover:text-gray-600 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-4 bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-3">
            {[
              { q: "Is Pro-Connect free to use?", a: "Yes! Both customers and providers can register and use the platform for free." },
              { q: "How do I register?", a: "Choose whether you are a customer or provider, fill in your details, and you're ready to begin." },
              { q: "Do you include service charges?", a: "No, charges are negotiated directly between the customer and provider." },
              { q: "Can I cancel a request?", a: "Yes, anytime before the provider accepts your request." },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-bold text-base text-black mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-4 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Anish", review: "Found an electrician within minutes — super easy and reliable!" },
              { name: "Sujata", review: "Hired a tutor for my brother. The process was smooth and fast." },
              { name: "Ramesh", review: "Loved how quickly Pro-Connect suggested verified professionals!" },
            ].map((r, i) => (
              <div key={i} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="w-6 h-6 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-center mb-3 italic text-sm">"{r.review}"</p>
                <h4 className="font-bold text-black text-center">– {r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
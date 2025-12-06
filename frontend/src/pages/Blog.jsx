import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaStar, FaUsers, FaTools } from "react-icons/fa";

const Blog = () => {
  const navigate = useNavigate(); // for button navigation

  return (
    <div className="w-full bg-[#f7fbff] text-gray-800">

      {/* ------------------------ HERO SECTION ------------------------ */}
      <section className="bg-linear-to-b from-[#e9f3ff] to-[#f7fbff] py-20 px-6 text-center animate-fadeInUp">
        <h1 className="text-5xl font-bold mb-4 text-[#1f2d3d] animate-pulse">
          Welcome to Pro-Connect
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-6 animate-fadeIn">
          Your trusted platform to hire skilled service providers — safely, quickly, 
          and effortlessly. Whether you need an electrician, tutor, chef, or decorator, 
          we connect you with verified professionals near you.
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-4 inline-block px-8 py-3 rounded-full text-lg font-bold bg-linear-to-r from-[#2a4f77] to-[#00f5ff] text-white shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce"
        >
          Get Started
        </button>
      </section>

      {/* ------------------------ ABOUT US SECTION ------------------------ */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center animate-fadeInUp delay-100">
        <h2 className="text-3xl font-bold mb-4 text-[#1f2d3d]">What is Pro-Connect?</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Pro-Connect is a simple platform designed to make skilled services accessible 
          to everyone. From household repairs to event services, tutors to chefs — 
          we bring all types of professionals under one digital roof so that finding 
          reliable help becomes effortless.
        </p>
      </section>

      {/* ------------------------ WHY CHOOSE US ------------------------ */}
      <section className="py-16 bg-white px-6 animate-fadeInUp delay-200">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#1f2d3d]">
          Why Choose Pro-Connect?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              className="bg-[#f9fcff] p-6 rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
              <p className="text-gray-600 text-center">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ HOW IT WORKS ------------------------ */}
      <section className="py-16 px-6 animate-fadeInUp delay-300">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#1f2d3d]">
          How Pro-Connect Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {[
            { num: "1", title: "Select Your Service", desc: "Choose from 16+ categories available." },
            { num: "2", title: "Compare Professionals", desc: "Check experience, ratings, and reviews." },
            { num: "3", title: "Connect & Hire", desc: "Request the provider directly — simple!" },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
            >
              <div className="text-5xl font-bold text-[#2a4f77] mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ FAQs ------------------------ */}
      <section className="py-16 bg-[#f7fbff] animate-fadeInUp delay-400">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#1f2d3d]">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          {[
            { q: "Is Pro-Connect free to use?", a: "Yes! Both customers and providers can register and use the platform for free." },
            { q: "How do I register?", a: "Choose whether you are a customer or provider, fill in your details, and you're ready to begin." },
            { q: "Do you include service charges?", a: "No, charges are negotiated directly between the customer and provider." },
            { q: "Can I cancel a request?", a: "Yes, anytime before the provider accepts your request." },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="font-semibold text-lg text-[#2a4f77]">{faq.q}</h3>
              <p className="text-gray-600 mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ TESTIMONIALS ------------------------ */}
      <section className="py-16 px-6 bg-white animate-fadeInUp delay-500">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#1f2d3d]">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Anish", review: "Found an electrician within minutes — super easy and reliable!" },
            { name: "Sujata", review: "Hired a tutor for my brother. The process was smooth and fast." },
            { name: "Ramesh", review: "Loved how quickly Pro-Connect suggested verified professionals!" },
          ].map((r, i) => (
            <div key={i} className="bg-[#f9fcff] p-6 rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaStar className="text-[#f4b400] text-3xl mb-3 mx-auto" />
              <p className="text-gray-700 text-center">"{r.review}"</p>
              <h4 className="mt-3 font-semibold text-[#2a4f77] text-center">– {r.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ CALL TO ACTION ------------------------ */}
      <section className="py-20 text-center bg-linear-to-b from-[#e9f3ff] to-[#f7fbff] animate-fadeInUp delay-600">
        <h2 className="text-3xl font-bold mb-4 text-[#1f2d3d]">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join thousands of users finding trusted service providers every day.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="bg-linear-to-r from-[#2a4f77] to-[#00f5ff] text-white px-10 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Join Pro-Connect Now
        </button>
      </section>

      {/* ------------------------ ANIMATIONS CSS ------------------------ */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
        .animate-fadeInUp.delay-100 { animation-delay: 0.1s; }
        .animate-fadeInUp.delay-200 { animation-delay: 0.2s; }
        .animate-fadeInUp.delay-300 { animation-delay: 0.3s; }
        .animate-fadeInUp.delay-400 { animation-delay: 0.4s; }
        .animate-fadeInUp.delay-500 { animation-delay: 0.5s; }
        .animate-fadeInUp.delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Blog;

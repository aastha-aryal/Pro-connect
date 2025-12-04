import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

/* ------------------- FAQ Items ---------------------- */
const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/10 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center text-white font-semibold"
      >
        <span>{faq.question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`mt-3 text-white/90 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

/* ------------------- FAQs Page ---------------------- */
const topFaqs = [
  {
    question: "Is fare included?",
    answer:
      "No, the fare is not included. This is because we only connect you with professionals—you can pick one based on your needs and budget.",
  },
];

const faqsData = [
  {
    question: "How to negotiate the fee?",
    answer:
      "The platform does not set fees. You can negotiate directly with the provider before booking. If it doesn’t suit you, simply move to the next provider.",
  },
  {
    question: "How do I register as a customer?",
    answer:
      "Registering is quick and simple! Click 'Register', fill in your details, and you’re ready to connect with top professionals.",
  },
  {
    question: "How can I become a service provider?",
    answer:
      "Sign up as a provider, complete your profile with your skills and experience, and wait for verification. Once verified, you can start getting job requests.",
  },
  {
    question: "Is there a subscription fee?",
    answer:
      "Nope! Using Pro-Connect is completely free for both customers and service providers.",
  },
  {
    question: "Can I cancel a service request?",
    answer:
      "Yes, you can cancel your request anytime before the provider accepts it.",
  },
  {
    question: "How is the provider selected?",
    answer:
      "Providers are suggested according to your preferences, location, and past ratings, so you can choose the best match for your needs.",
  },
  {
    question: "Will it show nearby customers?",
    answer:
      "The platform will only show a customer’s location if the customer allows it and both parties confirm the job.",
  },
];

const Faqs = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-start
     bg-gradient-to-b  from-[#18334f] to-[#445f7e] text-white px-4 py-16">
      
      {/* Floating droplets */}
      <Droplets />

      <h1 className="text-4xl font-bold text-center mb-6">FAQs</h1>
      <h2 className="text-2xl font-semibold text-center mb-12">
        (Frequently Asked Questions)
      </h2>

      {/* Top FAQs */}
      <div className="max-w-3xl w-full mx-auto space-y-4 mb-12">
        {topFaqs.map((faq, index) => (
          <FaqItem key={index} faq={faq} />
        ))}
      </div>

      {/* General FAQs */}
      <div className="max-w-3xl w-full mx-auto space-y-4">
        {faqsData.map((faq, index) => (
          <FaqItem key={index} faq={faq} />
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes drop {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(100vh) translateX(20px); }
        }
        .animate-drop { animation: drop linear infinite; }
        .sparkle { filter: drop-shadow(0 0 6px rgba(255,255,255,0.6)); }
      `}</style>
    </div>
  );
};

export default Faqs;

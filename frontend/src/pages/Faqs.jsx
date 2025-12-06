import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ------------------- FAQ Item ---------------------- */
const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center font-semibold text-gray-800"
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
        className={`mt-3 text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

/* ------------------- FAQ Data ---------------------- */
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
    answer: "Nope! Using Pro-Connect is completely free for both customers and service providers.",
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

/* ------------------- FAQ Page ---------------------- */
const Faqs = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#EAF6FF] px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">FAQs</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-12">
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
    </div>
  );
};

export default Faqs;

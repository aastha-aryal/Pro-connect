import React, { useState, useEffect } from "react";

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
      className="absolute bg-white/30 rounded-full animate-drop sparkle"
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

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#18334f] to-[#445f7e] text-white flex flex-col items-center justify-start px-4 py-16">

      {/* Droplet Background */}
      <Droplets />

      {/* Floating blurred shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-500 rounded-full opacity-10 filter blur-3xl animate-pulseSlow"></div>
      <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-indigo-500 rounded-full opacity-10 filter blur-3xl animate-pulseSlow delay-200"></div>

      {/* Feedback Container */}
      <div className="relative z-10 mt-16 max-w-3xl mx-auto p-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500">
        <h2 className="text-4xl font-bold mb-4 text-gray/10 drop-shadow-md">
          Feedback / Complaints
        </h2>
        <p className="text-gray-150 mb-6 text-lg">
          Have a suggestion or complaint? Let us know so we can improve our services.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 rounded-2xl bg-gray-100 text-black placeholder-gray-500 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
            rows={5}
            placeholder="Write your feedback here..."
            required
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-[#31d7c9] text-black font-semibold rounded-xl hover:scale-110 hover:shadow-lg transition">
          
            Submit
          </button>
        </form>
      </div>

      {/* Submitted Popup */}
      {submitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-lg text-gray-200 shadow-2xl rounded-2xl p-8 w-80 flex flex-col items-center border border-teal-400 animate-scale-up">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg
                className="w-12 h-12 text-green-600 animate-check"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-teal-300 drop-shadow-md">
              Thank you!
            </h3>
            <p className="text-gray-200 text-sm text-center">
              Sorry for the inconvenience. We will look into your feedback and make improvements.
            </p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes drop {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(100vh) translateX(20px); }
        }
        .animate-drop { animation: drop linear infinite; }
        .sparkle { filter: drop-shadow(0 0 6px rgba(255,255,255,0.6)); }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        .animate-pulseSlow { animation: pulseSlow 4s ease-in-out infinite; }

        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }

        @keyframes scaleUp { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scaleUp 0.4s ease-out forwards; }

        @keyframes checkMark { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        .animate-check path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: checkMark 0.5s ease forwards 0.3s; }

        .animate-soft-button-glow {
          box-shadow: 0 0 6px #14b8a6, 0 0 12px #14b8a6;
        }
        .animate-soft-button-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px #14b8a6, 0 0 20px #14b8a6;
        }
      `}</style>
    </div>
  );
};

export default Feedback;

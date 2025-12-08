import React, { useState } from "react";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#f5fbff] to-[#e9f6ff] px-4 py-16">
      
      {/* Feedback Container */}
      <div className="max-w-2xl w-full p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#b7ecff]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b4a6f]">
          Feedback & Complaints
        </h2>
        <p className="text-[#3f6b82] mb-6 text-lg">
          We value your feedback. Please let us know your suggestions or complaints.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
          <textarea
            className="w-full p-4 rounded-2xl bg-[#e0f9ff] text-[#0b4a6f] placeholder-[#6f8fa1] border border-[#b7ecff] focus:outline-none focus:ring-2 focus:ring-[#31d7c9] transition-all"
            rows={5}
            placeholder="Write your feedback here..."
            required
          ></textarea>

          {/* Small Submit Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-linear-to-r  from-[#a1f3ec] to-[#4f98a5] text-white font-semibold rounded-xl hover:scale-105 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Submitted Popup */}
      {submitted && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-lg text-[#0b4a6f] shadow-2xl rounded-2xl p-8 w-80 flex flex-col items-center border border-[#b7ecff]">
            <div className="bg-linear-to-r from-[#a1f3ec] to-[#acdae2] rounded-full p-4 mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#31d7c9]">
              Thank you!
            </h3>
            <p className="text-[#3f6b82] text-sm text-center">
              Your feedback has been received. We will review it and take action accordingly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;

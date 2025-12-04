import React, { useState, useEffect } from "react";
import { FaUsers, FaLightbulb, FaMapMarkerAlt, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

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

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

const About = () => (
  <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-start
     bg-linear-to-b  from-[#18334f] to-[#445f7e] text-white px-4 py-8">

    {/* Droplet Background */}
    <Droplets />

    {/* Hero Section */}
    <section className="text-center py-24 relative z-10">
      <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl glow">
        About Pro-Connect
      </motion.h1>
      <motion.p variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-lg md:text-2xl max-w-3xl mx-auto font-medium">
        We connect people with trusted local professionals, bridging the gap between demand and skill. Verified profiles, AI-driven recommendations, and smooth interface make services simple, reliable, and inclusive.
      </motion.p>
    </section>

    {/* Our Values */}
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-16 px-6 md:px-20 z-10 relative w-full">
      <h2 className="text-3xl font-bold text-center mb-12 text-teal-500 glow-subtle">Our Values</h2>
      <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        {[
          { icon: <FaUsers />, title: "Trust", text: "Verified and reliable professionals for confident hiring." },
          { icon: <FaLightbulb />, title: "Innovation", text: "Smarter, faster, and more convenient ways to find services." },
          { icon: <FaMapMarkerAlt />, title: "Local Focus", text: "Connect with professionals near you efficiently." },
          { icon: <FaHandshake />, title: "Professionalism", text: "Quality service and professionalism in every interaction." },
        ].map((card) => (
          <motion.div key={card.title} variants={fadeInUp} whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} transition={{ type: "spring", stiffness: 300 }} className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-white hover:shadow-xl cursor-pointer flex flex-col justify-between">
            <span className="text-teal-500 mx-auto text-5xl mb-4 glow-subtle">{card.icon}</span>
            <h3 className="font-bold text-xl mb-2 glow-subtle">{card.title}</h3>
            <p className="text-gray-200">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    {/* How We Make a Difference */}
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-16 px-6 md:px-20 z-10 relative w-full">
      <h2 className="text-3xl font-bold text-center mb-12 text-teal-500 glow-subtle ">How We Make a Difference</h2>
      <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { title: "Smart Matching", text: "AI-driven recommendations connect users with nearby providers based on preferences and past activity." },
          { title: "Inclusive Platform", text: "Designed for everyone, including rural users, providing an accessible and user-friendly interface." },
          { title: "Verified Professionals", text: "Every professional is verified to ensure trust and high-quality service." },
          { title: "Wide Range of Services", text: "From electricians and plumbers to niche offerings, our platform connects all skilled professionals with clients." },
        ].map((item, idx) => (
          <motion.div key={idx} variants={fadeInUp} whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} transition={{ type: "spring", stiffness: 300 }} className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-white hover:shadow-xl cursor-pointer flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-4 text-teal-500 ">{item.title}</h3>
            <p className="text-gray-200">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    <style>{`
      .glow-subtle { text-shadow: 0 0 6px #06b6d4, 0 0 10px #3b82f6; }
      @keyframes drop { 0% { transform: translateY(0) translateX(0); } 100% { transform: translateY(100vh) translateX(20px); } }
      .animate-drop { animation: drop linear infinite; }
      .sparkle { filter: drop-shadow(0 0 6px rgba(255,255,255,0.6)); }
    `}</style>
  </div>
);

export default About;

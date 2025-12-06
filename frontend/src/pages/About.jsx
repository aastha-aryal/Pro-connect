import React from "react";
import { FaUsers, FaLightbulb, FaMapMarkerAlt, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.2 } } };

const About = () => (
  <div className="relative min-h-screen flex flex-col items-center justify-start bg-linear-to-b from-[#e9f3ff] to-[#f7fbff] text-gray-800 px-4 py-8">
    {/* Hero Section with blended container */}
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-80 rounded-2xl p-12 text-center shadow-lg">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md"
        >
          About Pro-Connect
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg max-w-3xl mx-auto font-medium text-gray-700"
        >
          We connect people with trusted local professionals, bridging the gap between demand and skill. Verified profiles, AI-driven recommendations, and smooth interface make services simple, reliable, and inclusive.
        </motion.p>
      </div>
    </section>

    {/* Our Values */}
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 px-6 md:px-20 w-full"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">Our Values</h2>
      <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        {[
          { icon: <FaUsers />, title: "Trust", text: "Verified and reliable professionals for confident hiring." },
          { icon: <FaLightbulb />, title: "Innovation", text: "Smarter, faster, and more convenient ways to find services." },
          { icon: <FaMapMarkerAlt />, title: "Local Focus", text: "Connect with professionals near you efficiently." },
          { icon: <FaHandshake />, title: "Professionalism", text: "Quality service and professionalism in every interaction." },
        ].map((card) => (
          <motion.div
            key={card.title}
            variants={fadeInUp}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 rounded-xl bg-white hover:bg-gray-100 shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300"
          >
            <span className="text-teal-600 mx-auto text-4xl mb-4">{card.icon}</span>
            <h3 className="font-bold text-lg mb-2 text-gray-800">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    {/* How We Make a Difference */}
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 px-6 md:px-20 w-full"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">How We Make a Difference</h2>
      <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { title: "Smart Matching", text: "AI-driven recommendations connect users with nearby providers based on preferences and past activity." },
          { title: "Inclusive Platform", text: "Designed for everyone, including rural users, providing an accessible and user-friendly interface." },
          { title: "Verified Professionals", text: "Every professional is verified to ensure trust and high-quality service." },
          { title: "Wide Range of Services", text: "From electricians and plumbers to niche offerings, our platform connects all skilled professionals with clients." },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 rounded-xl bg-white hover:bg-gray-100 shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300"
          >
            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  </div>
);

export default About;

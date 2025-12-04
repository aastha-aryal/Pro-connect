import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaWrench, FaBolt, FaChalkboardTeacher, FaPaintRoller, FaBroom, FaBaby, 
  FaMagic, FaGift, FaHammer, FaCameraRetro, FaCouch, FaUtensils, 
  FaKey, FaTshirt, FaTruckMoving, FaConciergeBell 
} from "react-icons/fa";

// ------------------- Decorative Droplets ----------------------
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

// ------------------- Services ----------------------
const services = [
  { name: "Plumber", icon: FaWrench },
  { name: "Electrician", icon: FaBolt },
  { name: "Home Tutors", icon: FaChalkboardTeacher },
  { name: "Painter", icon: FaPaintRoller },
  { name: "House Help", icon: FaBroom },
  { name: "Babysitters", icon: FaBaby },
  { name: "Beauty & Salon", icon: FaMagic },
  { name: "Event Decorators", icon: FaGift },
  { name: "Carpenter", icon: FaHammer },
  { name: "Photographer", icon: FaCameraRetro },
  { name: "Interior Designer", icon: FaCouch },
  { name: "Private Chef", icon: FaUtensils },
  { name: "Locksmith", icon: FaKey },
  { name: "Boutiques", icon: FaTshirt },
  { name: "Movers & Packers", icon: FaTruckMoving },
  { name: "Catering Server", icon: FaConciergeBell },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden
                    bg-gradient-to-b from-[#18334f] to-[#445f7e] text-white py-10 px-4">
      <Droplets />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 z-10 relative"
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Customer Dashboard</h1>
        <p className="text-gray-300 mt-2">Select a service to explore</p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-6xl z-10 relative">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
              onClick={() => 
                navigate(`/service-request/${service.name.toLowerCase().replace(/\s+/g, '-')}`, {
                  state: { serviceName: service.name } // optional state
                })
              }
              className="bg-white/20 backdrop-blur-md aspect-square flex flex-col items-center justify-center rounded-xl
                         cursor-pointer transition-all border border-white/30 hover:border-white hover:brightness-110"
              style={{ boxShadow: "0px 0px 8px rgba(255,255,255,0.35)" }}
            >
              <Icon className="text-3xl mb-2 text-white drop-shadow-sm" />
              <h3 className="text-xs font-semibold text-center text-white drop-shadow">{service.name}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Droplets animation */}
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
}

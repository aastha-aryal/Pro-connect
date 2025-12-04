import { 
  FaWrench, FaBolt, FaChalkboardTeacher, FaPaintRoller, FaBroom, FaBaby, FaMagic, FaGift, 
  FaHammer, FaCameraRetro, FaCouch, FaUtensils, FaKey, FaTshirt, FaTruckMoving, FaConciergeBell 
} from "react-icons/fa";

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

const Services = () => {
  return (
    <div className="bg-[#b9d1dd] py-16 px-8"> {/* Light bluish-grey background */}
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform rounded-lg"
            >
              <Icon className="text-3xl mb-2 text-[#1e2c44]" /> {/* Dark navy/dirty blue */}
              <h3 className="text-sm font-semibold text-center">{service.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;

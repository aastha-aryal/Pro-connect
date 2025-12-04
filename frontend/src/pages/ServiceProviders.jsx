import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaPhone, FaArrowLeft } from "react-icons/fa";

const ServiceProviders = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const displayServiceName = serviceName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const mockProviders = [
    {
      id: 1,
      name: "John Doe",
      rating: 4.8,
      reviews: 127,
      experience: "8 years",
      location: "Kathmandu, Nepal",
      phone: "+977-9841234567",
      photo: "https://i.pravatar.cc/150?img=12",
      specialization: displayServiceName
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4.9,
      reviews: 203,
      experience: "12 years",
      location: "Lalitpur, Nepal",
      phone: "+977-9841234568",
      photo: "https://i.pravatar.cc/150?img=45",
      specialization: displayServiceName
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 4.7,
      reviews: 89,
      experience: "5 years",
      location: "Bhaktapur, Nepal",
      phone: "+977-9841234569",
      photo: "https://i.pravatar.cc/150?img=33",
      specialization: displayServiceName
    },
    {
      id: 4,
      name: "Emily Davis",
      rating: 4.6,
      reviews: 156,
      experience: "10 years",
      location: "Pokhara, Nepal",
      phone: "+977-9841234570",
      photo: "https://i.pravatar.cc/150?img=47",
      specialization: displayServiceName
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
      >
        <FaArrowLeft /> Back to Services
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{displayServiceName} Providers</h1>
        <p className="text-gray-600 mb-8">
          Found {mockProviders.length} trusted providers in your area
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={provider.photo}
                  alt={provider.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{provider.specialization}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-800 font-semibold">{provider.rating}</span>
                    <span className="text-gray-500 text-sm">({provider.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{provider.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaPhone className="text-green-500" />
                    <span>{provider.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Experience: <span className="font-semibold text-gray-800">{provider.experience}</span>
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviders;
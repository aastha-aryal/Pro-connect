import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaPhone, FaStar, FaMapMarkerAlt, FaBriefcase, FaChevronDown, FaChevronUp, FaCheckCircle, FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ServiceRequestPage() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const category = location.state?.category || params.category;

  const [providers, setProviders] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data with Nepali market pricing for different skills
    const mockProviders = [
      {
        id: 1,
        name: "Ram Shrestha",
        experience: "5 years",
        bio: "Professional plumber with 5+ years experience in residential and commercial plumbing.",
        rating: 4.2,
        totalServices: 34,
        ratedServices: 28,
        phone: "+977 980-000-001",
        distance: "1.2 km",
        address: "New Baneshwor, Kathmandu",
        skills: [
          { name: "Pipe Fitting", price: "Rs 450" },
          { name: "Leak Repair", price: "Rs 800" },
          { name: "Drain Cleaning", price: "Rs 1000" },
          { name: "Water Heater", price: "Rs 2500" },
          { name: "Bathroom Plumbing", price: "Rs 1500" },
          { name: "Tap Installation", price: "Rs 350" }
        ],
        online: true,
        responseTime: "15 mins",
        verified: true
      },
      {
        id: 2,
        name: "Sita Adhikari",
        experience: "3 years",
        bio: "Certified plumber specializing in modern plumbing solutions. Expert in water conservation.",
        rating: 4.7,
        totalServices: 21,
        ratedServices: 18,
        phone: "+977 980-000-002",
        distance: "2.5 km",
        address: "Kalanki, Kathmandu",
        skills: [
          { name: "Pipe Fitting", price: "" },
          { name: "Leak Repair", price: "" },
          { name: "Toilet Installation", price: "" },
          { name: "Water Tank Setup", price: "" }
        ],
        online: false,
        responseTime: "1 hour",
        verified: true
      },
      {
        id: 3,
        name: "Rajesh Kumar",
        experience: "8 years",
        bio: "Master plumber with extensive experience in industrial and commercial plumbing projects.",
        rating: 4.9,
        totalServices: 67,
        ratedServices: 58,
        phone: "+977 980-000-003",
        distance: "3.1 km",
        address: "Patan, Lalitpur",
        skills: [
          { name: "Industrial Pipe Fitting", price: "Rs 1200" },
          { name: "Sewage System Repair", price: "Rs 2000+" },
          { name: "Water Pump Installation", price: "Rs 1800" },
          { name: "Complete Plumbing", price: "Rs 5000+" }
        ],
        online: true,
        responseTime: "10 mins",
        verified: true
      }
    ];

    // Filter based on category (for demo, all are plumbers)
    const filtered = category?.toLowerCase() === "plumber" ? mockProviders : [];
    filtered.sort((a, b) => b.rating - a.rating);
    
    setProviders(filtered);
    setLoading(false);
  }, [category]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRequest = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    alert(`Request sent to ${provider.name}. They will contact you shortly.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Finding professionals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {category} Services Available
          </h1>
          <p className="text-gray-600">
            Compare top-rated professionals in your area
          </p>
        </div>
      </div>

      {/* Providers List */}
      <div className="max-w-6xl mx-auto">
        {providers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <FaMapMarkerAlt className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No {category}s Available</h3>
            <p className="text-gray-600 mb-8">Try searching in a different area or check back later.</p>
            <button 
              onClick={() => navigate('/customer-dashboard', { state: { activeTab: 'services' } })}
              className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Browse Other Services
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {providers.map((provider, index) => {
              const open = expandedIds.includes(provider.id);
              const hasNoPricing = provider.skills.every(s => !s.price);
              
              return (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Main Card Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left: Provider Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-6">
                          {/* Avatar with Online Status */}
                          <div className="relative">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white text-2xl font-bold shadow-xl relative">
                              {provider.name.split(" ").map((n) => n[0]).join("")}
                              {provider.verified && (
                                <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <FaCheckCircle className="text-white text-sm" />
                                </div>
                              )}
                            </div>
                            {/* Online Status Badge */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full ${provider.online ? 'bg-green-100' : 'bg-gray-100'} border ${provider.online ? 'border-green-200' : 'border-gray-200'}`}>
                              <div className={`w-2 h-2 rounded-full ${provider.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                              <span className={`text-xs font-semibold ${provider.online ? 'text-green-700' : 'text-gray-600'}`}>
                                {provider.online ? 'Online' : 'Offline'}
                              </span>
                            </div>
                          </div>

                          {/* Basic Info */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <div>
                                <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                                  <span className="text-gray-600 text-sm">{provider.distance} away • {provider.address}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                  <FaStar className="text-yellow-500 text-lg" />
                                  <div>
                                    <div className="font-bold text-gray-900 text-xl">{provider.rating}</div>
                                    <div className="text-xs text-gray-500">rating</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                                  <FaRegClock className="text-blue-600" />
                                  <div>
                                    <div className="font-bold text-gray-900">{provider.responseTime}</div>
                                    <div className="text-xs text-gray-500">response</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Experience and Services */}
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                <FaBriefcase className="text-gray-600" />
                                <div>
                                  <div className="font-bold text-gray-900">{provider.experience}</div>
                                  <div className="text-xs text-gray-500">experience</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                <div>
                                  <div className="font-bold text-gray-900">{provider.totalServices}</div>
                                  <div className="text-xs text-gray-500">services done</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                                <div>
                                  <div className="font-bold text-gray-900">{provider.ratedServices}</div>
                                  <div className="text-xs text-gray-500">rated services</div>
                                </div>
                              </div>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-700 mb-5">{provider.bio}</p>

                            {/* Skills Preview */}
                            <div className="flex flex-wrap gap-2">
                              {provider.skills.slice(0, 4).map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100"
                                >
                                  {skill.name}
                                </span>
                              ))}
                              {provider.skills.length > 4 && (
                                <span className="px-4 py-2 font-semibold text-gray-500">
                                  +{provider.skills.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="lg:w-80 flex flex-col gap-4">
                        {/* Call Button Section */}
                        <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                                <FaPhone className="text-white text-xl rotate-90" />
                              </div>
                              <div>
                                <p className="text-xl font-bold text-gray-900">{provider.phone}</p>
                              </div>
                            </div>
                            <a
                              href={`tel:${provider.phone.replace(/\s+/g, '')}`}
                              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              <span>CALL</span>
                              <FaPhone className="text-lg rotate-90" />
                            </a>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={() => handleRequest(provider.id)}
                            className="w-full px-6 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                          >
                            Send Service Request
                          </button>

                          <button
                            onClick={() => toggleExpand(provider.id)}
                            className="w-full flex items-center justify-between gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors font-semibold"
                          >
                            <span>{open ? 'Hide' : 'View'} Complete Details</span>
                            {open ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-8 pt-8 border-t border-gray-200"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Services & Pricing */}
                          <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Services & Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {provider.skills.map((skill, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">{skill.name}</span>
                                    {skill.price ? (
                                      <span className="text-lg font-bold text-gray-900">{skill.price}</span>
                                    ) : (
                                      <span className="text-gray-500 italic">Contact for price</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Performance Stats */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Stats</h3>
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{provider.totalServices}</div>
                                <div className="text-gray-700 font-semibold">Total Services Completed</div>
                                <div className="text-sm text-gray-500 mt-1">Across all clients</div>
                              </div>
                              
                              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-5">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{provider.ratedServices}</div>
                                <div className="text-gray-700 font-semibold">Rated Services</div>
                                <div className="text-sm text-gray-500 mt-1">With client feedback</div>
                              </div>
                              
                              <div className="bg-linear-to-r from-purple-50 to-violet-50 rounded-xl p-5">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{provider.experience}</div>
                                <div className="text-gray-700 font-semibold">Experience</div>
                                <div className="text-sm text-gray-500 mt-1">Professional work</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        {hasNoPricing && (
                          <div className="mt-6 p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <p className="text-yellow-800 font-semibold">
                              💡 Note: This professional prefers to provide custom quotes. Contact directly for pricing.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-2xl font-bold mb-3">Need Help Choosing?</h4>
              <p className="text-gray-300">
                Compare multiple providers, check their ratings and experience, then make an informed decision.
              </p>
            </div>
            <button
              onClick={() => navigate('/customer-dashboard', { state: { activeTab: 'services' } })}
              className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              ← Back to Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  User, 
  ClipboardList, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Edit2, 
  Save,
  Phone,
  Navigation,
  Award,
  Star,
  Calendar
} from "lucide-react";
import { FaPhone, FaCheckCircle } from "react-icons/fa";

// Services - Updated with new service names
import plumber from "../assets/services/plumber.jpeg";
import electrician from "../assets/services/electrician.jpeg";
import tutor from "../assets/services/tutor.jpeg";
import painter from "../assets/services/painter.jpeg";
import cleaner from "../assets/services/cleaner.jpeg";
import babysitter from "../assets/services/babysitter.jpeg";
import beautician from "../assets/services/beautician.jpeg";
import decorator from "../assets/services/event-decorators.jpeg";
import carpenter from "../assets/services/carpenter.jpeg";
import photographer from "../assets/services/photographer.jpeg";
import bandbaja from "../assets/services/bandbaja.jpeg";
import chef from "../assets/services/chef.jpeg";
import locksmith from "../assets/services/locksmith.jpeg";
import sofaCleaner from "../assets/services/tailoring.jpeg"; // Changed from tailoring
import movers from "../assets/services/movers.jpeg";
import waterproofing from "../assets/services/catering.jpeg"; // Changed from catering

const SERVICES = [
  { id: 1, title: "Plumber", img: plumber },
  { id: 2, title: "Electrician", img: electrician },
  { id: 3, title: "Home Tutors", img: tutor },
  { id: 4, title: "Painter", img: painter },
  { id: 5, title: "House Help", img: cleaner },
  { id: 6, title: "Babysitters", img: babysitter },
  { id: 7, title: "Beauty & Salon", img: beautician },
  { id: 8, title: "Event Decorators", img: decorator },
  { id: 9, title: "Carpenter", img: carpenter },
  { id: 10, title: "Photographer", img: photographer },
  { id: 11, title: "Band Baja", img: bandbaja },
  { id: 12, title: "Private Chef", img: chef },
  { id: 13, title: "Locksmith", img: locksmith },
  { id: 14, title: "Sofa/Carpet Cleaner", img: sofaCleaner }, // Changed from Boutiques & Tailoring
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Waterproofing", img: waterproofing }, // Changed from Catering Server
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("98XXXXXXXXX");
  const [expandedIds, setExpandedIds] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  // Mock location data (would come from backend)
  const profile = {
    name: "Aastha Aryal",
    email: "aastha@gmail.com",
    province: "Bagmati",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    ward: "03", 
    street: "New Baneshwor",
    latitude: "27.7172",
    longitude: "85.3240",
  };

  const requests = [
    {
      id: 1,
      name: "Ram Shrestha",
      service: "Plumber",
      rating: 4.2,
      servicesCount: 34,
      experience: "5 Years",
      bio: "Residential & commercial plumbing expert. Specialized in modern pipe fitting and leak detection.",
      phone: "+977980000001",
      distance: "1.2 km",
      address: "New Baneshwor, Kathmandu",
      online: true,
      skills: ["Pipe Fitting", "Leak Repair", "Drain Cleaning", "Water Heater"],

    },
    {
      id: 2,
      name: "Sita Adhikari",
      service: "Electrician",
      rating: 4.7,
      servicesCount: 21,
      experience: "3 Years",
      bio: "Certified electrician with quality service. Expert in home wiring and electrical safety.",
      phone: "+977980000002",
      distance: "2.5 km",
      address: "Kalanki, Kathmandu",
      online: false,
      skills: ["Wiring", "Switch Repair", "Panel Installation"],
    },
  ];

  const completedServices = [
    { 
      id: 1, 
      provider: "Bikash Thapa", 
      service: "Painter", 
      date: "2024-03-15",
      rating: 4.5,
      servicesCount: 28,
      experience: "4 Years",
      skills: ["Wall Painting", "Texture", "Waterproofing", "Polish"],
      review: "Excellent work! Very professional and neat finishing."
    },
    { 
      id: 2, 
      provider: "Nabin Sharma", 
      service: "Tutor", 
      date: "2024-03-10",
      rating: 4.8,
      servicesCount: 15,
      experience: "2 Years",
      skills: ["Mathematics", "Physics", "Chemistry", "Test Prep"],
      review: "Great teaching methodology. My child's grades improved significantly."
    },
  ];

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 text-gray-800">
      {/* PREMIUM SIDEBAR */}
      <div className="lg:w-80 bg-white p-6 shadow-lg border-r border-gray-200 flex flex-col">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              AA
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md border-4 border-white">
              <User size={18} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
            <Mail size={14} />
            {profile.email}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{profile.district}, {profile.municipality}-{profile.ward}</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Phone size={14} className="text-gray-600" />
            <span className="font-medium">{phone}</span>
          </div>
        </div>

        <nav className="mt-4 space-y-2 flex-1">
          <SidebarItem
            icon={<User size={20} />}
            label="Personal Details"
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            badge={null}
          />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="My Requests"
            active={activeTab === "requests"}
            onClick={() => setActiveTab("requests")}
            badge={requests.length}
          />
          <SidebarItem
            icon={<CheckCircle size={20} />}
            label="Services Taken"
            active={activeTab === "servicesTaken"}
            onClick={() => setActiveTab("servicesTaken")}
            badge={completedServices.length}
          />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Browse Services"
            active={activeTab === "services"}
            onClick={() => setActiveTab("services")}
            badge={SERVICES.length}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-gray-700">{profile.name.split(" ")[0]}!</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your services, track requests, and find professionals
          </p>
        </div>

        {/* PERSONAL DETAILS - UPDATED LOCATION DISPLAY */}
        {activeTab === "details" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto overflow-hidden border border-gray-200"
          >
            <div className="bg-gray-900 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <p className="text-gray-300 mt-1">Update your profile details</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  {isEditing ? (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Details */}
                <div className="flex-1 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField
                      label="Full Name"
                      value={profile.name}
                      isEditing={isEditing}
                      type="text"
                      disabled={true}
                    />
                    <InfoField
                      label="Email Address"
                      value={profile.email}
                      isEditing={isEditing}
                      type="email"
                      disabled={true}
                    />
                    <InfoField
                      label="Phone Number"
                      value={phone}
                      isEditing={isEditing}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                    />
                  </div>

                  {/* Location Section - Simplified Display */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Navigation size={18} />
                      Location Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Complete Address</p>
                        <p className="text-gray-800 font-medium">
                          {profile.street}, {profile.district}, {profile.municipality}-{profile.ward}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Province</p>
                          <p className="text-gray-800">{profile.province}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                          <p className="text-gray-800">{profile.latitude}, {profile.longitude}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
                      <MapPin size={14} />
                      Location automatically fetched from your device
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      This information cannot be edited and is maintained by the system
                    </p>
                  </div>
                </div>

                {/* Right: Profile Picture */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shadow-lg border-8 border-white">
                    {isEditing ? (
                      <label className="cursor-pointer w-full h-full flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => setProfilePic(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="text-center p-4">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-600 flex items-center justify-center">
                            <Edit2 size={24} className="text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Click to upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                        </div>
                      </label>
                    ) : (
                      <img
                        src={profilePic || "https://via.placeholder.com/192x192/4b5563/ffffff?text=AA"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {!isEditing && (
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Click "Edit Profile" to update your photo
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MY REQUESTS - REMOVED PRICING SECTION */}
        {activeTab === "requests" && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">My Active Requests</h3>
              <p className="text-gray-600 mt-2">Track and manage your pending service requests</p>
            </div>
            
            <div className="space-y-4 max-w-5xl mx-auto">
              {requests.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <ClipboardList size={32} className="text-gray-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700">No Active Requests</h4>
                  <p className="text-gray-500 mt-2">You don't have any pending service requests</p>
                </div>
              ) : (
                requests.map((p) => {
                  const open = expandedIds.includes(p.id);
                  
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Compact Header */}
                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="relative shrink-0">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-bold">
                                {p.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${p.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-lg font-bold text-gray-900">{p.name}</h2>
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                  {p.service}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star size={12} className="text-yellow-500 fill-current" />
                                  <span className="font-semibold text-sm">{p.rating}</span>
                                  <span className="text-gray-500 text-xs">({p.servicesCount} services)</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} />
                                  {p.distance} away
                                </span>
                                <span className="flex items-center gap-1">
                                  <Award size={12} />
                                  {p.experience}
                                </span>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.bio}</p>
                              
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {p.skills.slice(0, 3).map((s, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {p.skills.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs border border-gray-200">
                                    +{p.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons - Compact */}
                          <div className="flex flex-col gap-2 shrink-0 ml-4">
                            <a
                              href={`tel:${p.phone}`}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                              <FaPhone className="rotate-90 text-xs" />
                              <span>Call</span>
                            </a>
                            
                            <button
                              onClick={() => alert(`Marked ${p.name}'s request as completed!`)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-300"
                            >
                              <FaCheckCircle size={12} />
                              <span>Complete</span>
                            </button>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => toggleExpand(p.id)}
                            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                          >
                            {open ? 'Show Less Details' : 'Show More Details'}
                            <span className="text-xs">{open ? '▲' : '▼'}</span>
                          </button>
                          
                          <span className={`text-xs px-2 py-1 rounded ${p.online ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                            {p.online ? '● Online' : '○ Offline'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Details - Only when needed */}
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="border-t border-gray-100 bg-gray-50"
                        >
                          <div className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Contact Info */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                                  <Phone size={14} />
                                  Contact Information
                                </h4>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-900">{p.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Address</p>
                                    <p className="text-gray-700">{p.address}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Service Stats */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                                  <Award size={14} />
                                  Service Statistics
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">Total Services:</span>
                                    <span className="font-medium">{p.servicesCount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Full Skills List */}
                            {p.skills.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="font-medium text-gray-700 mb-2 text-sm">All Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {p.skills.map((s, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-xs font-medium border border-gray-300"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* SERVICES TAKEN - ENHANCED WITH MORE DETAILS */}
        {activeTab === "servicesTaken" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Service History</h2>
                  <p className="text-gray-300 mt-2">Your completed service requests</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{completedServices.length}</div>
                  <div className="text-gray-300">Services Completed</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {completedServices.map((s) => (
                <ServiceReviewCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}

        {/* BROWSE SERVICES - WITH UPDATED SERVICE NAMES */}
        {activeTab === "services" && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Browse Services</h3>
              <p className="text-gray-600 mt-2">Discover and book professional services in your area</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {SERVICES.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                  onClick={() =>
                    navigate(`/service-request/${service.title.toLowerCase()}`, {
                      state: { category: service.title },
                    })
                  }
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={service.img}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={service.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {service.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Tap to book</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* PREMIUM COMPONENTS */

function SidebarItem({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
        active
        ? "bg-gray-900 text-white shadow"
        : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
      }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      {badge !== null && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          active ? 'bg-white/20' : 'bg-gray-100 text-gray-700'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function ServiceReviewCard({ service }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Provider Info */}
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-bold">
                {service.provider.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">{service.provider}</h3>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {service.service}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="font-semibold text-sm">{service.rating}</span>
                  <span className="text-gray-500 text-xs">({service.servicesCount} services)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Award size={12} />
                  {service.experience}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Completed
                </span>
              </div>
              
              {/* Review if available */}
              {service.review && (
                <div className="mb-3">
                  <p className="text-gray-600 text-sm italic">"{service.review}"</p>
                </div>
              )}
              
              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {service.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() =>
            navigate(`/review/${service.id}`, {
              state: {
                provider: service.provider,
                service: service.service,
                date: service.date,
                rating: service.rating,
                skills: service.skills
              },
            })
          }
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm hover:shadow self-start"
        >
          Write Review
        </button>
      </div>
    </motion.div>
  );
}

function InfoField({ label, value, isEditing, onChange, type = "text", disabled = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing && !disabled ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-800">{value}</p>
        </div>
      )}
    </div>
  );
}
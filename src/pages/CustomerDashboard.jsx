import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { 
  LogOut, 
  User, 
  ClipboardList, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Phone,
  Star,
  Award,
  Calendar,
  Save,
  Edit2,
  Navigation
} from "lucide-react";
import { FaPhone, FaCheckCircle, FaMapMarkerAlt, FaStar, FaRegClock, FaBriefcase, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Services
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
import tailoring from "../assets/services/tailoring.jpeg";
import movers from "../assets/services/movers.jpeg";
import catering from "../assets/services/catering.jpeg";

const SERVICES = [
  { id: 1, title: "Plumber", img: plumber },
  { id: 2, title: "Electrician", img: electrician },
  { id: 3, title: "Home Tutors", img: tutor },
  { id: 4, title: "Painter", img: painter },
  { id: 5, title: "House Help", img: cleaner },
  { id: 6, title: "Babysitters", img: babysitter },
  { id: 7, title: "Sofa/Carpet Cleaner", img: beautician },
  { id: 8, title: "Event Decorators", img: decorator },
  { id: 9, title: "Carpenter", img: carpenter },
  { id: 10, title: "Photographer", img: photographer },
  { id: 11, title: "Band Baja", img: bandbaja },
  { id: 12, title: "Private Chef", img: chef },
  { id: 13, title: "Locksmith", img: locksmith },
  { id: 14, title: "Laundry", img: tailoring },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Waterproofing", img: catering },
];

// Mock providers
const MOCK_PROVIDERS = {
  plumber: [
    { id: 1, name: "Ram Shrestha", experience: "5 Years", bio: "Residential & commercial plumbing expert.", phone: "+977980000001" },
    { id: 2, name: "Sita Adhikari", experience: "3 Years", bio: "Certified plumber with quality service.", phone: "+977980000002" },
  ],
  electrician: [
    { id: 3, name: "Rajesh Koirala", experience: "6 Years", bio: "Expert electrician for home & industrial wiring.", phone: "+977980000003" },
  ],
  "home tutors": [
    { id: 4, name: "Nabin Sharma", experience: "4 Years", bio: "Home tutor for Math & Science.", phone: "+977980000004" },
  ],
};

// Mock data for other sections
const MOCK_REQUESTS = [
  { 
    id: 1, 
    name: "Ram Shrestha", 
    experience: "5 Years", 
    bio: "Residential & commercial plumbing expert.", 
    phone: "+977980000001",
    service: "Plumber",
    distance: "2.5 km away",
    rating: 4.8,
    servicesCount: 124,
    address: "Kathmandu, Nepal",
    online: true,
    skills: ["Pipe Repair", "Drain Cleaning", "Fixture Installation", "Water Heater"]
  }
];

const MOCK_COMPLETED_SERVICES = [
  {
    id: 1,
    provider: "Ram Shrestha",
    service: "Plumber",
    experience: "5 Years",
    rating: 4.8,
    servicesCount: 124,
    skills: ["Pipe Repair", "Drain Cleaning"],
    review: "Excellent service, very professional!"
  }
];

const MOCK_PROFILE = {
  name: "Aastha Aryal",
  email: "aastha@gmail.com",
  street: "Kathmandu-03",
  district: "Kathmandu",
  municipality: "Kathmandu",
  ward: "03",
  province: "Bagmati Province",
  latitude: "27.7172",
  longitude: "85.3240"
};

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { category } = useParams(); // from URL
  const [activeTab, setActiveTab] = useState("services");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  
  // State variables that were missing
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("98XXXXXXXXX");
  const [profilePic, setProfilePic] = useState("");
  const [requests] = useState(MOCK_REQUESTS);
  const [expandedIds, setExpandedIds] = useState([]);
  const [completedServices] = useState(MOCK_COMPLETED_SERVICES);
  const [profile] = useState(MOCK_PROFILE);

  // Update selectedCategory when URL changes
  useEffect(() => {
    if (category) setSelectedCategory(category.replace(/-/g, " "));
  }, [category]);

  const handleCategoryClick = (service) => {
    const slug = service.title.toLowerCase().replace(/\s+/g, "-");
    setSelectedCategory(service.title);
    setActiveTab("services");
    navigate(`/customer-dashboard/${slug}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  // Providers for the selected category
  const providers = selectedCategory ? MOCK_PROVIDERS[selectedCategory.toLowerCase()] || [] : [];

  // Function to toggle expand/collapse
  const toggleExpand = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="lg:w-80 bg-white p-6 shadow-lg border-r border-gray-200 flex flex-col">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              AA
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md border-4 border-white">
              <User size={18} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Aastha Aryal</h2>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1"><Mail size={14} />aastha@gmail.com</p>
          <div className="mt-3 flex items-center justify-center gap-1 text-sm text-gray-600"><MapPin size={14} /><span>Kathmandu, Kathmandu-03</span></div>
          <div className="mt-2 flex items-center justify-center gap-2"><Phone size={14} className="text-gray-600" /><span className="font-medium">98XXXXXXXXX</span></div>
        </div>

        <nav className="mt-4 space-y-2 flex-1">
          <SidebarItem icon={<User size={20} />} label="Personal Details" active={activeTab === "details"} onClick={() => setActiveTab("details")} />
          <SidebarItem icon={<ClipboardList size={20} />} label="My Requests" active={activeTab === "requests"} onClick={() => setActiveTab("requests")} badge={providers.length} />
          <SidebarItem icon={<CheckCircle size={20} />} label="Services Taken" active={activeTab === "servicesTaken"} onClick={() => setActiveTab("servicesTaken")} badge={0} />
          <SidebarItem icon={<ClipboardList size={20} />} label="Browse Services" active={activeTab === "services"} onClick={() => setActiveTab("services")} badge={SERVICES.length} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome back, Aastha!</h1>

        {/* PERSONAL DETAILS */}
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

                  {/* Location Section */}
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
                  <div className="relative w-48 h-48 rounded-full bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden shadow-lg border-8 border-white">
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
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG Max-5MB</p>
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

        {/* MY REQUESTS */}
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
                              <div className="w-16 h-16 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-bold">
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
                                  {p.distance}
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

                          {/* Action Buttons  */}
                          <div className="flex flex-col gap-2 shrink-0 ml-4">
                            <a
                              href={`tel:${p.phone}`}
                            >
                            <div className="gap-1.5 px-4 py-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-medium hover:from-green-600 hover:to-emerald-700 transition-colors text-medium-bold">
                                      <FaPhone size={14} className="text-white text-base rotate-90" />
                                      <span>Call</span>
                            </div>
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

        {/* SERVICES TAKEN */}
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

        {/* BROWSE SERVICES */}
        {activeTab === "services" && (
          <>
            {/* If no category is selected, show the services grid */}
            {!selectedCategory ? (
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Browse Services
                </h1>
                <p className="text-gray-600 mb-6">
                  Choose a service to find professionals
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4">
                  {SERVICES.map(service => (
                    <motion.div 
                      key={service.id} 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${selectedCategory.toLowerCase() === service.title.toLowerCase() ? 'ring-2 ring-gray-900' : ''}`}
                      onClick={() => handleCategoryClick(service)}
                    >
                      <div className="relative overflow-hidden h-36">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-4 text-center bg-linear-to-b from-white to-gray-50">
                        <p className="font-bold text-gray-900 text-lg">{service.title}</p>
                        <p className="text-sm text-gray-600 mt-1">Tap to view providers</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* If a category IS selected, show providers list */
              <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
                {/* Header with Back Button */}
                <div className="max-w-6xl mx-auto mb-6">
                  <div className="mb-6">
                    <button 
                      onClick={() => {
                        setSelectedCategory("");
                        navigate("/customer-dashboard");
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mb-4"
                    >
                      ← Back to Services
                    </button>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {selectedCategory} Services Available
                    </h1>
                  </div>
                </div>

                {/* Providers List */}
                <div className="max-w-6xl mx-auto">
                  {providers.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-gray-400 text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No {selectedCategory} Available</h3>
                      <p className="text-gray-600 mb-8">Try searching in a different area or check back later.</p>
                      <button 
                        onClick={() => setSelectedCategory("")}
                        className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
                      >
                        Browse Other Services
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {providers.map((provider, index) => {
                        const open = expandedIds.includes(provider.id);
                        
                        // Create enhanced provider data with different pricing scenarios
                        const enhancedProvider = {
                          ...provider,
                          rating: 4.5, 
                          totalServices: 24, 
                          ratedServices: 18, 
                          distance: "2.5 km", 
                          address: "Kathmandu metropolitan city ward no.03, kathmandu , Nepal",
                          skills: index === 0 ? [
                            { name: "Basic Pipe Repair", price: "रु 450" },
                            { name: "Leak Detection & Fix", price: "रु 800" },
                            { name: "Drain Cleaning", price: "रु 1,000" },
                            { name: "Water Heater Installation", price: "रु 2,500" },
                            { name: "Bathroom Plumbing", price: "रु 1,500" },
                            { name: "Tap & Fixture Installation", price: "रु 350" }
                          ] : index === 1 ? [

                          ] : [
                            { name: "Industrial Pipe Fitting", price: "रु 1,200" },
                            { name: "Sewage System Repair", price: "रु 2,000+" },
                            { name: "Water Pump Installation", price: "रु 1,800" },
                            { name: "Complete Plumbing Setup", price: "" }
                          ],
                          online: index < 2,
                        };
                        
                        // Check if this provider has no pricing at all
                        const hasNoPricing = enhancedProvider.skills.every(skill => !skill.price || skill.price === "");
                        
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
                                      </div>
                                      {/* Online Status Badge */}
                                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full ${enhancedProvider.online ? 'bg-green-100' : 'bg-gray-100'} border ${enhancedProvider.online ? 'border-green-200' : 'border-gray-200'}`}>
                                        <div className={`w-2 h-2 rounded-full ${enhancedProvider.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                        <span className={`text-xs font-semibold ${enhancedProvider.online ? 'text-green-700' : 'text-gray-600'}`}>
                                          {enhancedProvider.online ? 'Online' : 'Offline'}
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
                                            <span className="text-gray-600 text-sm">{enhancedProvider.distance} away • {enhancedProvider.address}</span>
                                          </div>
                                        </div>
                                        
                                      </div>

                                      {/* Experience and Services */}
                                      <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                                          <FaStar className="text-yellow-500 text-sm" />
                                          <div>
                                            <div className="font-bold text-gray-900">{enhancedProvider.rating}</div>
                                            <div className="text-xs text-gray-500">Rating</div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                          <FaBriefcase className="text-gray-600" />
                                          <div>
                                            <div className="font-bold text-gray-900">{provider.experience}</div>
                                            <div className="text-xs text-gray-500">Experience</div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                          <div>
                                            <div className="font-bold text-gray-900">{enhancedProvider.totalServices}</div>
                                            <div className="text-xs text-gray-500">Total Services</div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                                          <div>
                                            <div className="font-bold text-gray-900">{enhancedProvider.ratedServices}</div>
                                            <div className="text-xs text-gray-500">Rated recieved</div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Bio */}
                                      <p className="text-gray-700 mb-5">{provider.bio}</p>

                                      {/* Skills Preview */}
                                      <div className="flex flex-wrap gap-2">
                                        {enhancedProvider.skills.slice(0, 4).map((skill, index) => (
                                          <span
                                            key={index}
                                            className="px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100"
                                          >
                                            {skill.name}
                                          </span>
                                        ))}
                                        {enhancedProvider.skills.length > 4 && (
                                          <span className="px-4 py-2 font-semibold text-gray-500">
                                            +{enhancedProvider.skills.length - 4} more
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="lg:w-80 flex flex-col gap-4">
                                  {/* Call Button Section */}
                                  <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-100">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-10 h-10 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                                        <FaPhone className="text-white text-base rotate-90" />
                                      </div>
                                      <div>
                                        <p className="text-lg font-bold text-gray-900">
                                          {provider.phone.replace('+977', '').replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')}
                                        </p>
                                      </div>
                                    </div>
                                    <a
                                      href={`tel:${provider.phone.replace(/\s+/g, '')}`}
                                      className="flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                                    >
                                      <span>CALL NOW</span>
                                      <FaPhone className="text-sm rotate-90" />
                                    </a>
                                  </div>
                                </div>

                                  {/* Action Buttons */}
                                  <div className="space-y-3">
                                    <button
                                      onClick={() => alert(`Service request sent to ${provider.name}. They will contact you shortly.`)}
                                      className="w-full px-6 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                                    >
                                      Send Request
                                    </button>
     
                                    <div className="w-full text-center">
                                    <button
                                      onClick={() => toggleExpand(provider.id)}
                                      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:underline transition-colors text-sm font-medium"
                                    >
                                      <span>{open ? 'Hide Details' : 'View Details'}</span>
                                      {open ? <FaChevronUp size={14} /> : <FaChevronDown size={10} />}
                                    </button>
                                  </div>
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

                                      <div className="overflow-x-auto">
                                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                                          <thead className="bg-gray-100">
                                            <tr>
                                              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b">
                                                Service
                                              </th>
                                              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 border-b">
                                                Price
                                              </th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            {enhancedProvider.skills.map((skill, index) => (
                                              <tr
                                                key={index}
                                                className="hover:bg-gray-50 transition-colors"
                                              >
                                                <td className="px-4 py-3 text-sm text-gray-800 border-b">
                                                  {skill.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right border-b">
                                                  {skill.price && skill.price !== "" ? skill.price : "—"}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>

                                      {/* Note only if provider has NO pricing at all */}
                                      {hasNoPricing && (
                                        <div className="mt-6 p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
                                          <p className="text-yellow-800 font-semibold">
                                            💡 Note: This professional prefers to provide custom quotes. Contact directly for pricing.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${active ? "bg-gray-900 text-white shadow" : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-gray-100'}`}>{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
      {badge !== undefined && <span className={`px-2 py-1 rounded-full text-xs font-medium ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-700'}`}>{badge}</span>}
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
            {/* Provider Info with Profile Picture */}
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-lg font-bold">
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
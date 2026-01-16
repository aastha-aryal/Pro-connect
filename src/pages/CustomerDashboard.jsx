import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  ChevronRight
} from "lucide-react";
import { FaPhone } from "react-icons/fa";

// Service images
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
import sofaCleaner from "../assets/services/tailoring.jpeg";
import movers from "../assets/services/movers.jpeg";
import waterproofing from "../assets/services/catering.jpeg";

// Service list
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
  { id: 14, title: "Sofa/Carpet Cleaner", img: sofaCleaner },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Waterproofing", img: waterproofing },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Editable profile state
  const [profile, setProfile] = useState({
    name: "Aastha Aryal",
    email: "aastha@gmail.com",
    phone: "98XXXXXXXXX",
    province: "Bagmati",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    ward: "03",
    street: "New Baneshwor",
    latitude: "27.7172",
    longitude: "85.3240",
  });

  const [expandedIds, setExpandedIds] = useState([]);

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
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <div className="lg:w-80 bg-white p-6 shadow-xl shadow-slate-200/50 border-r border-slate-100 flex flex-col z-20">
        <div className="text-center mb-10 mt-4">
          <div className="relative w-32 h-32 mx-auto mb-6 group">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-indigo-900/20 ring-4 ring-white">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : profile.name.split(" ").map(n => n[0]).join("")}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePicInput"
              onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))}
            />
            <label htmlFor="profilePicInput" className="absolute -bottom-2 right-2 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border-4 border-white cursor-pointer">
              <User size={16} className="text-white" />
            </label>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{profile.name}</h2>
          <p className="text-sm text-slate-500 mt-2 flex items-center justify-center gap-1.5 font-medium">
            <Mail size={14} className="text-slate-400" /> {profile.email}
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-1.5 flex-1">
          <SidebarItem
            icon={<User size={18} />}
            label="Personal Details"
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          />
          <SidebarItem
            icon={<ClipboardList size={18} />}
            label="My Requests"
            active={activeTab === "requests"}
            onClick={() => setActiveTab("requests")}
            badge={requests.length}
          />
          <SidebarItem
            icon={<CheckCircle size={18} />}
            label="Services Taken"
            active={activeTab === "servicesTaken"}
            onClick={() => setActiveTab("servicesTaken")}
            badge={completedServices.length}
          />
          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Explore</p>
            <SidebarItem
              icon={<Search size={18} />}
              label="Browse Services"
              active={activeTab === "services"}
              onClick={() => setActiveTab("services")}
              badge={SERVICES.length}
              special
            />
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-100 group font-medium"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Welcome back, <span className="text-indigo-600">{profile.name.split(" ")[0]}</span>
        </h1>

        {/* TABS */}
        {activeTab === "details" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden max-w-5xl mx-auto">
              <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
                  <p className="text-slate-400 mt-1">Manage your contact details and address</p>
                </div>
                <button
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-sm shadow-lg shadow-black/10"
                >
                  {isEditing ? (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 size={16} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <InfoField
                        label="Full Name"
                        value={profile.name}
                        isEditing={isEditing}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                      <InfoField
                        label="Email Address"
                        value={profile.email}
                        isEditing={false} // email not editable
                      />
                      <InfoField
                        label="Phone Number"
                        value={profile.phone}
                        isEditing={isEditing}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                      <InfoField
                        label="Street"
                        value={profile.street}
                        isEditing={isEditing}
                        onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                      />
                      <InfoField
                        label="Ward"
                        value={profile.ward}
                        isEditing={isEditing}
                        onChange={(e) => setProfile({ ...profile, ward: e.target.value })}
                      />
                      <InfoField
                        label="Municipality"
                        value={profile.municipality}
                        isEditing={isEditing}
                        onChange={(e) => setProfile({ ...profile, municipality: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Requests */}
        {activeTab === "requests" && (
          <RequestsTab requests={requests} expandedIds={expandedIds} toggleExpand={toggleExpand} />
        )}

        {/* Services Taken */}
        {activeTab === "servicesTaken" && (
          <div className="max-w-5xl mx-auto space-y-4">
            {completedServices.map((s) => (
              <ServiceReviewCard key={s.id} service={s} />
            ))}
          </div>
        )}

        {/* Browse Services */}
        {activeTab === "services" && (
          <div>
            <div className="mb-8 max-w-2xl">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Browse Services</h3>
              <p className="text-slate-500 mt-2">Discover and book professional services in your area.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {SERVICES.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300"
                  onClick={() =>
                    navigate(`/service-request/${service.title.toLowerCase()}`, { state: { category: service.title } })
                  }
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={service.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="font-bold text-sm tracking-wide shadow-black/50 drop-shadow-md">{service.title}</p>
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-xs font-semibold text-indigo-600 group-hover:underline">View Pros</span>
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <ChevronRight size={14} />
                    </div>
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

/* Sidebar item */
function SidebarItem({ icon, label, active, onClick, badge, special }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
        active
          ? special ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-900 text-white shadow-md shadow-slate-900/10"
          : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`transition-colors ${active ? "text-white/90" : "text-slate-400 group-hover:text-slate-600"}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* Info Field */
function InfoField({ label, value, isEditing, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white outline-none"
        />
      ) : (
        <div className="px-4 py-3 rounded-lg border bg-slate-50 border-slate-200 text-slate-800">
          <p className="font-medium">{value}</p>
        </div>
      )}
    </div>
  );
}

/* Requests tab */
function RequestsTab({ requests, expandedIds, toggleExpand }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {requests.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No Active Requests"
          description="You don't have any ongoing service requests."
          action={() => {}}
          actionText="Browse Services"
        />
      ) : (
        requests.map(p => {
          const open = expandedIds.includes(p.id);
          return (
            <motion.div
              key={p.id}
              layout
              initial={{ borderRadius: 12 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(p.id)}>
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.service}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-indigo-600">{p.distance}</span>
                  <Navigation size={16} className={`transition-transform ${open ? "rotate-90" : ""}`} />
                </div>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 text-sm text-slate-600"
                  >
                    <p><strong>Experience:</strong> {p.experience}</p>
                    <p><strong>Bio:</strong> {p.bio}</p>
                    <p><strong>Address:</strong> {p.address}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${p.phone}`} className="text-indigo-600">{p.phone}</a></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg">{skill}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/review/${p.id}`, { state: { provider: p.name, service: p.service } })}
                      className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Write Review
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
    </div>
  );
}

/* Service Review Card */
function ServiceReviewCard({ service }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-lg">{service.service} by {service.provider}</h4>
        <span className="text-sm text-slate-500">{service.date}</span>
      </div>
      <p className="text-sm text-slate-600">{service.review}</p>
    </div>
  );
}

/* Empty State */
function EmptyState({ icon: Icon, title, description, action, actionText }) {
  return (
    <div className="text-center py-12">
      <Icon size={48} className="mx-auto text-slate-400 mb-4" />
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

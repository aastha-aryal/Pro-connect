import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ClipboardList, CheckCircle } from "lucide-react";
import { FaStar, FaPhone } from "react-icons/fa";

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
  { id: 7, title: "Beauty & Salon", img: beautician },
  { id: 8, title: "Event Decorators", img: decorator },
  { id: 9, title: "Carpenter", img: carpenter },
  { id: 10, title: "Photographer", img: photographer },
  { id: 11, title: "Band Baja", img: bandbaja },
  { id: 12, title: "Private Chef", img: chef },
  { id: 13, title: "Locksmith", img: locksmith },
  { id: 14, title: "Boutiques & Tailoring", img: tailoring },
  { id: 15, title: "Movers & Packers", img: movers },
  { id: 16, title: "Catering Server", img: catering },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("98XXXXXXXXX");
  const [expandedIds, setExpandedIds] = useState([]);

  const profile = {
    name: "Aastha Aryal",
    email: "aastha@gmail.com",
    province: "Bagmati",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    ward: "Ward 12",
  };

  const requests = [
    {
      id: 1,
      name: "Ram Shrestha",
      service: "Plumber",
      rating: 4.2,
      servicesCount: 34,
      experience: "5 Years",
      bio: "Residential & commercial plumbing expert.",
      phone: "+977980000001",
      distance: "1.2 km",
      address: "New Baneshwor, Kathmandu",
      online: true,
      skills: ["Pipe Fitting", "Leak Repair", "Drain Cleaning"],
    },
    {
      id: 2,
      name: "Sita Adhikari",
      service: "Electrician",
      rating: 4.7,
      servicesCount: 21,
      experience: "3 Years",
      bio: "Certified electrician with quality service.",
      phone: "+977980000002",
      distance: "2.5 km",
      address: "Kalanki, Kathmandu",
      online: false,
      skills: ["Wiring", "Switch Repair"],
    },
  ];

  const completedServices = [
    { id: 1, provider: "Bikash Thapa", service: "Painter" },
    { id: 2, provider: "Nabin Sharma", service: "Tutor" },
  ];

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const [profilePic, setProfilePic] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f9f6f1]">
      {/* SIDEBAR */}
      <div className="lg:w-80 bg-white p-4 sm:p-6 shadow-lg border-r flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3" />
        <p className="text-center font-bold">{profile.name}</p>
        <p className="text-sm text-center mt-1">
          📍 {profile.district}, {profile.municipality}
        </p>
        <p className="text-sm flex justify-center items-center gap-1 mt-1">
           <FaPhone className="text-green-600 rotate-90" /> {phone}
        </p>

        <nav className="mt-6 space-y-2 flex-1">
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
          />
          <SidebarItem
            icon={<CheckCircle size={18} />}
            label="Services Taken"
            active={activeTab === "servicesTaken"}
            onClick={() => setActiveTab("servicesTaken")}
          />
          <SidebarItem
            icon={<ClipboardList size={18} />}
            label="Browse Services"
            active={activeTab === "services"}
            onClick={() => setActiveTab("services")}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        {/* PERSONAL DETAILS */}
          {activeTab === "details" && (
            <div className="bg-white rounded-2xl shadow max-w-3xl mx-auto p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Save Changes" : "Edit"}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Details */}
                <div className="flex-1 space-y-4">
                  {/* Name */}
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="text-gray-400 text-lg">{profile.name}</p>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <p className="text-gray-500 text-sm">Phone Number</p>
                    {isEditing ? (
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border rounded px-3 py-2 text-gray-700 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />

                    ) : (
                      <p className="text-gray-600 text-lg">{phone}</p>
                    )}
                  </div>
                    {/* Email */}
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-gray-400 text-lg">{profile.email}</p>
                  </div>
                  {/* Address */}
                  <div>
                    <p className="text-gray-500 text-sm">Province</p>
                    <p className="text-gray-400 text-sm">{profile.province}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">District</p>
                    <p className="text-gray-400 text-sm">{profile.district}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Municipality</p>
                    <p className="text-gray-400 text-sm">{profile.municipality}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Ward</p>
                    <p className="text-gray-400 text-sm">{profile.ward}</p>
                  </div>
                </div>

                {/* Right: Profile Picture */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-32 h-32 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center">
                    {isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setProfilePic(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute w-full h-full cursor-pointer opacity-0"
                      />
                    )}
                    <img
                      src={profilePic || "path_to_default_avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && <p className="text-sm text-gray-500">Click to change</p>}
                </div>
              </div>
            </div>
          )}
          {/* MY REQUESTS */}
          {activeTab === "requests" && (
            <div>
              <h3 className="text-3xl font-bold text-center mb-8">My Pending Requests</h3>
              <div className="space-y-6 max-w-4xl mx-auto">
                {requests.map((p) => {
                  const open = expandedIds.includes(p.id);
                  return (
                    <div key={p.id} className="bg-white rounded-2xl shadow p-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span
                          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                            p.online ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{p.name}</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={14} />
                          {p.rating} ({p.servicesCount} services)
                        </p>
                        <p className="text-sm mt-1">📍 Distance: {p.distance}</p>
                      </div>

                      {/* Phone + Completed Button */}
                      <div className="flex flex-col items-end mt-2">
                        <a
                          href={`tel:${p.phone}`}
                          className="text-green-600 font-medium flex items-center gap-2 h-fit hover:underline"
                          title={`Call ${p.name}`}
                        >
                          <FaPhone className="rotate-90" />
                          <p>{p.phone}</p>
                        </a>

                        <button
                          onClick={() => alert(`Marked ${p.name}'s request as completed!`)}
                         className="text-sm mt-8 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Completed
                        </button>
                      </div>
                    </div>


                      {/* Toggle Details */}
                      <div className="mt-4 flex gap-4 flex-wrap">
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {open ? "Hide Details" : "Show More"}
                        </button>
                      </div>

                      {/* Expanded Info */}
                      {open && (
                        <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
                          <p className="text-sm font-semibold">Experience: {p.experience}</p>
                          <p className="text-sm">Location: {p.address}</p>
                          <p className="text-sm">📝 Bio: {p.bio}</p>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {p.skills.map((s, i) => (
                              <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}


       {/* SERVICES TAKEN */}
        {activeTab === "servicesTaken" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Review Your Service Providers
              </h2>
              <p className="text-gray-500 mt-2">
                These are the professionals you hired in the past. Share your
                experience and help others choose better.
              </p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow cursor-pointer"
                onClick={() =>
                  navigate(`/service-request/${service.title.toLowerCase()}`, {
                    state: { category: service.title },
                  })
                }
              >
                <img
                  src={service.img}
                  className="h-32 w-full object-cover rounded-t-2xl"
                />
                <p className="p-3 text-center font-semibold">{service.title}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
        active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ServiceReviewCard({ service }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {service.provider}
        </h3>
        <p className="text-sm text-gray-500">
          Service: {service.service}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/review/${service.id}`, {
            state: {
              provider: service.provider,
              service: service.service,
            },
          })
        }
        className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 w-full sm:w-auto"
      >
        Review
      </button>
    </div>
  );
}



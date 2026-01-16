import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  ClipboardList,
  CheckCircle,
  MapPin,
  Edit2,
  Save,
  Phone,
  Navigation,
  Award,
  Star,
  Briefcase,
  Plus,
  X,
  Clock,
  Calendar,
  MessageCircle
} from "lucide-react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("98XXXXXXXXX");
  const [bio, setBio] = useState("Professional plumber with 5 years of experience. Specialized in residential plumbing, leak detection, and pipe fitting.");
  const [skills, setSkills] = useState(["Pipe Fitting", "Leak Repair", "Drain Cleaning", "Water Heater Installation"]);
  const [newSkill, setNewSkill] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Mock provider data
  const profile = {
    name: "Ram Shrestha",
    email: "ram.shrestha@gmail.com",
    province: "Bagmati",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    ward: "03",
    street: "New Baneshwor",
    latitude: "27.7172",
    longitude: "85.3240",
    experience: "5 Years",
    rating: 4.5,
  };

  // Pending Requests
  const pendingRequests = [
    {
      id: 1,
      customerName: "Ram Shrestha",
      location: "Kathmandu, Baneshwor, Ward 6",
      distance: "2.5 km",
      phone: "9812345678",
    },
    {
      id: 2,
      customerName: "Sita Rai",
      location: "Lalitpur, Lalitpur Metropolitan, Ward 3",
      distance: "3.2 km",
      phone: "9812345679",
    }
  ];

  // Accepted Requests
  const acceptedRequests = [
    {
      id: 1,
      customerName: "Hari Thapa",
      location: "Kathmandu, Kapan, Ward 8",
      distance: "1.8 km",
      phone: "9812345680",
      latitude: "27.7172",
      longitude: "85.3240",
    },
    {
      id: 2,
      customerName: "Gita Sharma",
      location: "Bhaktapur, Bhaktapur Municipality, Ward 5",
      distance: "4.1 km",
      phone: "9812345681",
      latitude: "27.6722",
      longitude: "85.4278",
    }
  ];

  // Completed Jobs
  const completedJobs = [
    {
      id: 1,
      customerName: "John Doe",
      service: "Kitchen Pipe Replacement",
      rating: 5,
      review: "Excellent work! Very professional and completed on time.",
      date: "2024-01-15",
      earnings: "$150"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      service: "Bathroom Leak Repair",
      rating: 4,
      review: "Good service, but arrived 30 minutes late.",
      date: "2024-01-10",
      earnings: "$85"
    }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  const handleAcceptRequest = (id, customerName) => {
    alert(`Accepted ${customerName}'s request!`);
  };

  const handleDenyRequest = (id, customerName) => {
    alert(`Denied ${customerName}'s request`);
  };

  const handleCompleteJob = (id, customerName) => {
    alert(`Marked ${customerName}'s job as complete!`);
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleOpenMap = (latitude, longitude, customerName) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* PREMIUM SIDEBAR */}
      <div className="lg:w-80 bg-white p-6 shadow-xl border-r border-gray-200 flex flex-col">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              RS
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Briefcase size={18} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
            <Briefcase size={14} />
            Professional Plumber
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-600">
            <Award size={14} className="text-amber-500" />
            <span className="font-medium">{profile.experience} Experience</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1 text-sm text-gray-600">
            <Star size={14} className="text-amber-500 fill-current" />
            <span className="font-medium">{profile.rating} Rating</span>
          </div>
        </div>

        <nav className="mt-4 space-y-2 flex-1">
          <SidebarItem
            icon={<User size={20} className="text-blue-600" />}
            label="My Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            badge={null}
          />
          <SidebarItem
            icon={<ClipboardList size={20} className="text-amber-600" />}
            label="Pending Requests"
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
            badge={pendingRequests.length}
          />
          <SidebarItem
            icon={<CheckCircle size={20} className="text-emerald-600" />}
            label="Accepted Requests"
            active={activeTab === "accepted"}
            onClick={() => setActiveTab("accepted")}
            badge={acceptedRequests.length}
          />
          <SidebarItem
            icon={<Award size={20} className="text-purple-600" />}
            label="Completed Jobs"
            active={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
            badge={completedJobs.length}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
        >
          <LogOut size={18} className="text-gray-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center align-middle">
            Welcome, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{profile.name.split(" ")[0]}!</span>
          </h1>
          <p className="text-center text-gray-600 mt-2">Manage your service requests and profile</p>
        </div>

        {/* PROFILE DETAILS */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-5xl mx-auto overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Professional Profile</h2>
                  <p className="text-blue-100 mt-1">Update your professional details</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all duration-200 font-medium border border-white/20"
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

                  {/* Bio Section */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-blue-600" />
                        Professional Bio
                      </span>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                        placeholder="Describe your professional experience and expertise..."
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <p className="text-gray-800 whitespace-pre-line">{bio}</p>
                      </div>
                    )}
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <Award size={16} className="text-amber-600" />
                        Professional Skills
                      </span>
                    </label>
                    {isEditing ? (
                      <div>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add a new skill..."
                          />
                          <button
                            onClick={addSkill}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 rounded-full text-sm font-medium border border-blue-200"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-gray-600 hover:text-red-600 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-white/80 text-gray-800 rounded-full text-sm font-medium border border-blue-200 shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Navigation size={18} className="text-blue-600" />
                      Service Location
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-gray-600 mb-1">Service Area</p>
                        <p className="text-gray-800 font-medium">
                          {profile.street}, {profile.district}, {profile.municipality}-{profile.ward}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                          <p className="text-sm text-gray-600 mb-1">Province</p>
                          <p className="text-gray-800 font-medium">{profile.province}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                          <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                          <p className="text-gray-800 font-medium">{profile.latitude}, {profile.longitude}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
                      <MapPin size={14} className="text-blue-600" />
                      Your service location for customer matching
                    </p>
                  </div>
                </div>

                {/* Right: Profile Picture */}
                <div className="flex flex-col items-center">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-8 border-white shadow-2xl">
                        {isEditing ? (
                          <label className="cursor-pointer w-full h-full">
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
                            {profilePic ? (
                              <img
                                src={profilePic}
                                alt="Profile preview"
                                className="w-full h-full object-cover cursor-pointer"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                                  <Edit2 size={24} className="text-white" />
                                </div>
                                <span className="text-sm text-gray-700">Click to upload</span>
                              </div>
                            )}
                          </label>
                        ) : (
                          <img
                            src={profilePic || "https://via.placeholder.com/192x192/4f46e5/ffffff?text=RS"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {isEditing && (
                        <>
                          <label className="mt-3 w-full flex items-center justify-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => setProfilePic(reader.result);
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <span className="inline-block px-4 py-2 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-sm text-blue-700 hover:shadow-sm hover:scale-[1.02] transition-all">
                              Choose photo
                            </span>
                          </label>
                          
                          <p className="text-xs text-gray-500 mt-2 text-center">
                            {profilePic ? "Photo selected" : "No photo selected"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 text-center">JPG/PNG, max 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PENDING REQUESTS */}
        {activeTab === "pending" && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Incoming Requests</h3>
              <p className="text-gray-600 mt-2">Review and respond to new service requests</p>
            </div>
            
            <div className="space-y-6 max-w-5xl mx-auto">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center">
                    <ClipboardList size={32} className="text-amber-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700">No Pending Requests</h4>
                  <p className="text-gray-500 mt-2">You don't have any pending service requests</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left side - Customer Info */}
                        <div className="flex-1">
                          <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">{request.customerName}</h2>
                            <p className="text-gray-600 mt-1">{request.location}</p>
                          </div>
                          
                          <div className="flex flex-col gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenMap(request.latitude, request.longitude, request.customerName)}
                                className="p-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 rounded-lg transition-all flex items-center justify-center shadow-sm border border-blue-100"
                                title="View on Map"
                              >
                                <MapPin size={14} />
                              </button>
                              <span className="text-gray-800 font-medium">Distance: {request.distance}</span>
                            </span>
                            
                            <span className="flex items-center gap-2">
                              <div className="p-1.5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
                                <Phone size={14} className="text-gray-600" />
                              </div>
                              <span className="text-gray-800 font-medium">{request.phone}</span>
                            </span>
                          </div>
                        </div>

                        {/* Right side - Buttons Stack */}
                        <div className="flex flex-col items-end gap-4 min-w-[200px]">
                          {/* Accept and Deny buttons */}
                          <div className="flex gap-3 w-full">
                            <button
                              onClick={() => handleAcceptRequest(request.id, request.customerName)}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-[0.98] text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:shadow-emerald-200"
                            >
                              <CheckCircle size={16} />
                              <span className="font-semibold">Accept</span>
                            </button>
                            <button
                              onClick={() => handleDenyRequest(request.id, request.customerName)}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 active:scale-[0.98] text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-100 hover:shadow-rose-200"
                            >
                              <X size={16} />
                              <span className="font-semibold">Deny</span>
                            </button>
                          </div>
                          
                          {/* Status indicator */}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            <span>Waiting for your response</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ACCEPTED REQUESTS */}
        {activeTab === "accepted" && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Accepted Requests</h3>
              <p className="text-gray-600 mt-2">Manage your accepted service requests</p>
            </div>
            
            <div className="space-y-6 max-w-5xl mx-auto">
              {acceptedRequests.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700">No Accepted Requests</h4>
                  <p className="text-gray-500 mt-2">You haven't accepted any service requests yet</p>
                </div>
              ) : (
                acceptedRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left side - Customer Info */}
                        <div className="flex-1">
                          <div className="mb-4">
                            <div className="flex items-center gap-2">
                              <h2 className="text-xl font-bold text-gray-900">{request.customerName}</h2>
                              <span className="px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                                <Clock size={10} />
                                Accepted
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">{request.location}</p>
                          </div>
                          
                          <div className="flex flex-col gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <div className="p-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                <MapPin size={14} className="text-blue-600" />
                              </div>
                              <span className="text-gray-800 font-medium">Distance: {request.distance}</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <div className="p-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                <Phone size={14} className="text-green-600" />
                              </div>
                              <span className="text-gray-800 font-medium">{request.phone}</span>
                            </span>
                          </div>
                        </div>

                        {/* Right side - Action Buttons */}
                        <div className="flex flex-col items-end gap-4 min-w-[200px]">
                          <div className="flex gap-3 w-full">
                            <button
                              onClick={() => handleCall(request.phone)}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-100 hover:shadow-green-200"
                            >
                              <FaPhone className="rotate-90" />
                              <span className="font-semibold">Call</span>
                            </button>
                            
                            <button
                              onClick={() => handleOpenMap(request.latitude, request.longitude, request.customerName)}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-[0.98] text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:shadow-blue-200"
                            >
                              <FaMapMarkerAlt />
                              <span className="font-semibold">Map</span>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleCompleteJob(request.id, request.customerName)}
                            className="w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black active:scale-[0.98] text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg"
                          >
                            <CheckCircle size={16} />
                            <span className="font-semibold">Mark Complete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* COMPLETED JOBS */}
        {activeTab === "completed" && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Completed Jobs</h3>
              <p className="text-gray-600 mt-2">Your completed services and customer reviews</p>
            </div>
            
            <div className="space-y-6">
              {completedJobs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 flex items-center justify-center">
                    <Award size={32} className="text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700">No Completed Jobs</h4>
                  <p className="text-gray-500 mt-2">You haven't completed any jobs yet</p>
                </div>
              ) : (
                completedJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                          <h4 className="text-lg font-bold text-gray-900">{job.customerName}</h4>
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                            {job.service}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < job.rating ? "text-amber-500 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-blue-600" />
                            <span>{job.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award size={14} className="text-amber-600" />
                            <span className="font-medium">{job.earnings}</span>
                          </div>
                        </div>
                        
                        {job.review && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-600 mb-1 font-medium flex items-center gap-1">
                              <MessageCircle size={14} />
                              Customer Review:
                            </p>
                            <p className="text-gray-800">"{job.review}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function SidebarItem({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-gradient-to-r from-blue-100 to-indigo-100'}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      {badge !== null && (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            active ? 'bg-white/20' : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="text-gray-800 font-medium">{value}</p>
        </div>
      )}
    </div>
  );
}
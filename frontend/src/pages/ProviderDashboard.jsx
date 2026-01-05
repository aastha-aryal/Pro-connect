import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaInbox,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaSignOutAlt
} from "react-icons/fa";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("incoming");

  const [profile, setProfile] = useState({
    name: "John Doe",
    phone: "+977-9841234567",
    profession: "Plumber",
    experience: "8 years",
    location: { province: "Bagmati", district: "Kathmandu", municipality: "Kathmandu Metropolitan", ward: "12" },
    bio: "Experienced plumber with a focus on quality and punctuality.",
    skills: "Pipe fitting, leak repair, bathroom installation",
    photo: "https://i.pravatar.cc/150?img=12",
    reviews: 4.8,
    totalReviews: 25,
  });

  const [editPhone, setEditPhone] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);

  // Dummy data for requests/jobs
  const incomingRequests = [
    { id: 1, name: "Ram Shrestha", location: { district: "Kathmandu", municipality: "Baneshwor", ward: "6" }, distance: "2.5 km", phone: "9812345678", mapLink: "https://maps.google.com" },
    { id: 2, name: "Sita Rai", location: { district: "Lalitpur", municipality: "Lalitpur Metropolitan", ward: "3" }, distance: "3.2 km", phone: "9812345679", mapLink: "https://maps.google.com" },
  ];

  const acceptedRequests = [
    { id: 3, name: "Hari Thapa", location: { district: "Kathmandu", municipality: "Kapan", ward: "8" }, distance: "1.8 km", phone: "9812345680", mapLink: "https://maps.google.com" },
  ];

  const completedJobs = [
    { id: 4, name: "Sam KC", rated: true, stars: 4.5 },
    { id: 5, name: "Laxmi Sharma", rated: false, stars: 0 },
  ];

  // ✅ Updated logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home"); // redirect to home
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f9f6f1]">
      {/* Sidebar/Profile */}
      <div className="lg:w-80 bg-white p-4 sm:p-6 shadow-lg border-r flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile</h2>

        <div className="text-center mb-4">
          <img src={profile.photo} alt="profile" className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 mx-auto" />
        </div>

        <div className="space-y-3 text-gray-700">
          <p className="font-bold text-lg text-center">{profile.name}</p>
          <p className="text-left">{profile.profession}</p>
          <p className="text-left">⏳ {profile.experience}</p>

          {/* Reviews */}
          <div className="flex items-center gap-1 mt-1">
            <FaStar className="text-yellow-400" />
            <span>{profile.reviews} ({profile.totalReviews} reviews)</span>
          </div>

          {/* Location */}
          <p className="mt-1 text-gray-600 text-sm text-left">
            📍 {profile.location.district}, {profile.location.municipality}, Ward {profile.location.ward}
          </p>

          {/* Phone Section */}
          <div className="border p-3 rounded-lg mt-2">
            <p className="font-semibold">Phone:</p>
            {editPhone ? (
              <div className="flex gap-2">
                <input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-1 border rounded"
                />
                <button
                  onClick={() => setEditPhone(false)}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profile.phone}</span>
                <button onClick={() => setEditPhone(true)} className="text-blue-500 text-sm ml-1 flex items-center gap-1"><FaEdit /> Edit</button>
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div className="border p-3 rounded-lg mt-2">
            <p className="font-semibold">Skills:</p>
            {editSkills ? (
              <div>
                <textarea
                  value={profile.skills}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                  className="w-full p-1 border rounded"
                />
                <button
                  onClick={() => setEditSkills(false)}
                  className="bg-blue-500 text-white px-2 rounded mt-1"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profile.skills}</span>
                <button onClick={() => setEditSkills(true)} className="text-blue-500 text-sm ml-1 flex items-center gap-1"><FaEdit /> Edit</button>
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div className="border p-3 rounded-lg mt-2">
            <p className="font-semibold">Bio:</p>
            {editBio ? (
              <div>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-1 border rounded"
                />
                <button
                  onClick={() => setEditBio(false)}
                  className="bg-blue-500 text-white px-2 rounded mt-1"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profile.bio}</span>
                <button onClick={() => setEditBio(true)} className="text-blue-500 text-sm ml-1 flex items-center gap-1"><FaEdit /> Edit</button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "incoming" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Incoming Requests
          </button>
          <button
            onClick={() => setActiveTab("accepted")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "accepted" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Accepted Requests
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Completed Jobs
          </button>
        </div>

        {/* ✅ LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg mt-4"
        >
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Incoming */}
        {activeTab === "incoming" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4"><FaInbox className="inline mr-2" /> Incoming Requests</h2>
            {incomingRequests.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-gray-500 text-sm"> {req.location.district}, {req.location.municipality}, Ward {req.location.ward}</p>
                  <p className="text-gray-500 text-sm">📍Distance: {req.distance}</p>
                  <p className="text-blue-500 text-sm">📞 {req.phone}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a href={`tel:${req.phone}`} className="text-blue-500 flex items-center gap-1 text-sm"> <FaPhone className="rotate-90" /> Call</a>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded">Accept</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded">Deny</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accepted */}
        {activeTab === "accepted" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4"><FaClock className="inline mr-2" /> Accepted Requests</h2>
            {acceptedRequests.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-gray-500 text-sm"> {req.location.district}, {req.location.municipality}, Ward {req.location.ward}</p>
                  <p className="text-gray-500 text-sm">📍Distance: {req.distance}</p>
                  <p className="text-blue-500 text-sm">📞 {req.phone}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a href={`tel:${req.phone}`} className="text-blue-500 flex items-center gap-1 text-sm"> <FaPhone className="rotate-90" /> Call</a>
                  <a href={req.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1 text-sm"><FaMapMarkerAlt /> Map</a>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded">Complete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed */}
        {activeTab === "completed" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4"><FaCheckCircle className="text-green-600 inline mr-2" /> Completed Jobs</h2>
            {completedJobs.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-semibold">{req.name}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`mr-1 ${i < Math.floor(req.stars) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    {!req.rated && <span className="ml-2 text-gray-500 text-sm">Not rated</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;

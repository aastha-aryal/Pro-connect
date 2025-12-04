// Updated ProviderDashboard based on your new final flow (Incoming → Accepted → Confirmed)
// Frontend only, no backend yet.

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaCamera, FaCheckCircle, FaClock, FaInbox } from "react-icons/fa";

const ProviderDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("incoming");

  const [profile, setProfile] = useState({
    name: "John Doe",
    phone: "+977-9841234567",
    profession: "Plumber",
    experience: "8 years",
    location: "Kathmandu, Nepal",
    photo: "https://i.pravatar.cc/150?img=12",
  });

  // Sample dummy data for frontend UI only
  const incomingRequests = [
    { id: 1, customer: "Alice Rai", location: "Baneshwor" },
    { id: 2, customer: "Suman Thapa", location: "Kupandole" },
  ];

  const acceptedRequests = [
    { id: 3, customer: "Mina Shrestha", location: "Patan", status: "Waiting for customer confirmation" },
  ];

  const confirmedBookings = [
    { id: 4, customer: "Arjun KC", phone: "9812345678", location: "Balaju", status: "confirmed" },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white p-6 shadow-lg border-r">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        <div className="text-center mb-4">
          <div className="relative inline-block">
            <img
              src={profile.photo}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 mx-auto"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow">
                <FaCamera />
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Name"
            />
            <input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Phone"
            />
            <input
              value={profile.profession}
              onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Profession"
            />
            <input
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Experience"
            />
            <input
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Location"
            />
            <button onClick={handleSave} className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2">
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-gray-700">
            <p className="font-bold text-lg">{profile.name}</p>
            <p>{profile.profession}</p>
            <p>📱 {profile.phone}</p>
            <p>📍 {profile.location}</p>
            <p>⏳ {profile.experience}</p>
          </div>
        )}

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 w-full flex justify-center items-center gap-2 bg-blue-100 text-blue-700 py-2 rounded-lg"
        >
          <FaEdit /> Edit Profile
        </button>

        {/* Sidebar Navigation */}
        <div className="mt-10 space-y-3">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "incoming" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Incoming Requests
          </button>
          <button
            onClick={() => setActiveTab("accepted")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "accepted" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Accepted Requests
          </button>
          <button
            onClick={() => setActiveTab("confirmed")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "confirmed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Confirmed Bookings
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {activeTab === "incoming" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <FaInbox /> Incoming Requests
            </h2>
            {incomingRequests.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3 flex justify-between">
                <div>
                  <p className="font-semibold">{req.customer}</p>
                  <p className="text-gray-500">📍 {req.location}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-500 text-white px-4 py-1 rounded">Accept</button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded">Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "accepted" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <FaClock /> Accepted Requests
            </h2>
            {acceptedRequests.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3">
                <p className="font-semibold">{req.customer}</p>
                <p className="text-gray-500">📍 {req.location}</p>
                <p className="text-blue-600 text-sm mt-1">{req.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "confirmed" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-green-600" /> Confirmed Bookings
            </h2>
            {confirmedBookings.map((req) => (
              <div key={req.id} className="border p-4 rounded-lg mb-3">
                <p className="font-semibold">{req.customer}</p>
                <p className="text-gray-500">📱 {req.phone}</p>
                <p className="text-gray-500">📍 {req.location}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-700 rounded text-sm">
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;

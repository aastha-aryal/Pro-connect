import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

export default function ServiceRequestPage() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const category = location.state?.category || params.category;

  const [providers, setProviders] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProviders = [
      {
        id: 1,
        name: "Ram Shrestha",
        mainSkills: ["Pipe Fitting", "Leak Repair", "Drain Cleaning"],
        experience: "5 Years",
        bio: "Residential & commercial plumbing expert.",
        rating: 4.2,
        servicesCount: 34,
        online: true,
        phone: "+977980000001",
        distance: "1.2 km",
        address: "New Baneshwor, Kathmandu",
      },
      {
        id: 2,
        name: "Sita Adhikari",
        mainSkills: ["Bathroom Plumbing", "Water Heater"],
        experience: "3 Years",
        bio: "Certified plumber with quality service.",
        rating: 4.7,
        servicesCount: 21,
        online: false,
        phone: "+977980000002",
        distance: "2.5 km",
        address: "Kalanki, Kathmandu",
      },
    ];

    const filtered = category?.toLowerCase() === "plumber" ? mockProviders : [];
    filtered.sort((a, b) => b.online - a.online);
    setProviders(filtered);
    setLoading(false);
  }, [category]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#f5f7fb] to-[#ffffff]">
      <h3 className="text-3xl font-bold text-center mb-8 capitalize">
        {category}s Near You
      </h3>

      {loading ? (
        <p className="text-center">Loading providers...</p>
      ) : providers.length === 0 ? (
        <p className="text-center">No providers available</p>
      ) : (
        <div className="space-y-6">
          {providers.map((p) => {
            const open = expandedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-xl font-bold text-white">
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
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
                    {/* Rating only */}
                    <p className="text-sm text-gray-500 mt-1">
                      {p.rating} ({p.servicesCount} services)
                    </p>

                    {/* Distance */}
                    <p className="text-sm text-gray-600 mt-2">📍 Distance: {p.distance}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center">
                  <a
                    href={`tel:${p.phone}`}
                    className="text-sm hover:text-blue-600"
                    title={`Call ${p.name}`} // tooltip on hover
                  >
                    <p className="font-semibold text-center">Call Details</p>
                    <p className="flex items-center gap-1 mt-1">
                      <FaPhone className="text-green-600 rotate-90" /> {p.phone}
                    </p>
                  </a>

                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                      Send Request
                    </button>
                  </div>
                  </div>

                {/* Show More */}
                <button
                  onClick={() => toggleExpand(p.id)}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  {open ? "Hide Details" : "Show More"}
                </button>

                {open && (
                  <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
                    {/* Experience & Location */}
                    <p className="text-sm font-semibold">Experience: {p.experience}</p>
                    <p className="text-sm">📌 Area: {p.address}</p>
                    <p className="text-sm">📝 Bio: {p.bio || "N/A"}</p>

                    {/* Top Skills */}
                    <div className="mt-2">
                      <p className="text-sm font-semibold mb-1">Top Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {p.mainSkills.map((s, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

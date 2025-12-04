import React, { useState, useEffect } from "react";

/* ---------------------------------------
  ServiceRequestPage.jsx
  - Premium, clean UI matching Pro-Connect theme
  - Droplet background, glass cards, floating down-arrow
  - Details follow your registration fields
  - Contact shown only after request -> holding -> accepted
----------------------------------------*/

const Droplets = ({ count = 40 }) => {
  const [drops, setDrops] = useState([]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        size: `${Math.random() * 8 + 3}px`,
        duration: `${Math.random() * 6 + 6}s`,
        delay: `${Math.random() * 6}s`,
        opacity: 0.12 + Math.random() * 0.35,
      });
    }
    setDrops(temp);
  }, [count]);

  return (
    <>
      {drops.map((d) => (
        <div
          key={d.id}
          className="pointer-events-none rounded-full absolute"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `floatBack ${d.duration} linear infinite`,
            animationDelay: d.delay,
            background: "rgba(255,255,255,0.6)",
            opacity: d.opacity,
            transformOrigin: "center",
            filter: "blur(0.6px)",
          }}
        />
      ))}
      <style>{`
        @keyframes floatBack {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-6vh) translateX(6px) scale(1.05); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
      `}</style>
    </>
  );
};

// Example mock providers (extend with registration-like fields)
const mockProviders = [
  {
    id: 1,
    name: "ABC Plumber",
    mainSkill: "Plumber",
    company: "PipeWorks Ltd",
    experience: "5 years",
    skills: ["Pipe fitting", "Leak repair", "Drain cleaning"],
    bio: "Experienced plumber specializing in residential pipework and emergency repairs. Reliable and punctual.",
    location: "Kathmandu, Lalitpur",
    contact: "+977-981234561",
    photo: "", // leave empty for placeholder
  },
  {
    id: 2,
    name: "XYZ Electrician",
    mainSkill: "Electrician",
    company: "Spark Solutions",
    experience: "3 years",
    skills: ["Wiring", "Switchboard", "Lighting"],
    bio: "Skilled electrician for household and small commercial wiring. Safety-first approach.",
    location: "Bhaktapur",
    contact: "+977-981234562",
    photo: "",
  },
  {
    id: 3,
    name: "HomeFix Tutor",
    mainSkill: "Home Tutor",
    company: "Bright Minds Academy",
    experience: "4 years",
    skills: ["Mathematics", "Physics", "Exam prep"],
    bio: "Patient tutor with 4 years experience helping school students build confidence and grades.",
    location: "Pokhara",
    contact: "+977-981234563",
    photo: "",
  },
  {
    id: 4,
    name: "PaintPro Painter",
    mainSkill: "Painter",
    company: "ColorSplash",
    experience: "6 years",
    skills: ["Interior paint", "Exterior paint", "Texture finishes"],
    bio: "Professional painter with an eye for detail. Clean, fast, and high quality finishes.",
    location: "Lalitpur",
    contact: "+977-981234564",
    photo: "",
  },
];

export default function ServiceRequestPage() {
  const [expanded, setExpanded] = useState(null);
  const [holdingId, setHoldingId] = useState(null);
  const [acceptedId, setAcceptedId] = useState(null); // simulates provider accepted
  const [confirmedId, setConfirmedId] = useState(null);

  // expand toggle
  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  // customer clicks Request -> simulate sending request and waiting (holding)
  const handleRequest = (id) => {
    // can't request the same provider twice if already confirmed
    if (confirmedId === id || holdingId === id) return;

    setHoldingId(id);
    // simulate network / provider decision time
    setTimeout(() => {
      setHoldingId(null);
      // Simulate provider acceptance: setAcceptedId to show contact info
      setAcceptedId(id);
    }, 1600);
  };

  // Confirm booking (final)
  const handleConfirm = (id) => {
    setConfirmedId(id);
    alert(`✔ Booking confirmed with provider: ${id}`);
  };

  // Cancel / deny request (customer cancels or provider denies)
  const handleCancel = (id) => {
    if (acceptedId === id) setAcceptedId(null);
    setHoldingId(null);
    setConfirmedId(null);
    alert(`Request cancelled for provider ${id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#18334f] to-[#445f7e] text-white py-8 px-4 sm:px-8">
      {/* background droplets */}
      <Droplets />

      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00ffff] to-[#ddb7c3]">
          Trusted Service Providers
        </h1>

        <p className="text-center text-gray-200 max-w-2xl mx-auto mb-8">
          Browse professionals verified on Pro-Connect. Click the arrow to view details — request a provider and contact will be shown once accepted.
        </p>

        {/* providers grid */}
        <div className="grid gap-6">
          {mockProviders.map((p) => {
            const isExpanded = expanded === p.id;
            const isHolding = holdingId === p.id;
            const isAccepted = acceptedId === p.id;
            const isConfirmed = confirmedId === p.id;

            return (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-white/6 p-4 flex flex-col sm:flex-row gap-4 items-start shadow-lg transform transition hover:scale-[1.008]`}
              >
                {/* Profile photo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#31d7c9] to-[#A772FF] flex items-center justify-center text-white text-xl font-bold shadow-inner">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="uppercase">{p.name.charAt(0)}</span>
                    )}
                  </div>
                </div>

                {/* main info */}
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold leading-tight">{p.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm px-2 py-1 rounded-md bg-white/6 text-[#e6fdfd] font-medium">{p.mainSkill}</span>
                        <span className="text-sm text-gray-300">
                          {p.company ? p.company : <span className="italic text-gray-400">Company: Not Mentioned</span>}
                        </span>
                      </div>
                    </div>

                    {/* floating down arrow (option 1 + premium float) */}
                    <button
                      onClick={() => toggleExpand(p.id)}
                      aria-expanded={isExpanded}
                      className={`ml-2 flex-shrink-0 p-2 rounded-md bg-white/8 hover:bg-white/12 transition transform ${isExpanded ? "rotate-180" : ""}`}
                      title={isExpanded ? "Collapse" : "View details"}
                    >
                      <svg
                        className={`w-5 h-5 text-white animate-float-arrow ${isExpanded ? "transform rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* short bio */}
                  <p className="text-gray-200 mt-3 line-clamp-2">{p.bio}</p>

                  {/* expanded details */}
                  <div
                    className={`mt-3 overflow-hidden transition-all duration-400 ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
                      <div>
                        <h4 className="text-sm font-medium text-gray-100 mb-1">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {p.skills.map((s, i) => (
                            <span key={i} className="text-xs bg-white/8 px-2 py-1 rounded-md">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-100 mb-1">Experience</h4>
                        <p className="text-sm">{p.experience}</p>
                      </div>

                      <div className="sm:col-span-2">
                        <h4 className="text-sm font-medium text-gray-100 mb-1">Location</h4>
                        <p className="text-sm">{p.location || <span className="italic text-gray-400">Not specified</span>}</p>
                      </div>

                      <div className="sm:col-span-2">
                        <h4 className="text-sm font-medium text-gray-100 mb-1">About</h4>
                        <p className="text-sm leading-relaxed">{p.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* action area */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* left status */}
                    <div>
                      {!isAccepted && !isHolding && !isConfirmed && (
                        <div className="text-xs text-gray-300">No contact shown until provider accepts request.</div>
                      )}

                      {isHolding && <div className="text-sm text-yellow-300 font-medium">Request sending — please wait...</div>}

                      {isAccepted && !isConfirmed && (
                        <div className="text-sm text-green-300 font-semibold">Provider accepted your request — contact available</div>
                      )}

                      {isConfirmed && <div className="text-sm text-teal-300 font-bold">Booking Confirmed</div>}
                    </div>

                    {/* right actions */}
                    <div className="flex items-center gap-2">
                      {/* Request button (only if not accepted yet) */}
                      {!isAccepted && !isConfirmed && (
                        <button
                          disabled={isHolding}
                          onClick={() => handleRequest(p.id)}
                          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497] text-black font-semibold shadow hover:scale-[1.02] disabled:opacity-60"
                        >
                          {isHolding ? "Requesting..." : "Request"}
                        </button>
                      )}

                      {/* When accepted — show contact and Confirm/Deny */}
                      {isAccepted && !isConfirmed && (
                        <>
                          <div className="px-3 py-2 rounded-md bg-white/6 text-white text-sm shadow-inner">
                            <div className="text-xs text-gray-200">Contact</div>
                            <div className="font-semibold">{p.contact}</div>
                          </div>

                          <button onClick={() => handleConfirm(p.id)} className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold shadow">
                            Confirm
                          </button>

                          <button onClick={() => handleCancel(p.id)} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow">
                            Deny
                          </button>
                        </>
                      )}

                      {isConfirmed && (
                        <button className="px-4 py-2 rounded-md bg-gray-200 text-black font-semibold shadow">
                          View Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* subtle floating arrow animation style */}
      <style>{`
        .animate-float-arrow {
          animation: floatArrow 2.2s ease-in-out infinite;
        }
        @keyframes floatArrow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        /* small helper to clamp bios cleanly (tailwind line-clamp may not exist) */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

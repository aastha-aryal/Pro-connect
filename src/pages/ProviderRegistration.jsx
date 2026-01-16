import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addresData from "../data/addresData.json";  

const servicesList = [
  "Plumber", "Electrician", "Home Tutors", "Painter", "House Help", "Babysitters",
  "Beauty & Salon", "Event Decorators", "Carpenter", "Photographer", "Band Baja",
  "Private Chef", "Locksmith", "Boutiques", "Movers & Packers", "Catering Server"
];
const countryCodes = [
  { code: "+977", label: "Nepal" },
  { code: "+91", label: "India" },
  { code: "+880", label: "Bangladesh" },
  { code: "+94", label: "Sri Lanka" },
  { code: "+95", label: "Myanmar" },
  { code: "+86", label: "China" },
  { code: "+81", label: "Japan" },
  { code: "+82", label: "South Korea" },
  { code: "+1", label: "USA / Canada" },
  { code: "+44", label: "UK" },
  { code: "+971", label: "UAE" }
];

const idTypes = ["Citizenship", "National ID", "Passport"];

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", countryCode: "+977", sex: "",
    password: "", confirmPassword: "",
    service: "", experience: "", skills: "",
    province: "", district: "", municipality: "", wardNo: "",
    bio: "",
    profilePhoto: null, idType: "", idFile: null, cvFile: null,
    portfolio: [], extraCert:  [{ file: null }]
  });

  const [errors, setErrors] = useState({});

  // for dynamic location selects
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [wards, setWards] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    if (name === "portfolio") {
      setForm((p) => ({ ...p, portfolio: Array.from(files) }));
    } else {
      setForm((p) => ({ ...p, [name]: files[0] }));
    }
  };

  const handleExtraCertChange = (index, file) => {
    const updated = [...form.extraCert];
    updated[index].file = file;
    setForm((p) => ({ ...p, extraCert: updated }));
  };

  const addExtraCert = () => {
    setForm((p) => ({
      ...p,
      extraCert: [...p.extraCert, { file: null }]
    }));
  };

  const handlePhoneChange = (e) => {
    const number = e.target.value.replace(/\D/g, "");
    if (number.length <= 10) {
      setForm((p) => ({ ...p, phone: number }));
    }
  };

  const isTooLarge = (file) => file?.size > 5 * 1024 * 1024;

  const validateStep = () => {
    const err = {};

    if (step === 1) {
      if (!form.fullName) err.fullName = "Full name required";
      if (!form.email) err.email = "Email required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        err.email = "Invalid email format";

      if (!form.phone) err.phone = "Phone required";
      else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
      if (!form.sex) err.sex = "Sex required";
      if (!form.password) err.password = "Password required";
      else if (form.password.length < 8) err.password = "Min. 8 characters";

      if (form.password !== form.confirmPassword)
        err.confirmPassword = "Password mismatch";

      if (!form.profilePhoto) err.profilePhoto = "Profile photo required";
      else if (isTooLarge(form.profilePhoto)) err.profilePhoto = "Max size 5 MB";
    }

    if (step === 2) {
      if (!form.service) err.service = "Choose your service";
      if (!form.experience) err.experience = "Experience required";
      if (!form.skills) err.skills = "Enter your skills";
    }

    if (step === 3) {
      if (!form.province) err.province = "Province required";
      if (!form.district) err.district = "District required";
      if (!form.municipality) err.municipality = "Municipality required";
      if (!form.wardNo) err.wardNo = "Ward number required";
    }

    if (step === 4) {
      if (!form.idType) err.idType = "Select your ID type";

      if (!form.idFile) err.idFile = "Upload ID";
      else if (isTooLarge(form.idFile)) err.idFile = "Max size 5 MB";

      if (!form.cvFile) err.cvFile = "Upload CV";
      else if (isTooLarge(form.cvFile)) err.cvFile = "Max size 5 MB";

      if (form.portfolio.some((f) => isTooLarge(f)))
        err.portfolio = "Each image must be under 5 MB";

      if (form.extraCert.some((c) => c.file && isTooLarge(c.file)))
        err.extraCert = "Each certificate must be under 5 MB";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => s - 1);

  const submit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setTimeout(() => {
      navigate("/verification", { state: { userType: "provider" } });
    }, 800);
  };

  const fileName = (f) => (f ? f.name : "No file chosen");

  // --- Handlers for dynamic location selects ---
  const handleProvinceChange = (e) => {
    const prov = e.target.value;
    setForm((p) => ({ ...p, province: prov, district: "", municipality: "", wardNo: "" }));
    if (addresData[prov]) {
      setDistricts(Object.keys(addresData[prov]));
    } else {
      setDistricts([]);
    }
    setMunicipalities([]);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setForm((p) => ({ ...p, district: dist, municipality: "", wardNo: "" }));
    if (addresData[form.province] && addresData[form.province][dist]) {
      setMunicipalities(Object.keys(addresData[form.province][dist]));
    } else {
      setMunicipalities([]);
    }
    setWards([]);
  };

  const handleMunicipalityChange = (e) => {
    const mun = e.target.value;
    setForm((p) => ({ ...p, municipality: mun, wardNo: "" }));
    if (
      addresData[form.province] &&
      addresData[form.province][form.district] &&
      addresData[form.province][form.district][mun]
    ) {
      setWards(addresData[form.province][form.district][mun]);
    } else {
      setWards([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-5xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden md:flex"
      >
        {/* Left: decorative image panel (hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white items-center justify-center p-8">
          <div className="max-w-xs">
            <div className="w-full h-64 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
              <div className="text-center px-6">
                <h3 className="text-xl font-bold mb-2">Become a verified professional</h3>
                <p className="text-sm text-slate-300">
                  Build a trusted profile and get matched with customers nearby.
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm text-slate-400">
              Tip: Keep your portfolio and verification documents ready for a faster approval.
            </div>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="w-full md:w-1/2 bg-white p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Create your professional account</h2>
              <p className="text-sm text-slate-600">Build your professional profile</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Step</p>
              <p className="text-lg font-semibold text-slate-900">{step} / 4</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-200 mb-6">
            <div
              className="h-2 bg-slate-900 rounded-full transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-6">
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Basic Information</h2>

                {/* Use a responsive grid that keeps phone and photo separate and prevents overlap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-15">

                  {/* Left column: personal & contact */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500 ml-1">*</span></label>
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleInput}
                        placeholder="Your full name"
                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-50"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Email <span className="text-red-500 ml-1">*</span></label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleInput}
                        placeholder="example@gmail.com"
                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-50"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone row: country code + number, laid out responsibly */}
                    <div>
                      <label className="text-sm font-medium text-slate-700">Phone <span className="text-red-500 ml-1">*</span></label>
                      <div className="flex gap-3 items-center">
                        <div className="shrink-0">
                          <select
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleInput}
                            className="p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800 min-w-[100px]"
                          >
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.code}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          value={form.phone}
                          onChange={handlePhoneChange}
                          className="flex-1 p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800 min-w-[150px]"
                          placeholder="98XXXXXXXX"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Password <span className="text-red-500 ml-1">*</span></label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInput}
                        placeholder="Create password"
                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Confirm Password <span className="text-red-500 ml-1">*</span></label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleInput}
                        placeholder="Re-type password"
                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">Sex <span className="text-red-500 ml-1">*</span></label>
                      <div className="flex gap-4">
                        {["Male", "Female", "Other"].map((g) => (
                          <label key={g} className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="sex"
                              value={g}
                              checked={form.sex === g}
                              onChange={handleInput}
                              className="h-4 w-4 text-slate-900"
                            />
                            <span className="text-sm text-slate-700">{g}</span>
                          </label>
                        ))}
                      </div>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                      )}
                    </div>
                  </div>

                  {/* Right column: photo preview + upload - kept separate so it never overlaps phone */}
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {form.profilePhoto ? (
                          <img
                            src={URL.createObjectURL(form.profilePhoto)}
                            alt="profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>

                      <label className="mt-3 w-full flex items-center justify-center">
                        <input
                          type="file"
                          name="profilePhoto"
                          accept="image/*"
                          onChange={handleFile}
                          className="hidden"
                        />
                        <span className="inline-block px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-slate-700 hover:shadow-sm transform hover:scale-[1.02] transition">
                          Choose photo
                        </span>
                      </label>

                      <p className="text-xs text-slate-400 mt-2 text-center">{fileName(form.profilePhoto)}</p>
                      {errors.profilePhoto && <p className="text-red-500 text-sm mt-1">{errors.profilePhoto}</p>}
                      <p className="text-xs text-slate-400 mt-2 text-center">JPG/PNG, max 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Professional Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Service <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleInput}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    >
                      <option value="">Select service</option>
                      {servicesList.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Years of Experience <span className="text-red-500 ml-1">*</span></label>
                    <input
                      type="number"
                      name="experience"
                      value={form.experience}
                      onChange={handleInput}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      placeholder="e.g. 3"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Skills / Expertise <span className="text-red-500 ml-1">*</span></label>
                    
                    {/* Skills input with tag display */}
                    <div className="mb-2">
                      <div className="flex gap-2 flex-wrap mb-2">
                        {form.skills.split(',').filter(skill => skill.trim() !== '').map((skill, index) => (
                          <div key={index} className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
                            {skill.trim()}
                            <button
                              type="button"
                              onClick={() => {
                                const skillsArray = form.skills.split(',').filter(s => s.trim() !== '');
                                skillsArray.splice(index, 1);
                                setForm(p => ({ ...p, skills: skillsArray.join(',') }));
                              }}
                              className="text-slate-500 hover:text-slate-700 ml-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={form.skillsInput || ''}
                          onChange={(e) => {
                            setForm(p => ({ ...p, skillsInput: e.target.value }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault();
                              const newSkill = form.skillsInput?.trim();
                              if (newSkill) {
                                const currentSkills = form.skills ? form.skills.split(',').filter(s => s.trim() !== '') : [];
                                if (!currentSkills.includes(newSkill)) {
                                  const updatedSkills = [...currentSkills, newSkill].join(',');
                                  setForm(p => ({ 
                                    ...p, 
                                    skills: updatedSkills,
                                    skillsInput: '' 
                                  }));
                                }
                              }
                            }
                          }}
                          className="flex-1 p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                          placeholder="Type skill and press Enter or comma"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSkill = form.skillsInput?.trim();
                            if (newSkill) {
                              const currentSkills = form.skills ? form.skills.split(',').filter(s => s.trim() !== '') : [];
                              if (!currentSkills.includes(newSkill)) {
                                const updatedSkills = [...currentSkills, newSkill].join(',');
                                setForm(p => ({ 
                                  ...p, 
                                  skills: updatedSkills,
                                  skillsInput: '' 
                                }));
                              }
                            }
                          }}
                          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                        >
                          Add
                        </button>
                      </div>
                      
                      <p className="text-xs text-slate-400 mt-1">Press Enter to add a skill, or click Add button</p>
                    </div>
                    
                    {errors.skills && (
                      <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Short Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleInput}
                      rows="4"
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      placeholder="Introduce yourself briefly..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Location Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Province <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="province"
                      value={form.province}
                      onChange={handleProvinceChange}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    >
                      <option value="">Select Province</option>
                      {Object.keys(addresData).map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">District <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleDistrictChange}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      disabled={!districts.length}
                    >
                      <option value="">Select District</option>
                      {districts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Municipality <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="municipality"
                      value={form.municipality}
                      onChange={handleMunicipalityChange}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      disabled={!municipalities.length}
                    >
                      <option value="">Select Municipality</option>
                      {municipalities.map((mun) => (
                        <option key={mun} value={mun}>
                          {mun}
                        </option>
                      ))}
                    </select>
                    {errors.municipality && (
                      <p className="text-red-500 text-sm mt-1">{errors.municipality}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Ward No <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="wardNo"
                      value={form.wardNo}
                      onChange={handleInput}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                      disabled={!wards.length}
                    >
                      <option value="">Select Ward</option>
                      {wards.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                    {errors.wardNo && (
                      <p className="text-red-500 text-sm mt-1">{errors.wardNo}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Documents Upload</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">ID Type <span className="text-red-500 ml-1">*</span></label>
                    <select
                      name="idType"
                      value={form.idType}
                      onChange={handleInput}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    >
                      <option value="">Select ID Type</option>
                      {idTypes.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                    {errors.idType && (
                      <p className="text-red-500 text-sm mt-1">{errors.idType}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Upload ID <span className="text-red-500 ml-1">*</span></label>
                    <p className="text-xs text-slate-400 mb-1">Max size: 5 MB</p>
                    <input
                      type="file"
                      name="idFile"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFile}
                      className="w-full p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    />
                    {errors.idFile && (
                      <p className="text-red-500 text-sm mt-1">{errors.idFile}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Upload CV <span className="text-red-500 ml-1">*</span></label>
                    <p className="text-xs text-slate-400 mb-1">Max: 5 MB (PDF)</p>
                    <input
                      type="file"
                      name="cvFile"
                      accept=".pdf"
                      onChange={handleFile}
                      className="w-full p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    />
                    {errors.cvFile && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvFile}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Portfolio</label>
                    <p className="text-xs text-slate-400 mb-1">Max: 5 MB each (pdf/jpg/png)</p>
                    <input
                      type="file"
                      name="portfolio"
                      accept=".pdf,.jpg,.png"
                      multiple
                      onChange={handleFile}
                      className="w-full p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                    />
                    <p className="text-xs text-slate-400 mt-1">{form.portfolio.length} selected</p>
                    {errors.portfolio && (
                      <p className="text-red-500 text-sm mt-1">{errors.portfolio}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 block mb-2">Extra Certificates</label>
                    <p className="text-xs text-slate-400 mb-2">Max: 5 MB each (pdf/jpg/png)</p>

                    {form.extraCert.map((c, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => handleExtraCertChange(i, e.target.files[0])}
                          className="flex-1 p-2 rounded-xl border border-gray-200 bg-white text-sm text-slate-800"
                        />
                        {i === form.extraCert.length - 1 && (
                          <button
                            type="button"
                            onClick={addExtraCert}
                            className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}

                    {errors.extraCert && (
                      <p className="text-red-500 text-sm mt-1">{errors.extraCert}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="px-4 py-2 rounded-lg bg-gray-100 text-slate-800 font-medium hover:shadow-sm transition"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:shadow-md transform hover:scale-[1.02] transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit & Verify"}
              </button>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-4">By continuing, you agree to our terms & conditions.</p>
        </div>
      </form>
    </div>
  );
};

export default ProviderRegistration;

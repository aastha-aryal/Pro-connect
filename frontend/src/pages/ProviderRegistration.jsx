import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  ProviderRegistration.jsx
  - Multi-step professional registration form
  - Fields: Basic + Professional + Advanced (as requested)
  - File inputs are stored in local state (no upload here)
  - On success: navigate("/verification", { state: { userType: "provider" } })
*/

const servicesList = [
  "Plumber","Electrician","Home Tutors","Painter","House Help","Babysitters",
  "Beauty & Salon","Event Decorators","Carpenter","Photographer","Interior Designer",
  "Private Chef","Locksmith","Boutiques","Movers & Packers","Catering Server"
];

const provinces = [
  "Province 1","Province 2","Bagmati Province","Gandaki Province",
  "Lumbini Province","Karnali Province","Sudurpashchim Province"
];

const idTypes = ["Citizenship","National ID","Passport","Driving License","Voter Card"];

const ProviderRegistration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    // Basic
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Professional
    service: "",
    experience: "",
    skills: "",
    pricing: "",
    availability: "",
    // Location
    province: "",
    district: "",
    city: "",
    // Advanced
    bio: "",
    emergencyName: "",
    emergencyPhone: "",
    // files (store File objects)
    profilePhoto: null,
    idType: "",
    idFile: null,
    cvFile: null,
    portfolio: [] // array of Files
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "portfolio") {
      // allow multiple portfolio files
      setForm((p) => ({ ...p, portfolio: Array.from(files) }));
    } else {
      setForm((p) => ({ ...p, [name]: files[0] }));
    }
  };

  // basic phone sanitizer
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) setForm((p) => ({ ...p, phone: val }));
  };

  const validateStep = () => {
    const err = {};
    if (step === 1) {
      if (!form.fullName) err.fullName = "Full name required";
      if (!form.email) err.email = "Email required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email";
      if (!form.phone) err.phone = "Phone required";
      else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
      if (!form.password) err.password = "Password required";
      else if (form.password.length < 8) err.password = "Password must be >= 8 chars";
      if (form.password !== form.confirmPassword) err.confirmPassword = "Password mismatch";
    } else if (step === 2) {
      if (!form.service) err.service = "Select a service";
      if (form.experience === "" || form.experience === null) err.experience = "Experience required";
      if (!form.skills) err.skills = "Enter skills or services";
    } else if (step === 3) {
      if (!form.province) err.province = "Province required";
      if (!form.district) err.district = "District required";
      if (!form.city) err.city = "City required";
    } else if (step === 4) {
      if (!form.idType) err.idType = "Select ID type";
      if (!form.idFile) err.idFile = "Upload ID";
      if (!form.cvFile) err.cvFile = "Upload CV";
      // profile photo optional but recommend
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(5, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = (e) => {
    e.preventDefault();
    // final validation across all steps (light)
    // ensure step 4 required fields are present
    setStep(4);
    if (!validateStep()) return;
    setSubmitting(true);

    // Simulate server processing
    setTimeout(() => {
      console.log("Provider registration data:", form);
      setSubmitting(false);
      navigate("/verification", { state: { userType: "provider" } });
    }, 800);
  };

  // small helper to show file name
  const fileName = (f) => (f ? f.name : "No file chosen");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0D1B2A] to-[#415A77] p-6">
      <form
        className="w-full max-w-3xl bg-[#243240]/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-2xl"
        onSubmit={submit}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Pro-Connect Provider Registration</h1>
            <p className="text-sm text-gray-200/80 mt-1">Create your professional profile to connect with customers.</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-300">Step</div>
            <div className="text-lg font-bold text-[#31d7c9]">{step} / 5</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497]"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* STEP CONTENT */}
        <div className="space-y-4 text-white">
          {/* Step 1: Basic */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Full Name <span className="text-red-400">*</span></label>
                  <input name="fullName" value={form.fullName} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Your full name" />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Email <span className="text-red-400">*</span></label>
                  <input name="email" value={form.email} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="you@email.com" />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Phone <span className="text-red-400">*</span></label>
                  <input name="phone" value={form.phone} onChange={handlePhoneChange}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="10-digit phone" />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Profile Photo (optional)</label>
                  <input type="file" name="profilePhoto" accept="image/*" onChange={handleFile}
                    className="w-full p-2 rounded-md bg-white text-black" />
                  <p className="text-xs text-gray-300 mt-1">{fileName(form.profilePhoto)}</p>
                </div>

                <div>
                  <label className="block text-sm mb-1">Password <span className="text-red-400">*</span></label>
                  <input type="password" name="password" value={form.password} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Create password" />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Confirm Password <span className="text-red-400">*</span></label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Re-type password" />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Professional Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Service Category <span className="text-red-400">*</span></label>
                  <select name="service" value={form.service} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black">
                    <option value="">Select service</option>
                    {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Years of Experience <span className="text-red-400">*</span></label>
                  <input type="number" min="0" name="experience" value={form.experience} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="e.g. 3" />
                  {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Skills / Services Offered <span className="text-red-400">*</span></label>
                  <input name="skills" value={form.skills} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Comma separated e.g. wiring, fan repair" />
                  {errors.skills && <p className="text-red-400 text-sm mt-1">{errors.skills}</p>}
                </div>

                

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Short Bio (optional)</label>
                  <textarea name="bio" value={form.bio} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Introduce yourself, experience highlights..." rows="4" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Location</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm mb-1">Province <span className="text-red-400">*</span></label>
                  <select name="province" value={form.province} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black">
                    <option value="">Select Province</option>
                    {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.province && <p className="text-red-400 text-sm mt-1">{errors.province}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">District <span className="text-red-400">*</span></label>
                  <input name="district" value={form.district} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="e.g. Kathmandu" />
                  {errors.district && <p className="text-red-400 text-sm mt-1">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">City / Municipality <span className="text-red-400">*</span></label>
                  <input name="city" value={form.city} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="e.g. Lalitpur" />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Documents & Verification</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">ID Type <span className="text-red-400">*</span></label>
                  <select name="idType" value={form.idType} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black">
                    <option value="">Select ID Type</option>
                    {idTypes.map((id) => <option key={id} value={id}>{id}</option>)}
                  </select>
                  {errors.idType && <p className="text-red-400 text-sm mt-1">{errors.idType}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Upload ID (jpg/png) <span className="text-red-400">*</span></label>
                  <input type="file" name="idFile" accept=".jpg,.jpeg,.png" onChange={handleFile}
                    className="w-full p-2 rounded-md bg-white text-black" />
                  {errors.idFile && <p className="text-red-400 text-sm mt-1">{errors.idFile}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Upload CV (pdf/jpg) <span className="text-red-400">*</span></label>
                  <input type="file" name="cvFile" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile}
                    className="w-full p-2 rounded-md bg-white text-black" />
                  {errors.cvFile && <p className="text-red-400 text-sm mt-1">{errors.cvFile}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">Portfolio (images) - optional</label>
                  <input type="file" name="portfolio" accept="image/*" multiple onChange={handleFile}
                    className="w-full p-2 rounded-md bg-white text-black" />
                  <p className="text-xs text-gray-300 mt-1">{form.portfolio.length} files selected</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Advanced & Emergency */}
          {step === 5 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Advanced / Emergency Info</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Short Bio (optional)</label>
                  <textarea name="bio" value={form.bio} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" rows="4" placeholder="A short intro about you." />
                </div>

                <div>
                  <label className="block text-sm mb-1">Emergency Contact Name</label>
                  <input name="emergencyName" value={form.emergencyName} onChange={handleInput}
                    className="w-full p-3 rounded-md bg-white text-black" placeholder="Relative / friend" />
                </div>

                <div>
                  <label className="block text-sm mb-1">Emergency Contact Phone</label>
                  <input name="emergencyPhone" value={form.emergencyPhone} onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setForm((p) => ({ ...p, emergencyPhone: val }));
                  }} className="w-full p-3 rounded-md bg-white text-black" placeholder="10-digit phone" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Certifications / Documents (optional)</label>
                  <input type="file" name="extraCert" accept=".pdf,.jpg,.png" onChange={(e) => console.log("cert chosen", e.target.files)}
                    className="w-full p-2 rounded-md bg-white text-black" />
                  <p className="text-xs text-gray-300 mt-1">Upload any certifications you want to show.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div>
            {step > 1 && (
              <button type="button" onClick={prev}
                className="px-4 py-2 rounded-md bg-gray-300 text-black font-semibold mr-2 hover:opacity-90">
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < 5 ? (
              <button type="button" onClick={next}
                className="px-5 py-2 bg-gradient-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497] text-black rounded-xl font-bold shadow">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={submitting}
                className="px-5 py-2 bg-[#189397] text-white rounded-xl font-bold shadow disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit & Verify"}
              </button>
            )}
          </div>
        </div>

        {/* small note */}
        <p className="text-xs text-gray-300 mt-4">By submitting, you agree to our terms. This demo stores files in local state only.</p>
      </form>
    </div>
  );
};

export default ProviderRegistration;

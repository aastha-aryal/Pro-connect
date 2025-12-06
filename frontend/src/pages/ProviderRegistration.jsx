import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const servicesList = [
  "Plumber", "Electrician", "Home Tutors", "Painter", "House Help",
  "Babysitters", "Beauty & Salon", "Event Decorators", "Carpenter",
  "Photographer", "Band & DJ", "Private Chef", "Locksmith", "Boutiques",
  "Movers & Packers", "Catering Server"
];

const provinces = [
  "Province 1", "Province 2", "Bagmati Province", "Gandaki Province",
  "Lumbini Province", "Karnali Province", "Sudurpashchim Province"
];

const idTypes = ["Citizenship", "National ID", "Passport"];

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    service: "", experience: "", skills: "", pricing: "", availability: "",
    province: "", city: "", bio: "",
    emergencyName: "", emergencyPhone: "",
    profilePhoto: null, idType: "", idFile: null
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFile = (e) => {
    const { name, files } = e.target;
    if (!files) return;
    setForm(p => ({ ...p, [name]: files[0] }));
  };
  const handlePhone = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) setForm(p => ({ ...p, phone: val }));
  };

  const validateStep = () => {
    const err = {};
    if (step === 1) {
      if (!form.fullName) err.fullName = "Full name is required";
      if (!form.email) err.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email format";
      if (!form.phone) err.phone = "Phone is required";
      else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
      if (!form.password) err.password = "Password is required";
      else if (form.password.length < 8) err.password = "Password must be at least 8 characters";
      if (form.password !== form.confirmPassword) err.confirmPassword = "Passwords do not match";
    }
    if (step === 2) {
      if (!form.service) err.service = "Select a service";
      if (!form.experience) err.experience = "Experience is required";
      if (!form.skills) err.skills = "Enter your skills";
    }
    if (step === 3) {
      if (!form.province) err.province = "Select province";
      if (!form.city) err.city = "Enter city";
    }
    if (step === 4) {
      if (!form.profilePhoto) err.profilePhoto = "Upload profile photo";
      if (!form.idType) err.idType = "Select ID type";
      if (!form.idFile) err.idFile = "Upload ID file";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(5, s + 1)); };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);

    const data = new FormData();
    Object.keys(form).forEach(k => {
      if (form[k] instanceof File) data.append(k, form[k]);
      else data.append(k, form[k]);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/service-providers/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.data.token) localStorage.setItem("token", response.data.token);
      navigate("/verification", { state: { userType: "provider" } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7faff] p-6">
      <form className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Service Provider Registration</h1>
        <p className="text-gray-500 mb-6">Sign up to offer your services professionally.</p>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-2 mx-1 rounded-full ${step >= s ? "bg-teal-600" : "bg-gray-300"}`}></div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input type="text" name="phone" value={form.phone} onChange={handlePhone}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
              <input type="password" name="password" value={form.password} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Professional Info */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Service <span className="text-red-500">*</span></label>
              <select name="service" value={form.service} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="">Select a service</option>
                {servicesList.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </select>
              {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">Experience (Years) <span className="text-red-500">*</span></label>
              <input type="number" name="experience" value={form.experience} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">Skills <span className="text-red-500">*</span></label>
              <input type="text" name="skills" value={form.skills} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Province <span className="text-red-500">*</span></label>
              <select name="province" value={form.province} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="">Select Province</option>
                {provinces.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
              </select>
              {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">City <span className="text-red-500">*</span></label>
              <input type="text" name="city" value={form.city} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
          </div>
        )}

        {/* Step 4: ID & Profile */}
        {step === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Profile Photo <span className="text-red-500">*</span></label>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleFile}
                className="w-full mt-1 border rounded px-3 py-2"/>
              {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700">ID Type <span className="text-red-500">*</span></label>
              <select name="idType" value={form.idType} onChange={handleInput}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option value="">Select ID</option>
                {idTypes.map((i, idx) => <option key={idx} value={i}>{i}</option>)}
              </select>
              {errors.idType && <p className="text-red-500 text-sm">{errors.idType}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">Upload ID File <span className="text-red-500">*</span></label>
              <input type="file" name="idFile" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFile}
                className="w-full mt-1 border rounded px-3 py-2"/>
              {errors.idFile && <p className="text-red-500 text-sm">{errors.idFile}</p>}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && <button type="button" onClick={prev} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition">Previous</button>}
          {step < 4 ? <button type="button" onClick={next} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition">Next</button> :
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition">{submitting ? "Submitting..." : "Submit & Verify"}</button>}
        </div>
      </form>
    </div>
  );
};

export default ProviderRegistration;

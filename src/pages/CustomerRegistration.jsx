import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  { code: "+971", label: "UAE" },
];

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+977",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  // --- Handlers ---
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const number = e.target.value.replace(/\D/g, "");
    if (number.length <= 10) setForm((p) => ({ ...p, phone: number }));
  };

  const handleFile = (e) => {
    setForm((p) => ({ ...p, profilePhoto: e.target.files?.[0] || null }));
  };

  const validateForm = () => {
    const err = {};
    
    if (!form.fullName.trim()) err.fullName = "Full name is required";
    
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email format";
    
    if (!form.phone) err.phone = "Phone number is required";
    else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
    
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 8) err.password = "Password must be at least 8 characters";
    
    if (!form.confirmPassword) err.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) err.confirmPassword = "Passwords do not match";
    
    // Profile photo is optional, but if provided, validate size
    if (form.profilePhoto && form.profilePhoto.size > 5 * 1024 * 1024) {
      err.profilePhoto = "Maximum file size is 5 MB";
    }
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSubmitting(true);
    setTimeout(() => {
      console.log("Customer submitted:", form);
      navigate("/verification", { state: { userType: "customer" } });
    }, 800);
  };

  const fileName = (f) => (f ? f.name : "No file chosen");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-5xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden md:flex"
      >
        {/* Left panel */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white items-center justify-center p-8">
          <div className="max-w-xs text-center">
            <h3 className="text-xl font-bold mb-2">Join Pro-Connect</h3>
            <p className="text-sm text-slate-300">
              Build your customer profile and explore verified professionals nearby.
            </p>
            <p className="mt-6 text-sm text-slate-400">
              Tip: Keep your information accurate for faster verification.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 bg-white p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Customer Registration</h2>
            <p className="text-sm text-slate-600">Create your account</p>
          </div>

          {/* Single step form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: form fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  name="fullName" 
                  value={form.fullName} 
                  onChange={handleInput} 
                  placeholder="Your full name" 
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handleInput} 
                  placeholder="example@gmail.com" 
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <select 
                    name="countryCode" 
                    value={form.countryCode} 
                    onChange={handleInput} 
                    className="p-2 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                  <input 
                    value={form.phone} 
                    onChange={handlePhoneChange} 
                    className="flex-1 p-2 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" 
                    placeholder="98XXXXXXXX"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="password" 
                  value={form.password} 
                  onChange={handleInput} 
                  placeholder="Minimum 8 characters"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={form.confirmPassword} 
                  onChange={handleInput} 
                  placeholder="Re-enter your password"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Right column: profile photo (optional) */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                {form.profilePhoto ? (
                  <img src={URL.createObjectURL(form.profilePhoto)} alt="profile" className="w-full h-full object-cover"/>
                ) : (
                  <span className="text-gray-300">Photo (Optional)</span>
                )}
              </div>
              <label className="w-full flex justify-center items-center">
                <input type="file" name="profilePhoto" accept="image/*" onChange={handleFile} className="hidden"/>
                <span className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm hover:shadow-sm cursor-pointer hover:border-red-500 transition-colors">
                  Choose Photo
                </span>
              </label>
              <p className="text-xs text-gray-400">{fileName(form.profilePhoto)}</p>
              {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto}</p>}
              <p className="text-xs text-gray-400 text-center">Optional • Max size 5 MB</p>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={submitting} 
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit & Verify"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistration;
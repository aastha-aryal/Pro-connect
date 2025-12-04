import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    service: "", experience: "", skills: "", pricing: "", availability: "",
    province: "", district: "", city: "", bio: "",
    emergencyName: "", emergencyPhone: "",
    profilePhoto: null, idType: "", idFile: null, cvFile: null, portfolio: []
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFile = (e) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "portfolio") setForm(p => ({ ...p, portfolio: Array.from(files) }));
    else setForm(p => ({ ...p, [name]: files[0] }));
  };
  const handlePhone = (e) => {
    const val = e.target.value.replace(/\D/g,"");
    if(val.length<=10) setForm(p=>({...p, phone: val}));
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
    }
    if (step === 2) {
      if (!form.service) err.service = "Select a service";
      if (!form.experience) err.experience = "Experience required";
      if (!form.skills) err.skills = "Enter skills or services";
    }
    if (step === 3) {
      if (!form.province) err.province = "Province required";
      if (!form.district) err.district = "District required";
      if (!form.city) err.city = "City required";
    }
    if (step === 4) {
      if (!form.idType) err.idType = "Select ID type";
      if (!form.idFile) err.idFile = "Upload ID";
      if (!form.cvFile) err.cvFile = "Upload CV";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => { if(validateStep()) setStep(s => Math.min(5,s+1)); };
  const prev = () => setStep(s => Math.max(1,s-1));

  const submit = async (e) => {
    e.preventDefault();
    if(!validateStep()) return;
    setSubmitting(true);

    const data = new FormData();
    Object.keys(form).forEach(k => {
      if(k==="portfolio") form.portfolio.forEach(f=>data.append("portfolio[]", f));
      else if(form[k] instanceof File) data.append(k, form[k]);
      else data.append(k, form[k]);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/service-providers/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Provider registered:", response.data);
      if(response.data.token) localStorage.setItem("token", response.data.token);
      navigate("/verification", { state: { userType: "provider" } });
    } catch(err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0D1B2A] to-[#415A77] p-6">
      <form className="w-full max-w-3xl bg-[#243240]/80 border border-gray-700 rounded-2xl p-6 shadow-2xl" onSubmit={submit}>
        <h1 className="text-2xl font-extrabold text-white mb-2">Service Provider Registration</h1>
        <p className="text-sm text-gray-200 mb-4">Sign up to offer your services professionally.</p>

        {/* Step forms (similar to your current UI with all fields and error messages) */}

        <div className="flex justify-between mt-6">
          {step>1 && <button type="button" onClick={prev} className="px-4 py-2 bg-gray-300 text-black rounded-md">Previous</button>}
          {step<5 ? <button type="button" onClick={next} className="px-4 py-2 bg-linear-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497] text-black rounded-md">Next</button> :
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#189397] text-white rounded-md">{submitting ? "Submitting..." : "Submit & Verify"}</button>}
        </div>
      </form>
    </div>
  );
};

export default ProviderRegistration;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const provinces = [
  "Province 1","Province 2","Bagmati Province","Gandaki Province",
  "Lumbini Province","Karnali Province","Sudurpashchim Province"
];

const districts = [
  "Kathmandu","Lalitpur","Bhaktapur","Pokhara","Chitwan","Dharan","Biratnagar"
];

const CustomerRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    province: "",
    district: "",
    municipality: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePhone = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    if (v.length <= 10) setForm((p) => ({ ...p, phone: v }));
  };

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Full name required";
    if (!form.email) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email";
    if (!form.password) err.password = "Password required";
    else if (form.password.length < 8) err.password = "At least 8 characters";
    if (!form.phone) err.phone = "Phone required";
    else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
    if (!form.province) err.province = "Select province";
    if (!form.district) err.district = "Select district";
    if (!form.municipality) err.municipality = "Municipality required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = { ...form, phone: `+977${form.phone}` };

    try {
      const response = await axios.post("http://localhost:5000/api/customers/register", payload);
      console.log("Customer registered:", response.data);
      if(response.data.token) localStorage.setItem("token", response.data.token);
      navigate("/verification", { state: { userType: "customer" } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0D1B2A] to-[#415A77] p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-[#243240]/80 border border-gray-700 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white mb-2">Customer Registration</h1>
        <p className="text-sm text-gray-200 mb-4">Sign up to book trusted professionals near you.</p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-white mb-1">Full Name <span className="text-red-400">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black" placeholder="Your name" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Email <span className="text-red-400">*</span></label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black" placeholder="you@email.com" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password <span className="text-red-400">*</span></label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black" placeholder="At least 8 characters" />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Phone <span className="text-red-400">*</span></label>
            <div className="flex items-center bg-white rounded-md">
              <div className="px-3 text-black font-semibold">+977</div>
              <input name="phone" value={form.phone} onChange={handlePhone} className="flex-1 p-3 bg-transparent text-black" placeholder="10-digit number" />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Province <span className="text-red-400">*</span></label>
            <select name="province" value={form.province} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black">
              <option value="">Select Province</option>
              {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.province && <p className="text-red-400 text-sm mt-1">{errors.province}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">District <span className="text-red-400">*</span></label>
            <select name="district" value={form.district} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black">
              <option value="">Select District</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.district && <p className="text-red-400 text-sm mt-1">{errors.district}</p>}
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Municipality <span className="text-red-400">*</span></label>
            <input name="municipality" value={form.municipality} onChange={handleChange} className="w-full p-3 rounded-md bg-white text-black" placeholder="Town / Municipality" />
            {errors.municipality && <p className="text-red-400 text-sm mt-1">{errors.municipality}</p>}
          </div>
        </div>

        <button type="submit" disabled={submitting} className="w-full mt-4 py-3 rounded-full bg-linear-to-r from-[#31d7c9] via-[#00F5FF] to-[#c13497] font-bold text-black shadow">
          {submitting ? "Registering..." : "Register"}
        </button>

        <p className="text-xs text-gray-300 mt-3">By registering you agree to Pro-Connect terms.</p>
      </form>
    </div>
  );
};

export default CustomerRegistration;

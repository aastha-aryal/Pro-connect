import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const provincesList = [
  "Province 1",
  "Province 2",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province"
];

const CustomerRegistration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [addressData, setAddressData] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    province: "",
    district: "",
    city: "",
    ward: ""
  });

  const [errors, setErrors] = useState({});
  const [districtOptions, setDistrictOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    // Fetch JSON from public folder
    fetch("/addressData.json")
      .then((res) => res.json())
      .then((data) => setAddressData(data))
      .catch((err) => console.error("Error loading addressData:", err));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) setForm((p) => ({ ...p, phone: val }));
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setForm((prev) => ({ ...prev, province, district: "", city: "", ward: "" }));
    setDistrictOptions(addressData[province] ? Object.keys(addressData[province]) : []);
    setMunicipalityOptions([]);
    setWardOptions([]);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setForm((prev) => ({ ...prev, district, city: "", ward: "" }));
    setMunicipalityOptions(
      addressData[form.province]?.[district] ? Object.keys(addressData[form.province][district]) : []
    );
    setWardOptions([]);
  };

  const handleMunicipalityChange = (e) => {
    const city = e.target.value;
    setForm((prev) => ({ ...prev, city, ward: "" }));
    setWardOptions(
      addressData[form.province]?.[form.district]?.[city] || []
    );
  };

  const handleWardChange = (e) => {
    setForm((prev) => ({ ...prev, ward: e.target.value }));
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
      if (!form.province) err.province = "Province required";
      if (!form.district) err.district = "District required";
      if (!form.city) err.city = "City required";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(2, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setTimeout(() => {
      console.log("Customer registration data:", form);
      setSubmitting(false);
      navigate("/verification", { state: { userType: "customer" } });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f2ea] p-6">
      <form
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-[#e5d9c4]"
        onSubmit={submit}
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Customer Registration</h1>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
          <div className="h-2 bg-[#c49b6f]" style={{ width: `${(step / 2) * 100}%` }} />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleInput}
                placeholder="Your full name"
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="you@email.com"
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit phone"
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  placeholder="Password"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Province *</label>
              <select
                name="province"
                value={form.province}
                onChange={handleProvinceChange}
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
              >
                <option value="">Select Province</option>
                {provincesList.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">District *</label>
              <select
                name="district"
                value={form.district}
                onChange={handleDistrictChange}
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                disabled={!districtOptions.length}
              >
                <option value="">Select District</option>
                {districtOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">City / Municipality *</label>
              <select
                name="city"
                value={form.city}
                onChange={handleMunicipalityChange}
                className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                disabled={!municipalityOptions.length}
              >
                <option value="">Select City / Municipality</option>
                {municipalityOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {wardOptions.length > 0 && (
              <div>
                <label className="block text-sm mb-1 text-gray-700">Ward (Optional)</label>
                <select
                  name="ward"
                  value={form.ward}
                  onChange={handleWardChange}
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                >
                  <option value="">Select Ward</option>
                  {wardOptions.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 font-semibold"
            >
              Previous
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="px-5 py-2 bg-[#c49b6f] text-white rounded-xl font-bold hover:opacity-90"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-[#a67c52] text-white rounded-xl font-bold disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit & Verify"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistration;

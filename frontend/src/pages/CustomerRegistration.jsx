import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addresData from "../data/addresData.json";

const CustomerRegistration = () => {
  const navigate = useNavigate();

  const provincesList = Object.keys(addresData);
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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    province: "",
    district: "",
    municipality: "",
    ward: "",
  });

  const [errors, setErrors] = useState({});
  const [districtOptions, setDistrictOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Handlers
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) setForm((prev) => ({ ...prev, phone: val }));
  };

  const handleProfilePhoto = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, profilePhoto: "File size must be less than 5MB" }));
      return;
    }
    setErrors((prev) => ({ ...prev, profilePhoto: "" }));
    setForm((prev) => ({ ...prev, profilePhoto: file }));
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    const districts = province ? Object.keys(addresData[province]) : [];
    setDistrictOptions(districts);
    setMunicipalityOptions([]);
    setWardOptions([]);
    setForm((prev) => ({ ...prev, province, district: "", municipality: "", ward: "" }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    const municipalities = district ? Object.keys(addresData[form.province][district]) : [];
    setMunicipalityOptions(municipalities);
    setWardOptions([]);
    setForm((prev) => ({ ...prev, district, municipality: "", ward: "" }));
  };

  const handleMunicipalityChange = (e) => {
    const municipality = e.target.value;
    const wards = municipality
      ? addresData[form.province][form.district][municipality]
      : [];
    setWardOptions(wards);
    setForm((prev) => ({ ...prev, municipality, ward: "" }));
  };

  const handleWardChange = (e) => {
    setForm((prev) => ({ ...prev, ward: e.target.value }));
  };

  // Validation
  const validateForm = () => {
    const err = {};
    if (!form.fullName) err.fullName = "Full name required";
    if (!form.email) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email";
    if (!form.phone) err.phone = "Phone required";
    else if (form.phone.length !== 10) err.phone = "Phone must be 10 digits";
    if (!form.password) err.password = "Password required";
    else if (form.password.length < 8) err.password = "Password must be ≥ 8 characters";
    if (form.password !== form.confirmPassword) err.confirmPassword = "Passwords do not match";
    if (!form.province) err.province = "Province required";
    if (!form.district) err.district = "District required";
    if (!form.municipality) err.municipality = "Municipality required";
    if (!form.ward) err.ward = "Ward number required";
    if (form.profilePhoto && form.profilePhoto.size > 5 * 1024 * 1024)
      err.profilePhoto = "Profile photo max size 5 MB";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setTimeout(() => {
      console.log("Customer registration submitted:", form);
      setSubmitting(false);
      navigate("/verification", { state: { userType: "customer" } });
    }, 800);
  };

  const fileName = (f) => (f ? f.name : "No file chosen");

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8 bg-[#F7F2E8]">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-[#e5d9c4]"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Pro-Connect Customer Registration
        </h1>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInput}
                  placeholder="Your full name"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Email *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  placeholder="example@gmail.com"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                  <div>
                <label className="text-sm font-medium">Phone *</label>

                <div className="flex gap-2 mt-1">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleInput}
                    className="p-3 border rounded-md bg-[#FFFDF9]"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    value={form.phone}
                    onChange={handlePhoneChange}
                    className="flex-1 p-3 border rounded-md bg-[#FFFDF9]"
                    placeholder="98XXXXXXXX"
                  />
                </div>

                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              </div>  
              <div>
                <label className="text-sm font-medium">Profile Photo</label>
                <p className="text-xs text-gray-600 -mt-1 mb-1">Max size: 5 MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhoto}
                  className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                />
                <p className="text-xs text-gray-600 mt-1">{fileName(form.profilePhoto)}</p>
                {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  placeholder="Create password"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                  placeholder="Re-type password"
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Location Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Province *</label>
                <select
                  name="province"
                  value={form.province}
                  onChange={handleProvinceChange}
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                >
                  <option value="">Select Province</option>
                  {provincesList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">District *</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleDistrictChange}
                  disabled={!districtOptions.length}
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                >
                  <option value="">Select District</option>
                  {districtOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Municipality *</label>
                <select
                  name="municipality"
                  value={form.municipality}
                  onChange={handleMunicipalityChange}
                  disabled={!municipalityOptions.length}
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                >
                  <option value="">Select Municipality</option>
                  {municipalityOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {errors.municipality && <p className="text-red-500 text-sm">{errors.municipality}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Ward No *</label>
                <select
                  name="ward"
                  value={form.ward}
                  onChange={handleWardChange}
                  disabled={!wardOptions.length}
                  className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                >
                  <option value="">Select Ward</option>
                  {wardOptions.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-md bg-[#8B4513] text-white font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit & Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistration;

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
    fullName: "", email: "", phone: "", countryCode: "+977", gender: "",
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
       if (!form.gender) err.gender = "Gender required";
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
    <div className="min-h-screen flex justify-center items-center px-4 py-8 bg-[#F7F2E8]">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-[#e5d9c4]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Pro-Connect Provider Registration
            </h1>
            <p className="text-sm text-gray-600">Build your professional profile</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Step</p>
            <p className="text-lg font-semibold text-[#8B4513]">{step} / 4</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-gray-300 mb-6">
          <div
            className="h-2 bg-[#C6A77B] rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* fullName, email, phone, profilePhoto, password, confirmPassword */}
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInput}
                    placeholder="Your full name"
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
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
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>

        {/* Phone with country code */}
            <label className="text-sm font-medium">Phone *</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleInput}
                className="w-full p-2 rounded-md border bg-[#FFFDF9]"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label} ({c.code})
                  </option>
                ))}
              </select>
              <input
                value={form.phone}
                onChange={handlePhoneChange}
                className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                placeholder="98XXXXXXXX"
              />
            </div>

            {/* Gender */}
            <div className="mt-4">
              <label className="text-sm font-medium block mb-1">Gender *</label>
              <div className="flex gap-6">
                {["Male", "Female", "Other"].map((g) => 
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleInput}
                      className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                    />
                    {g}
                  </label>
                )}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>
                </div>(
        )


                <div>
                  <label className="text-sm font-medium">Profile Photo *</label>
                  <p className="text-xs text-gray-600 -mt-1 mb-1">Max size: 5 MB</p>
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {fileName(form.profilePhoto)}
                  </p>
                  {errors.profilePhoto && (
                    <p className="text-red-500 text-sm">{errors.profilePhoto}</p>
                  )}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
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
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Info
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Service *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  >
                    <option value="">Select service</option>
                    {servicesList.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Years of Experience *</label>
                  <input
                    type="number"
                    name="experience"
                    value={form.experience}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                    placeholder="e.g. 3"
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm">{errors.experience}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">
                    Skills / Expertise *
                  </label>
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                    placeholder="Comma-separated skills"
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm">{errors.skills}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Short Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleInput}
                    rows="4"
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                    placeholder="Introduce yourself briefly..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Location Details
              </h2>
              <div className="grid md:grid-cols-3 gap-4">

                {/* Province */}
                <div>
                  <label className="text-sm font-medium">Province *</label>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleProvinceChange}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  >
                    <option value="">Select Province</option>
                    {Object.keys(addresData).map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="text-red-500 text-sm">{errors.province}</p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="text-sm font-medium">District *</label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleDistrictChange}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
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
                    <p className="text-red-500 text-sm">{errors.district}</p>
                  )}
                </div>

                {/* Municipality */}
                <div>
                  <label className="text-sm font-medium">Municipality *</label>
                  <select
                    name="municipality"
                    value={form.municipality}
                    onChange={handleMunicipalityChange}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
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
                    <p className="text-red-500 text-sm">
                      {errors.municipality}
                    </p>
                  )}
                </div>

                {/* Ward */}
                <div>
                  <label className="text-sm font-medium">Ward No *</label>
                  <select
                    name="wardNo"
                    value={form.wardNo}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
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
                    <p className="text-red-500 text-sm">{errors.wardNo}</p>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Documents Upload
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* idType, idFile, cvFile, portfolio, extraCert */}
                <div>
                  <label className="text-sm font-medium">ID Type *</label>
                  <select
                    name="idType"
                    value={form.idType}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  >
                    <option value="">Select ID Type</option>
                    {idTypes.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                  {errors.idType && (
                    <p className="text-red-500 text-sm">{errors.idType}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Upload ID *</label>
                  <p className="text-xs text-gray-600 -mt-1 mb-1">
                    Max size: 5 MB
                  </p>
                  <input
                    type="file"
                    name="idFile"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.idFile && (
                    <p className="text-red-500 text-sm">{errors.idFile}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Upload CV *</label>
                  <p className="text-xs text-gray-600 -mt-1 mb-1">
                    Max: 5 MB         ( Must be in pdf format )
                  </p>
                  <input
                    type="file"
                    name="cvFile"
                    accept=".pdf"
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.cvFile && (
                    <p className="text-red-500 text-sm">{errors.cvFile}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Portfolio 
                  </label>
                  <p className="text-xs text-gray-600 -mt-1 mb-1">
                    Max: 5 MB        ( Must be in pdf/jpg/png format )
                  </p>
                  <input
                    type="file"
                    name="portfolio"
                    accept=".pdf,.jpg,.png"
                    multiple
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {form.portfolio.length} selected
                  </p>
                  {errors.portfolio && (
                    <p className="text-red-500 text-sm">{errors.portfolio}</p>
                  )}
                </div>

   <div className="mt-6">
            <label className="text-sm font-medium block mb-2">
              Extra Certificates 
            </label>
            <p className="text-xs text-gray-600 -mt-1 mb-1">
                    Max:5 MB each    ( Must be in pdf/jpg/png format )
                  </p>

            {form.extraCert.map((c, i) => (
              <div key={i} className="flex gap-2 mb-2">
              
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) =>
                    handleExtraCertChange(i, e.target.files[0])
                  }
                  className="flex-1 p-2 border rounded-md"
                />
                {i === form.extraCert.length - 1 && (
                  <button
                    type="button"
                    onClick={addExtraCert}
                    className="w-10 h-10 bg-emerald-500 text-white rounded-full"
                  >
                    +
                  </button>
                )}
              </div>
            ))}

            {errors.extraCert && (
              <p className="text-red-500 text-sm">{errors.extraCert}</p>
            )}
          </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prev}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="px-5 py-2 rounded-md bg-[#C6A77B] text-white font-semibold hover:opacity-90"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-md bg-[#8B4513] text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit & Verify"}
            </button>
          )}
        </div>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to our terms & conditions.
        </p>
      </form>
    </div>
  );
};

export default ProviderRegistration;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const servicesList = [
  "Plumber","Electrician","Home Tutors","Painter","House Help","Babysitters",
  "Beauty & Salon","Event Decorators","Carpenter","Photographer","Interior Designer",
  "Private Chef","Locksmith","Boutiques","Movers & Packers","Catering Server"
];

const provinces = [
  "Province 1","Province 2","Bagmati Province","Gandaki Province",
  "Lumbini Province","Karnali Province","Sudurpashchim Province"
];

const allDistricts = [
  "Achham","Arghakhanchi","Baglung","Baitadi","Bajhang","Bajura","Banke","Bara","Bardiya",
  "Bhaktapur","Bhojpur","Chitwan","Dadeldhura","Dailekh","Dang","Darchula","Dhading","Dhankuta",
  "Dhanusha","Dolakha","Dolpa","Doti","Gorkha","Gulmi","Humla","Ilam","Jajarkot","Jhapa",
  "Jumla","Kailali","Kalikot","Kanchanpur","Kapilvastu","Kaski","Kathmandu","Kavrepalanchok",
  "Khotang","Lalitpur","Lamjung","Mahottari","Makwanpur","Manang","Morang","Mugu","Mustang",
  "Myagdi","Nawalpur","Nuwakot","Okhaldhunga","Palpa","Panchthar","Parbat","Parsa","Pyuthan",
  "Ramechhap","Rasuwa","Rautahat","Rolpa","Rukum East","Rukum West","Rupandehi","Salyan",
  "Sankhuwasabha","Saptari","Sarlahi","Sindhuli","Sindhupalchok","Siraha","Solukhumbu",
  "Sunsari","Surkhet","Syangja","Tanahun","Taplejung","Terhathum","Udayapur"
];

const idTypes = ["Citizenship","National ID","Passport"];

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    password: "", confirmPassword: "",
    service: "", experience: "", skills: "",
    province: "", district: "", Municipality: "",
    bio: "", emergencyName: "", emergencyPhone: "",
    profilePhoto: null, idType: "", idFile: null, cvFile: null,
    portfolio: [], extraCert: null
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    if (name === "portfolio") {
      setForm((p) => ({ ...p, portfolio: Array.from(files) }));
    } else {
      setForm((p) => ({ ...p, [name]: files[0] }));
    }
  };

  const handlePhoneChange = (e, field = "phone") => {
    const number = e.target.value.replace(/\D/g, "");
    if (number.length <= 10) {
      setForm((prev) => ({ ...prev, [field]: number }));
    }
  };

  const validateStep = () => {
    const err = {};

    if (step === 1) {
      if (!form.fullName) err.fullName = "Full name required";
      if (!form.email) err.email = "Email required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        err.email = "Invalid email format";
      if (!form.phone) err.phone = "Phone required";
      else if (form.phone.length !== 10)
        err.phone = "Phone must be 10 digits";
      if (!form.password) err.password = "Password required";
      else if (form.password.length < 8)
        err.password = "Min. 8 characters";
      if (form.password !== form.confirmPassword)
        err.confirmPassword = "Password mismatch";
    }

    if (step === 2) {
      if (!form.service) err.service = "Choose your service";
      if (!form.experience) err.experience = "Experience required";
      if (!form.skills) err.skills = "Enter your skills";
    }

    if (step === 3) {
      if (!form.province) err.province = "Province required";
      if (!form.district) err.district = "District required";
      if (!form.Municipality) err.Municipality = "Municipality required";
    }

    if (step === 4) {
      if (!form.idType) err.idType = "Select your ID type";
      if (!form.idFile) err.idFile = "Upload ID document";
      if (!form.cvFile) err.cvFile = "Upload CV";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => setStep((s) => s - 1);

  const submit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/verification", { state: { userType: "provider" } });
    }, 800);
  };

  const fileName = (f) => (f ? f.name : "No file chosen");

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
            <p className="text-sm text-gray-600">
              Build your professional profile
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Step</p>
            <p className="text-lg font-semibold text-[#8B4513]">{step} / 5</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-gray-300 mb-6">
          <div
            className="h-2 bg-[#C6A77B] rounded-full"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">

                {/* Full name */}
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

                {/* Email */}
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    placeholder="example@email.com"
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => handlePhoneChange(e)}
                    placeholder="10-digit phone"
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Photo */}
                <div>
                  <label className="text-sm font-medium">
                    Profile Photo (optional)
                  </label>
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
                </div>

                {/* Password */}
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

                {/* Confirm password */}
                <div>
                  <label className="text-sm font-medium">
                    Confirm Password *
                  </label>
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
                  <label className="text-sm font-medium">
                    Years of Experience *
                  </label>
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
                <div>
                  <label className="text-sm font-medium">Province *</label>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="text-red-500 text-sm">{errors.province}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">District *</label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                  >
                    <option value="">Select District</option>
                    {allDistricts.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-red-500 text-sm">{errors.district}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                   Municipality *
                  </label>
                  <input
                    name="Municipality"
                    value={form.Municipality}
                    onChange={handleInput}
                    className="w-full p-3 rounded-md border bg-[#FFFDF9]"
                    placeholder="e.g. Lalitpur"
                  />
                  {errors.Municipality && (
                    <p className="text-red-500 text-sm">{errors.Municipality}</p>
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
                  <input
                    type="file"
                    name="cvFile"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  {errors.cvFile && (
                    <p className="text-red-500 text-sm">{errors.cvFile}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Portfolio (optional)
                  </label>
                  <input
                    type="file"
                    name="portfolio"
                    accept="image/*"
                    multiple
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {form.portfolio.length} selected
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Extra Certificate</label>
                  <input
                    type="file"
                    name="extraCert"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFile}
                    className="w-full p-2 rounded-md border bg-[#FFFDF9]"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {fileName(form.extraCert)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
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

          {step < 5 ? (
            <button
              type="button"
              onClick={next}
              className="px-5 py-2 rounded-md bg-[#C6A77B] text-white font-semibold hover:opacity-90"
            >
              Submit
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

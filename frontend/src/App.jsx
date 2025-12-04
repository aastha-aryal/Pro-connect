import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// ✅ Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Feedback from "./pages/Feedback";
import Faqs from "./pages/Faqs";
import Legal from "./pages/Legal";
import CustomerRegistration from "./pages/CustomerRegistration";
import ProviderRegistration from "./pages/ProviderRegistration";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ServiceRequestPage from "./pages/ServiceRequestPage";

// ✅ Optional Pages (if they exist)
import VerificationPage from "./pages/VerificationPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Loader for 2.5 sec
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-linear-to-b from-blue-900 to-white">
        <Header />
        <main className="grow mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/register-customer" element={<CustomerRegistration />} />
            <Route path="/register-provider" element={<ProviderRegistration />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />

            {/* Service Request Route */}
            <Route path="/service-request/:service" element={<ServiceRequestPage />} />

            {/* Optional */}
            <Route path="/verification" element={<VerificationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

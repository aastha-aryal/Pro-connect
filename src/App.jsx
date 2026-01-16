import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import CustomerRegistration from "./pages/CustomerRegistration";
import ProviderRegistration from "./pages/ProviderRegistration";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ReviewPage from "./pages/Review";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import VerificationPage from "./pages/VerificationPage";

function AppWrapper() {
  const [showLoader, setShowLoader] = useState(true); // Show loader initially
  const navigate = useNavigate();

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("loaderShown");

    if (!loaderShown) {
      sessionStorage.setItem("loaderShown", "true");
    }

    const timer = setTimeout(() => {
      setShowLoader(false);
      navigate("/home", { replace: true });
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);
  if (showLoader) return <Loader />;

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faqs />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-customer" element={<CustomerRegistration />} />
      <Route path="/register-provider" element={<ProviderRegistration />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/review/:id" element={<ReviewPage />} />
      <Route path="/service-request/:service" element={<ServiceRequestPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="grow mt-16">
          <AppWrapper />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Feedback from "./pages/Feedback";
import Faqs from "./pages/Faqs";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import CustomerRegistration from "./pages/CustomerRegistration";
import ProviderRegistration from "./pages/ProviderRegistration";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import VerificationPage from "./pages/VerificationPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />

        <main className="grow mt-16">
          <Routes>
            {/* Default route shows loader */}
            <Route path="/" element={<Loader />} />

            {/* Other pages */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-customer" element={<CustomerRegistration />} />
            <Route path="/register-provider" element={<ProviderRegistration />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/service-request/:service" element={<ServiceRequestPage />} />
            <Route path="/verification" element={<VerificationPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

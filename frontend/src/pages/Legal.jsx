import React from "react";
import { motion } from "framer-motion";

const Legal = () => {
  return (
    <div className="min-h-screen px-4 py-16 bg-[#3b5168]">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#1B263B]">
        Legal Information
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Privacy Policy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#d1d9e0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#0D1B2A]">
            Privacy Policy
          </h2>
          <p className="text-gray-800 mb-3">
            At <span className="font-semibold text-[#00F5FF]">Pro-Connect</span>, we value your privacy. We collect only necessary information such as name, email, phone, and optionally your location to connect you with service providers.
          </p>
          <p className="text-gray-800 mb-3">
            Your data is never sold to third parties. We share information only with providers with your consent, and only for the purpose of connecting you for services.
          </p>
          <p className="text-gray-800 mb-3">
            We use reasonable security measures to protect your information. You can update or delete your profile anytime.
          </p>
          <p className="text-gray-800">
            Policy updates may occur occasionally, and users will be notified of any changes.
          </p>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#d1d9e0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#0D1B2A]">
            Terms & Conditions
          </h2>
          <p className="text-gray-800 mb-3">
            By using <span className="font-semibold text-[#00F5FF]">Pro-Connect</span>, you agree to provide accurate information and follow platform rules. You must interact respectfully with service providers and other users.
          </p>
          <p className="text-gray-800 mb-3">
            Pro-Connect is a platform to connect customers and providers; we do not guarantee the quality of services. Fees are negotiated directly between the customer and provider before booking.
          </p>
          <p className="text-gray-800 mb-3">
            Misuse of the platform, fraudulent activity, or harassment may lead to account suspension or termination.
          </p>
          <p className="text-gray-800 mb-3">
            The platform operates under the laws of Nepal, and terms may be updated from time to time.
          </p>
          <p className="text-gray-800">
            Users are responsible for understanding and complying with these terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;

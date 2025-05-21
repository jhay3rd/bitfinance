
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: May 14, 2025</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Welcome to BitFinance. These Terms of Service ("Terms") govern your access to and use of the BitFinance website, mobile applications, and services (collectively, the "Services"). Please read these Terms carefully before using our Services.
            </p>
            
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>
            
            <h2>1. Eligibility</h2>
            <p>
              To use our Services, you must be at least 18 years old and have the capacity to form a binding contract with BitFinance. By using our Services, you represent and warrant that you meet these requirements.
            </p>
            <p>
              You must also comply with all applicable laws and regulations in your jurisdiction. Our Services are not available to residents of jurisdictions where cryptocurrency trading or investment is prohibited.
            </p>
            
            <h2>2. Account Registration</h2>
            <p>
              To access certain features of our Services, you may need to create an account. When you register for an account, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p>
              You agree to immediately notify us of any unauthorized use of your account or any other breach of security. BitFinance will not be liable for any loss or damage arising from your failure to comply with this section.
            </p>
            
            <h2>3. Investment Services and Risks</h2>
            <p>
              Our platform provides tools and services for cryptocurrency investments. Cryptocurrencies are highly volatile assets, and investing in them carries significant risks.
            </p>
            <p>
              By using our Services, you acknowledge and agree that:
            </p>
            <ul>
              <li>The value of cryptocurrencies can be highly volatile, potentially resulting in significant losses</li>
              <li>Past performance is not indicative of future results</li>
              <li>You should not invest funds that you cannot afford to lose</li>
              <li>You are solely responsible for your investment decisions</li>
              <li>BitFinance does not provide personalized investment advice or recommendations</li>
            </ul>
            
            <h2>4. Fees and Payments</h2>
            <p>
              By using our Services, you agree to pay all applicable fees as described on our website or mobile application. We may change our fees at any time by posting the changes on our website.
            </p>
            <p>
              All payments are non-refundable except as required by law or as explicitly stated in these Terms. You are responsible for all taxes and fees associated with your use of the Services.
            </p>
            
            <h2>5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by BitFinance and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as allowed by these Terms.
            </p>
            
            <h2>6. Prohibited Conduct</h2>
            <p>
              When using our Services, you must not:
            </p>
            <ul>
              <li>Use the Services in any way that violates any applicable law or regulation</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
              <li>Attempt to gain unauthorized access to our servers, systems, or networks</li>
              <li>Use the Services for any fraudulent or illegal purpose</li>
              <li>Upload or transmit viruses, malware, or other malicious code</li>
              <li>Interfere with the proper working of the Services</li>
              <li>Collect or track personal information of other users</li>
            </ul>
            
            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
            </p>
            <p>
              Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
            
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. BITFINANCE EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              BITFINANCE DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL BITFINANCE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
            </p>
            
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Services after revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
            </p>
            
            <h2>12. Dispute Resolution</h2>
            <p>
              Any disputes, claims, or controversies arising out of or relating to these Terms or the Services shall first be resolved through good faith negotiations. If such efforts fail, the dispute shall be resolved through binding arbitration in accordance with the rules of [Arbitration Association].
            </p>
            
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@bitfinance.com<br />
              Address: BitFinance Headquarters, 123 Blockchain Avenue, Suite 456, Crypto City, CC 12345
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Terms;

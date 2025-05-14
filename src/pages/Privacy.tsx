
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: May 14, 2025</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              At BitFinance, we take your privacy very seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account and use our platform</li>
              <li>Complete forms or send us communications</li>
              <li>Participate in surveys, promotions, or other activities</li>
              <li>Contact our customer support</li>
            </ul>
            
            <p>
              This information may include:
            </p>
            <ul>
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Financial information (bank account details, cryptocurrency wallet addresses)</li>
              <li>Government-issued identification for KYC (Know Your Customer) purposes</li>
              <li>Transaction data and investment history</li>
              <li>Communications between you and BitFinance</li>
            </ul>
            
            <p>
              We also collect information automatically when you use our services, including:
            </p>
            <ul>
              <li>Log information (IP address, browser type, pages visited, time spent)</li>
              <li>Device information (hardware model, operating system)</li>
              <li>Location information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Sending you technical notices, updates, security alerts, and support messages</li>
              <li>Responding to your comments, questions, and customer service requests</li>
              <li>Developing new products and services</li>
              <li>Monitoring and analyzing trends, usage, and activities</li>
              <li>Detecting, preventing, and addressing fraud and other illegal activities</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <h2>How We Share Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Financial institutions and payment processors to facilitate transactions</li>
              <li>Professional advisors (lawyers, accountants, etc.) as necessary</li>
              <li>Regulatory authorities to comply with legal obligations</li>
              <li>Business partners with your consent</li>
              <li>In connection with a business transaction (merger, acquisition, sale)</li>
            </ul>
            
            <p>
              We will never sell your personal information to third parties for marketing purposes.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or alteration. These measures include encryption, access controls, and regular security assessments.
            </p>
            <p>
              While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@bitfinance.com.
            </p>
            
            <h2>Retention of Information</h2>
            <p>
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to keep your information, we consider:
            </p>
            <ul>
              <li>The amount, nature, and sensitivity of the personal information</li>
              <li>The potential risk of harm from unauthorized use or disclosure</li>
              <li>The purposes for which we process your personal information</li>
              <li>Applicable legal requirements</li>
            </ul>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Email: privacy@bitfinance.com<br />
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

export default Privacy;

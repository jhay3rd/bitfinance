
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
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
              <p className="text-lg">
                At BitFinance, we take your privacy very seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
              </p>
            </div>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
                <div className="pl-4 border-l-4 border-primary">
                  <p>
                    We collect information that you provide directly to us when you:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Create an account and use our platform</li>
                    <li>Complete forms or send us communications</li>
                    <li>Participate in surveys, promotions, or other activities</li>
                    <li>Contact our customer support</li>
                  </ul>
                  
                  <p className="mt-4">
                    This information may include:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Financial information (bank account details, cryptocurrency wallet addresses)</li>
                    <li>Government-issued identification for KYC (Know Your Customer) purposes</li>
                    <li>Transaction data and investment history</li>
                    <li>Communications between you and BitFinance</li>
                  </ul>
                  
                  <p className="mt-4">
                    We also collect information automatically when you use our services, including:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Log information (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (hardware model, operating system)</li>
                    <li>Location information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Service Provision</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Providing, maintaining, and improving our services</li>
                      <li>Processing transactions and managing your account</li>
                      <li>Sending technical notices and support messages</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Detecting and preventing fraud</li>
                      <li>Meeting regulatory obligations</li>
                      <li>Enforcing our terms and policies</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Communication</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Responding to your requests and inquiries</li>
                      <li>Providing customer support</li>
                      <li>Sending important updates about our services</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Improvement & Analysis</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Developing new products and services</li>
                      <li>Monitoring and analyzing trends and usage</li>
                      <li>Enhancing user experience</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Share Your Information</h2>
                <p>
                  We may share your information with:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Financial institutions and payment processors to facilitate transactions</li>
                  <li>Professional advisors (lawyers, accountants, etc.) as necessary</li>
                  <li>Regulatory authorities to comply with legal obligations</li>
                  <li>Business partners with your consent</li>
                  <li>In connection with a business transaction (merger, acquisition, sale)</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-4">
                  <p className="font-semibold">
                    We will never sell your personal information to third parties for marketing purposes.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or alteration. These measures include encryption, access controls, and regular security assessments.
                </p>
                <p className="mt-4">
                  While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">1</div>
                    <p>Access to your personal information</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">2</div>
                    <p>Correction of inaccurate information</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">3</div>
                    <p>Deletion of your personal information</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">4</div>
                    <p>Restriction of processing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">5</div>
                    <p>Data portability</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mr-2">6</div>
                    <p>Objection to processing</p>
                  </div>
                </div>
                <p className="mt-6">
                  To exercise these rights, please contact us at <a href="mailto:privacy@bitfinance.com" className="text-primary hover:underline">privacy@bitfinance.com</a>.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Retention of Information</h2>
                <p>
                  We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to keep your information, we consider:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The amount, nature, and sensitivity of the personal information</li>
                  <li>The potential risk of harm from unauthorized use or disclosure</li>
                  <li>The purposes for which we process your personal information</li>
                  <li>Applicable legal requirements</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Children's Privacy</h2>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                  <p>
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <p className="mb-4">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Email:</span> <a href="mailto:privacy@bitfinance.com" className="text-primary hover:underline">privacy@bitfinance.com</a>
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> BitFinance Headquarters, Columbia Center, 701 5th Ave #4200, Seattle, WA 98104, United States
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Privacy;

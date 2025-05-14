
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Cookies Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: May 14, 2025</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This Cookies Policy explains how BitFinance ("we", "us", or "our") uses cookies and similar technologies on our website and mobile applications. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, BitFinance) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (such as advertising, interactive content, and analytics).
            </p>
            
            <h2>Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies:
            </p>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account authentication. You may not opt-out of these cookies as the website cannot function properly without them.
            </p>
            
            <h3>Analytical/Performance Cookies</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
            
            <h3>Functionality Cookies</h3>
            <p>
              These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
            
            <h3>Targeting/Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you and your interests. They also help limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
            </p>
            
            <h2>Specific Cookies We Use</h2>
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Cookie Name</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Purpose</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_session_id</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Maintains user session state across page requests</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_bf_auth</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Authentication cookie to keep users signed in</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">30 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_ga</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Google Analytics - Used to distinguish users</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_gid</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Google Analytics - Used to distinguish users</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">24 hours</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_fbp</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Facebook Pixel - Used for advertising purposes</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">3 months</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">_bf_theme</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">Remembers user's light/dark mode preference</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
                </tr>
              </tbody>
            </table>
            
            <h2>How to Control Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
            </p>
            
            <h3>Browser Controls</h3>
            <p>
              Most browsers allow you to:
            </p>
            <ul>
              <li>View your cookies</li>
              <li>Delete cookies</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from particular sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            
            <h3>Opt-Out of Third-Party Cookies</h3>
            <p>
              You can opt-out of third-party cookies used for advertising purposes by visiting:
            </p>
            <ul>
              <li><a href="http://www.aboutads.info/choices/" className="text-bitfinance-primary hover:underline">Digital Advertising Alliance</a></li>
              <li><a href="http://www.youronlinechoices.com/" className="text-bitfinance-primary hover:underline">Your Online Choices (EU)</a></li>
            </ul>
            
            <h2>Updates to This Cookies Policy</h2>
            <p>
              We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to periodically review this page for the latest information on our cookie practices.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this policy, please contact us at:
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

export default Cookies;

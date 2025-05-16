import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { 
  Shield, 
  Cookie, 
  Settings, 
  AlertTriangle, 
  Info, 
  Check,
  BarChart,
  Target,
  List,
  Sliders,
  RefreshCw,
  MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";

const Cookies: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <motion.section 
        className="py-16 md:py-24 flex-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
              <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Cookies Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Last updated: May 14, 2025</p>
          </motion.div>
          
          <div className="space-y-12">
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                This Cookies Policy explains how BitFinance ("we", "us", or "our") uses cookies and similar technologies on our website and mobile applications. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Are Cookies?</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
                <p>
                  Cookies set by the website owner (in this case, BitFinance) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (such as advertising, interactive content, and analytics).
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account authentication. You may not opt-out of these cookies as the website cannot function properly without them.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                      <BarChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Analytical/Performance</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
                      <Settings className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Functionality Cookies</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                      <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Targeting/Advertising</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies are used to make advertising messages more relevant to you and your interests. They also help limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <List className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Specific Cookies We Use</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 rounded-tl-lg">Cookie Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">Purpose</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 rounded-tr-lg">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_session_id</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Maintains user session state across page requests</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Session</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_bf_auth</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Authentication cookie to keep users signed in</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">30 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_ga</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Google Analytics - Used to distinguish users</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">2 years</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_gid</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Google Analytics - Used to distinguish users</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">24 hours</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_fbp</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Facebook Pixel - Used for advertising purposes</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">3 months</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">_bf_theme</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Remembers user's light/dark mode preference</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Sliders className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Control Cookies</h2>
              </div>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Browser Controls</h3>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">Most browsers allow you to:</p>
                  <ul className="list-inside space-y-2 ml-2">
                    {[
                      "View your cookies",
                      "Delete cookies",
                      "Block third-party cookies",
                      "Block cookies from particular sites",
                      "Block all cookies",
                      "Delete all cookies when you close your browser"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Opt-Out of Third-Party Cookies</h3>
                  <p className="mb-3">You can opt-out of third-party cookies used for advertising purposes by visiting:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      <a 
                        href="http://www.aboutads.info/choices/" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Digital Advertising Alliance
                      </a>
                    </li>
                    <li>
                      <a 
                        href="http://www.youronlinechoices.com/" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Your Online Choices (EU)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Updates to This Cookies Policy</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to periodically review this page for the latest information on our cookie practices.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
              </div>
              
              <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies or this policy, please contact us at:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: <a href="mailto:privacy@bitfinance.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@bitfinance.com</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Address: BitFinance Headquarters, 123 Blockchain Avenue, Suite 456, Crypto City, CC 12345
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Cookies;

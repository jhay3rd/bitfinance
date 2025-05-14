
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Footer: React.FC = () => {
  const location = useLocation();
  
  // Function to scroll to top when link is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center" onClick={scrollToTop}>
              <img src={logo} alt="BitFinance Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-bitfinance-primary dark:text-white">BitFinance</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your trusted platform for intelligent crypto investments, powered by cutting-edge AI technology and real-time market data.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/markets" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  News
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  Features
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://twitter.com/bitfinance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/bitfinance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://t.me/BitFinanceSupport" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://discord.gg/bitfinance" className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} BitFinance. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-xs text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-xs text-gray-600 dark:text-gray-400 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors" onClick={scrollToTop}>
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

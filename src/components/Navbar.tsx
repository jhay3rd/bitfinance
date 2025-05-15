
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src={logo}
                alt="BitFinance Logo"
              />
              <span className="ml-2 text-xl font-bold text-bitfinance-primary dark:text-white">BitFinance</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors">
                  Home
                </Link>
                <Link to="/markets" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors">
                  Markets
                </Link>
                <Link to="/features" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors">
                  Features
                </Link>
                <Link to="/news" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors">
                  News
                </Link>
                <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-bitfinance-primary dark:hover:text-bitfinance-secondary transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          ) : null}

          <div className="hidden md:flex items-center">
            <Link to="/login">
              <Button variant="outline" className="mr-3">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white">Sign Up</Button>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-bitfinance-primary dark:hover:text-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/markets"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Markets
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/news"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <Link to="/login" className="block w-full">
                  <Button variant="outline" className="w-full mb-2">Sign In</Button>
                </Link>
              </div>
              <div className="flex items-center px-5 mt-3">
                <Link to="/register" className="block w-full">
                  <Button className="w-full bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import ClientReviews from "@/components/ClientReviews";
import CompanyAwards from "@/components/CompanyAwards";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BitFinance</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A pioneer in crypto investment solutions for over 7 years
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2018, BitFinance emerged with a clear vision: to make cryptocurrency investments accessible, profitable, and secure for everyone. For over 7 years, we've been at the forefront of the crypto investment revolution.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                What began as a small team of crypto enthusiasts and financial experts has grown into a global company serving thousands of investors worldwide. Throughout our journey, we've maintained our commitment to innovation, security, and exceptional returns.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, BitFinance stands as an industry leader, with a proven track record of navigating market volatility while consistently delivering above-average returns to our clients.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
                  <h3 className="text-4xl font-bold text-primary mb-2">7+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Years in Business</p>
                </div>
                <div className="text-center p-4">
                  <h3 className="text-4xl font-bold text-primary mb-2">50K+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Happy Clients</p>
                </div>
                <div className="text-center p-4">
                  <h3 className="text-4xl font-bold text-primary mb-2">$250M+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Assets Managed</p>
                </div>
                <div className="text-center p-4">
                  <h3 className="text-4xl font-bold text-primary mb-2">99.9%</h3>
                  <p className="text-gray-600 dark:text-gray-300">Uptime Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The principles that have guided us through 7+ years of excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Security First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We implement industry-leading security measures to protect our clients' investments and personal data at all times.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in complete transparency with our clients about investment strategies, risks, and returns.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously evolve our strategies and technologies to stay ahead in the rapidly changing cryptocurrency market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Awards Section */}
      <CompanyAwards />
      
      {/* Client Reviews Section */}
      <ClientReviews />
      
      {/* Leadership Team */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Meet the experts behind BitFinance's 7+ years of success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&dpr=2&q=80" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Robert Morgan</h3>
              <p className="text-primary font-medium">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&dpr=2&q=80" alt="CTO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Elena Chen</h3>
              <p className="text-primary font-medium">Chief Technology Officer</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&dpr=2&q=80" alt="CFO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Daniel Williams</h3>
              <p className="text-primary font-medium">Chief Financial Officer</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&dpr=2&q=80" alt="CMO" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Sophia Rodriguez</h3>
              <p className="text-primary font-medium">Chief Marketing Officer</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Location */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Global Headquarters</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Visit us at our state-of-the-art facility
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.2554744668805!2d-122.33367158446339!3d47.60685727918407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab6b122572d%3A0x4cc65f098e91e1f7!2sColumbia%20Center!5e0!3m2!1sen!2sus!4v1652364456175!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="BitFinance Headquarters"
              ></iframe>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">BitFinance Headquarters</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Columbia Center, 701 5th Ave #4200<br />
                Seattle, WA 98104, United States<br />
                <a href="tel:+12065551234" className="text-primary hover:underline">+1 (206) 555-1234</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default AboutUs;

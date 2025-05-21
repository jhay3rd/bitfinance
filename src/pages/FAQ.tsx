
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to the most common questions about BitFinance
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Getting Started</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-bitfinance" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">What is BitFinance?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    BitFinance is an AI-powered cryptocurrency investment platform that leverages advanced algorithms and real-time market data to help investors maximize their returns. Our platform provides intelligent investment strategies, portfolio management tools, and comprehensive market analytics.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="how-to-start" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">How do I get started with BitFinance?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    Getting started is simple. First, create an account by clicking the "Sign Up" button. Once registered, verify your email address, complete your profile, and you can start by making your first deposit. Our platform will guide you through the investment options available based on your goals and risk tolerance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="account-security" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">How secure is my account?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    We implement bank-grade security measures, including advanced encryption, two-factor authentication (2FA), and regular security audits. Your funds are stored in cold wallets with multi-signature technology, ensuring maximum protection against unauthorized access.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Investments</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="min-investment" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">What are the minimum and maximum investment amounts?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    The minimum investment amount varies by plan, starting from $50 for our Daily Trader plan. There is no maximum investment limit, allowing you to invest according to your financial capacity and goals.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns-generated" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">How are returns generated on my investments?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    BitFinance uses advanced AI-powered trading algorithms, expert market analysis, and strategic investments across multiple markets to generate returns. Our diversified approach helps maximize profits while managing risk effectively through a balanced portfolio strategy.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="investment-plans" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">What investment plans do you offer?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    We offer several investment plans tailored to different risk appetites and goals:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Daily Trader: 1.5% daily returns for 10 days</li>
                      <li>Weekly Growth: 12% weekly returns for 4 weeks</li>
                      <li>Monthly Builder: 55% monthly returns for 2 months</li>
                      <li>Quarterly Accelerator: 180% returns over 3 months</li>
                      <li>Annual Vision: 450% returns over 12 months</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Deposits and Withdrawals</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="deposit-methods" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">What deposit methods do you accept?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    We accept deposits in Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). Each cryptocurrency has its own dedicated deposit address. We plan to add more cryptocurrency options and traditional payment methods in the future.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="withdrawal-process" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">How does the withdrawal process work?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    To withdraw funds, navigate to the Withdraw section in your dashboard, select your preferred withdrawal method, enter the amount and your wallet address. Withdrawals are processed within 24 hours and you'll receive notifications about the status of your transaction. For large withdrawals, additional verification may be required.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="withdrawal-fees" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">Are there any fees for deposits or withdrawals?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    BitFinance does not charge any deposit fees, but network transaction fees apply. For withdrawals, we charge a small processing fee of 0.5% of the withdrawal amount. The minimum withdrawal amount is $50 equivalent in cryptocurrency.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Support and Service</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="customer-support" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">How can I contact customer support?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    Our customer support team is available 24/7 through multiple channels. You can submit a support ticket through your dashboard, reach us via email at support@bitfinance.com, or connect with us through our official Telegram channel @BitFinanceSupport for faster responses.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="account-verification" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">Do I need to verify my identity?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    Basic account functionality requires email verification only. However, for withdrawals above $5,000 or for premium features, we require KYC (Know Your Customer) verification in compliance with international regulations. This helps ensure the security of all users on our platform.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="referral-program" className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white">Do you have a referral program?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    Yes, we offer a generous three-tier referral program. You earn 5% commission on direct referrals (level 1), 2% on level 2 referrals, and 1% on level 3 referrals. Commissions are calculated based on the investment amount and are credited directly to your account balance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default FAQ;

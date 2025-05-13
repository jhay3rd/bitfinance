
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This would be replaced with actual form submission logic
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about our platform or need assistance? Our team is here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Mon-Fri, 9:00 AM - 6:00 PM
                </p>
                <a
                  href="tel:+18005551234"
                  className="block mt-2 text-bitfinance-primary hover:underline"
                >
                  +1 (800) 555-1234
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll respond within 24 hours
                </p>
                <a
                  href="mailto:support@bitfinance.com"
                  className="block mt-2 text-bitfinance-primary hover:underline"
                >
                  support@bitfinance.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-bitfinance-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Available 24/7 for instant support
                </p>
                <Button
                  variant="link"
                  className="mt-2 text-bitfinance-primary hover:underline p-0"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="aspect-video rounded-md overflow-hidden mb-4">
                    <iframe
                      title="BitFinance Headquarters Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0975409484775!2d-122.41941708478337!3d37.77492977975918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1626718070931!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-bitfinance-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">BitFinance Headquarters</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Blockchain Avenue, Suite 400
                        <br />
                        San Francisco, CA 94107
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Monday - Friday</div>
                    <div>9:00 AM - 6:00 PM PST</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Saturday</div>
                    <div>10:00 AM - 4:00 PM PST</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Sunday</div>
                    <div>Closed</div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Note: Our online support is available 24/7 through our chatbot and email support system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="text-left">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">How secure is BitFinance?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    BitFinance employs bank-grade security measures, including 256-bit encryption, two-factor authentication, and cold storage solutions for optimal asset protection.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-left">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">What are the fees for trading?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our platform offers competitive fee structures starting at 0.25% per transaction, with reduced rates for high-volume traders and premium members.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-left">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">How do I withdraw my funds?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can withdraw your funds at any time through your dashboard. We support multiple withdrawal methods including bank transfers and cryptocurrency transfers.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-left">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">What cryptocurrencies do you support?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    BitFinance supports over 50 cryptocurrencies, including Bitcoin, Ethereum, Solana, Cardano, and many more. We regularly add new tokens based on market demand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Contact;

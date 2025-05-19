import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, HelpCircle, MessageSquare, Phone, Mail, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/Header";
import { useAuth } from '@/hooks/useAuth';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth ? useAuth() : { user: null };
  
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      const res = await fetch('/api/admin/support-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email || localStorage.getItem('userEmail'),
          message: `${subject}\n${message}`,
        }),
      });
      if (res.ok) {
        toast({
          title: 'Support ticket created',
          description: "We've received your request and will respond shortly.",
        });
        setSubject('');
        setMessage('');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send support message',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send support message',
        variant: 'destructive',
      });
    }
  };
  
  const faqItems = [
    {
      question: "How do I withdraw my earnings?",
      answer: "You can withdraw your earnings by navigating to the Withdraw tab in your dashboard. Select your preferred withdrawal method, enter the amount, and follow the instructions. All withdrawals are processed within 24 hours."
    },
    {
      question: "What are the minimum and maximum investment amounts?",
      answer: "The minimum investment amount varies by plan, starting from $50 for our Daily Trader plan. There is no maximum investment limit, allowing you to invest according to your financial capacity and goals."
    },
    {
      question: "How are returns generated on my investments?",
      answer: "BitFinance uses advanced AI-powered trading algorithms, expert market analysis, and strategic investments across multiple markets to generate returns. Our diversified approach helps maximize profits while managing risk."
    },
    {
      question: "Is my investment insured?",
      answer: "While we implement robust security measures to protect your investments, cryptocurrency investments are not insured by government programs like FDIC. We use advanced security protocols and risk management strategies to safeguard your funds."
    },
    {
      question: "Can I reinvest my earnings?",
      answer: "Yes, you can reinvest your earnings by selecting the 'Reinvest' option when your investment plan completes or by manually selecting a new investment plan and using your available balance."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-5xl mx-auto p-4 py-6 lg:p-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6 pl-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Support Center</h1>
            <p className="text-muted-foreground mt-2">Get help with your BitFinance account</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="contact">
                <MessageSquare className="h-4 w-4 mr-2" /> Contact
              </TabsTrigger>
              <TabsTrigger value="faq">
                <HelpCircle className="h-4 w-4 mr-2" /> FAQs
              </TabsTrigger>
              <TabsTrigger value="channels">
                <Phone className="h-4 w-4 mr-2" /> Channels
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Ticket</CardTitle>
                  <CardDescription>Our team will respond to your inquiry within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input 
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message"
                        placeholder="Please provide details about your issue"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit">Submit Ticket</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="font-medium mb-2">{item.question}</h3>
                        <p className="text-muted-foreground text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="channels">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Channels</CardTitle>
                    <CardDescription>Multiple ways to reach our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-muted-foreground text-sm">For general inquiries and account issues</p>
                          <a href="mailto:support@bitfinance.com" className="text-primary text-sm font-medium mt-1 block">
                            support@bitfinance.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-500/10 p-3 rounded-full">
                          <ExternalLink className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Telegram Support</h3>
                          <p className="text-muted-foreground text-sm">Fast responses from our team</p>
                          <a 
                            href="https://t.me/BitFinanceSupport" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-sm font-medium mt-1 block"
                          >
                            @BitFinanceSupport
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-500/10 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-muted-foreground text-sm">Available for premium customers</p>
                          <p className="text-primary text-sm font-medium mt-1">
                            +1 (888) 123-4567
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                    <CardDescription>When our support team is available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Customer Support</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm font-medium">Weekdays</p>
                            <p className="text-sm text-muted-foreground">24/7 Support</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Weekends & Holidays</p>
                            <p className="text-sm text-muted-foreground">24/7 Support</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Phone Support</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm font-medium">Weekdays</p>
                            <p className="text-sm text-muted-foreground">9 AM - 5 PM EST</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Weekends & Holidays</p>
                            <p className="text-sm text-muted-foreground">Closed</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 p-4 rounded-lg mt-4">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          For urgent matters outside of business hours, please use our Telegram support channel for the fastest response.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;


import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, MessageCircle, Mail, ArrowRight } from "lucide-react";

const Careers: React.FC = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent, position: string) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !resumeFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and attach your resume.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Application submitted!",
      description: `Thank you for applying to the ${position} position. We'll be in touch soon.`
    });
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setResumeFile(null);
  };
  
  // Job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced Blockchain Developer to join our engineering team and help build the next generation of our crypto investment platform. The ideal candidate has experience with smart contracts, DeFi protocols, and blockchain technologies.",
      requirements: [
        "5+ years of software development experience",
        "3+ years of experience with blockchain technologies",
        "Strong knowledge of Ethereum, Solidity, and Web3.js",
        "Experience with DeFi protocols and smart contract development",
        "Strong problem-solving skills and attention to detail"
      ]
    },
    {
      id: 2,
      title: "AI Research Scientist",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      description: "Join our data science team to develop cutting-edge AI algorithms for crypto market prediction and automated trading strategies. You will work on improving our AI models and developing new techniques for market analysis.",
      requirements: [
        "PhD or MS in Computer Science, Statistics, or related field",
        "Experience with machine learning and deep learning frameworks",
        "Strong background in time series analysis and predictive modeling",
        "Knowledge of financial markets and trading strategies",
        "Publications in top-tier AI conferences or journals is a plus"
      ]
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Remote",
      type: "Full-time",
      description: "Help our clients succeed with their crypto investments by providing exceptional support and guidance. You will be the bridge between our clients and our platform, ensuring they get the most out of our services.",
      requirements: [
        "3+ years of experience in customer success or account management",
        "Strong understanding of cryptocurrency and blockchain concepts",
        "Excellent communication and interpersonal skills",
        "Problem-solving mindset and ability to work under pressure",
        "Experience with CRM software and support ticketing systems"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Help us shape the future of crypto investments with innovation, passion, and expertise
          </p>
        </div>
      </section>
      
      {/* Why Join Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Join BitFinance?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of a team that's revolutionizing the crypto investment space
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovative Work</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Work on cutting-edge technologies in blockchain, AI, and fintech that are changing how people invest in cryptocurrencies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusive Culture</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join a diverse and inclusive team where your ideas are valued, and you can make a real impact on the company's direction.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-bitfinance-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-bitfinance-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Benefit from continuous learning, professional development resources, and clear paths for career advancement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Open Positions Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Open Positions</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our current job openings and find your place in our team
            </p>
          </div>
          
          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {job.department} • {job.location} • {job.type}
                      </p>
                    </div>
                    <Button className="mt-4 md:mt-0" onClick={() => document.getElementById(`application-form-${job.id}`)?.scrollIntoView({ behavior: 'smooth' })}>
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{req}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-700 flex justify-end">
                  <Button variant="ghost" onClick={() => document.getElementById(`application-form-${job.id}`)?.scrollIntoView({ behavior: 'smooth' })}>
                    Apply for this position <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Application Form Section */}
      {jobOpenings.map((job) => (
        <section key={job.id} id={`application-form-${job.id}`} className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Apply for {job.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Please fill out the form below to apply for this position. We'll get back to you as soon as possible.
              </p>
            </div>
            
            <Card>
              <form onSubmit={(e) => handleSubmit(e, job.title)}>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${job.id}`}>Full Name *</Label>
                      <Input 
                        id={`name-${job.id}`} 
                        placeholder="Your full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${job.id}`}>Email Address *</Label>
                      <Input 
                        id={`email-${job.id}`} 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`phone-${job.id}`}>Phone Number</Label>
                    <Input 
                      id={`phone-${job.id}`} 
                      placeholder="Your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`resume-${job.id}`}>Resume/CV *</Label>
                    <Input 
                      id={`resume-${job.id}`} 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted file types: PDF, DOC, DOCX. Max size: 5MB.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`message-${job.id}`}>Cover Letter or Additional Information</Label>
                    <Textarea 
                      id={`message-${job.id}`} 
                      placeholder="Tell us why you're a good fit for this position..." 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <p className="text-sm text-gray-500">* Required fields</p>
                  <Button type="submit">Submit Application</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </section>
      ))}
      
      {/* General Application Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Don't See a Perfect Fit?</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
          </p>
          <Button 
            className="bg-bitfinance-primary hover:bg-bitfinance-primary/90"
            onClick={() => window.location.href = "mailto:careers@bitfinance.com"}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send your resume to careers@bitfinance.com
          </Button>
        </div>
      </section>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Careers;


import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm BitAssist, your AI crypto assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Create context from site information
      const siteContext = `
        BitFinance is a crypto investment platform with 7+ years of experience.
        They offer various investment plans with AI-powered analytics.
        The headquarters is located at 123 Financial District, Suite 400, San Francisco, CA 94107.
        Their business hours are Monday-Friday: 9:00 AM - 6:00 PM PST, Saturday: 10:00 AM - 4:00 PM PST, Sunday: Closed.
        For urgent matters, users can contact support via Telegram.
        BitFinance has received several industry awards including Best Crypto Investment Platform.
      `;

      // Simplified AI response for demo
      // In a real implementation, this would call the OpenAI API
      const botResponse = await simulateAIResponse(userMessage.text, siteContext);

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Would you like to speak with a human representative?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const simulateAIResponse = async (query: string, context: string): Promise<string> => {
    // In a production environment, you would use the OpenAI API with the provided key
    // For demo purposes, we're simulating responses based on keywords
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const lowerQuery = query.toLowerCase();
    
    // Simulate AI responses based on keywords
    if (lowerQuery.includes("investment") || lowerQuery.includes("invest")) {
      return "BitFinance offers multiple investment plans starting from $100. Our AI analytics provide market insights to maximize your returns. Would you like to learn more about our specific plans? If you have urgent questions, you can speak with a human representative.";
    } else if (lowerQuery.includes("contact") || lowerQuery.includes("support") || lowerQuery.includes("help")) {
      return "You can contact our support team Monday-Friday: 9:00 AM - 6:00 PM PST. For urgent matters, please use our Telegram channel. Would you like me to connect you with a human representative?";
    } else if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price")) {
      return "BitFinance offers competitive fee structures starting at 0.25% per transaction, with reduced rates for high-volume traders and premium members. If you need more detailed information, a human representative can assist you.";
    } else if (lowerQuery.includes("withdraw") || lowerQuery.includes("deposit")) {
      return "You can deposit or withdraw funds through bank transfers, credit/debit cards, or cryptocurrency transfers. All transactions are processed securely. For help with a specific transaction, please contact our human support team.";
    } else if (lowerQuery.includes("security") || lowerQuery.includes("safe")) {
      return "BitFinance employs bank-grade security measures, including 256-bit encryption, two-factor authentication, and cold storage solutions for optimal asset protection. If you have specific security concerns, our human representatives can provide more details.";
    } else {
      return "Thank you for your message. I'll do my best to assist you based on the information available. For more specific or urgent inquiries, would you prefer to speak with a human representative?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTelegramRedirect = () => {
    window.open("https://t.me/BitFinanceSupport", "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96">
      <Card className="shadow-xl border border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              BitAssist
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={messagesContainerRef} 
            className="h-80 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[80%]",
                    message.sender === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-bitfinance-secondary text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      message.sender === "user"
                        ? "bg-bitfinance-primary text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-bitfinance-secondary text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-2 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-2">
          <div className="relative w-full flex items-center">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="pr-10 resize-none"
              rows={1}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-bitfinance-primary hover:text-bitfinance-secondary"
              onClick={sendMessage}
              disabled={inputText.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline"
            size="sm"
            className="w-full border-bitfinance-primary text-bitfinance-primary hover:bg-bitfinance-primary hover:text-white"
            onClick={handleTelegramRedirect}
          >
            Speak to a Human Representative
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIChatbot;

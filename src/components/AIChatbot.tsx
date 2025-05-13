
import React, { useState } from "react";
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

  const sendMessage = () => {
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

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I can help you with that. Would you like to know more about our investment options?",
        "Based on current market trends, Bitcoin is showing strong momentum. Would you like to see our latest analysis?",
        "Our AI-powered portfolio analysis suggests diversifying your crypto assets for optimal returns.",
        "I can guide you through our account setup process. It only takes a few minutes.",
        "Let me check the latest market data for you. Ethereum is up 3.5% in the last 24 hours.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-bitfinance-secondary text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-bitfinance-primary text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
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
          </div>
        </CardContent>
        <CardFooter className="p-2 border-t border-gray-200 dark:border-gray-800">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIChatbot;

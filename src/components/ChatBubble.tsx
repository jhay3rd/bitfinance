
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import AIChatbot from "./AIChatbot";

const ChatBubble: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button
        className={`fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-40 
        ${isChatOpen ? "bg-gray-600" : "bg-gradient-to-r from-bitfinance-primary to-bitfinance-secondary"}`}
        onClick={toggleChat}
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatBubble;

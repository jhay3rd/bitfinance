
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import NewsCard from "@/components/NewsCard";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  tags: string[];
}

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock news data
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "Bitcoin Hits New All-Time High as Institutional Adoption Grows",
      description:
        "Bitcoin surges to new heights as major financial institutions continue to adopt the leading cryptocurrency, with analysts predicting further growth in the coming months.",
      imageUrl:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      source: "CryptoNews",
      date: "2 hours ago",
      url: "#",
      tags: ["Bitcoin", "Markets", "Trending"],
    },
    {
      id: 2,
      title: "Ethereum Merge Successfully Completed: What You Need to Know",
      description:
        "The Ethereum network has successfully transitioned to a Proof-of-Stake consensus mechanism, reducing energy consumption by 99% and setting the stage for Ethereum 2.0.",
      imageUrl:
        "https://images.unsplash.com/photo-1621501103258-3e30e51c2bf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      source: "BlockchainToday",
      date: "1 day ago",
      url: "#",
      tags: ["Ethereum", "Technology", "Environment"],
    },
    {
      id: 3,
      title: "SEC Approves Bitcoin ETFs: A New Era for Crypto Investment",
      description:
        "The U.S. Securities and Exchange Commission has finally approved Bitcoin Exchange-Traded Funds, opening the door for mainstream investors to gain exposure to Bitcoin.",
      imageUrl:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      source: "FinanceWatch",
      date: "3 days ago",
      url: "#",
      tags: ["Regulation", "Bitcoin", "Investment"],
    },
    {
      id: 4,
      title: "DeFi Total Value Locked Crosses $100 Billion Mark",
      description:
        "The decentralized finance sector continues its exponential growth, with the total value locked in DeFi protocols surpassing $100 billion for the first time.",
      imageUrl:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      source: "DeFiPulse",
      date: "4 days ago",
      url: "#",
      tags: ["DeFi", "Markets", "Growth"],
    },
    {
      id: 5,
      title: "Major Bank Launches Cryptocurrency Custody Services for Clients",
      description:
        "One of the world's largest banks has announced the launch of cryptocurrency custody services for its institutional clients, marking another milestone in crypto adoption.",
      imageUrl:
        "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      source: "BankingJournal",
      date: "5 days ago",
      url: "#",
      tags: ["Banking", "Adoption", "Institutional"],
    },
    {
      id: 6,
      title: "New Layer 2 Solution Promises 100x Lower Gas Fees on Ethereum",
      description:
        "A revolutionary new Layer 2 scaling solution for Ethereum claims to reduce gas fees by up to 100 times while maintaining security and decentralization.",
      imageUrl:
        "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80",
      source: "CryptoTech",
      date: "1 week ago",
      url: "#",
      tags: ["Ethereum", "Technology", "Scalability"],
    },
  ];

  // Filter news based on search term and category
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      news.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const uniqueTags = Array.from(
    new Set(newsData.flatMap((news) => news.tags))
  ).sort();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Crypto News & Insights</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Stay updated with the latest news, trends, and developments in the cryptocurrency and blockchain world.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="relative mb-4 md:mb-0 md:w-1/2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search news articles..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-1/4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueTags.map((tag) => (
                    <SelectItem key={tag} value={tag.toLowerCase()}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Badge>
            {uniqueTags.map((tag) => (
              <Badge
                key={tag}
                variant={
                  selectedCategory.toLowerCase() === tag.toLowerCase()
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer"
                onClick={() => setSelectedCategory(tag.toLowerCase())}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  description={news.description}
                  imageUrl={news.imageUrl}
                  source={news.source}
                  date={news.date}
                  url={news.url}
                  tags={news.tags}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No news found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please try a different search term or category.
                </p>
              </div>
            )}
          </div>

          {filteredNews.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline">Load More News</Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default News;

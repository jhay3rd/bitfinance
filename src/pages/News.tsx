
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import NewsSearch from "@/components/news/NewsSearch";
import CategoryFilter from "@/components/news/CategoryFilter";
import NewsGrid from "@/components/news/NewsGrid";
import { filterNews, getUniqueTags } from "@/data/NewsData";

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const uniqueTags = getUniqueTags();
  const filteredNews = filterNews(searchTerm, selectedCategory);

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
            <NewsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="md:w-1/4">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                uniqueTags={uniqueTags} 
              />
            </div>
          </div>

          <NewsGrid filteredNews={filteredNews} isLoaded={isLoaded} />
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default News;

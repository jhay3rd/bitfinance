import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";
import NewsSearch from "@/components/news/NewsSearch";
import CategoryFilter from "@/components/news/CategoryFilter";
import NewsGrid from "@/components/news/NewsGrid";
import { useQuery } from '@tanstack/react-query';

// Helper to fetch news from CryptoPanic API (or similar)
const fetchCryptoNews = async () => {
  // Example: CryptoPanic public API (replace with your API key if needed)
  const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=demo&public=true');
  if (!response.ok) throw new Error('Failed to fetch news');
  const data = await response.json();
  // Map API data to NewsItem[]
  return (data.results || []).map((item: any, idx: number) => ({
    id: idx,
    title: item.title,
    description: item.body || '',
    imageUrl: item?.metadata?.image || 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    source: item.source?.title || 'CryptoPanic',
    date: item.published_at || '',
    url: item.url,
    tags: item.currencies?.map((c: any) => c.code) || [],
  }));
};

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch news with React Query, refetch every 3 hours
  const { data: newsData = [], isLoading, error } = useQuery({
    queryKey: ['cryptoNews'],
    queryFn: fetchCryptoNews,
    refetchInterval: 3 * 60 * 60 * 1000, // 3 hours
    staleTime: 3 * 60 * 60 * 1000,
  });

  // Get unique tags from news
  const uniqueTags = Array.from(new Set(newsData.flatMap((news: any) => news.tags))).sort();
  // Filter news
  const filteredNews = newsData.filter((news: any) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      news.tags.some((tag: string) => tag.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

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

          <NewsGrid filteredNews={filteredNews} isLoaded={!isLoading} />
          {error && <div className="text-red-500 text-center mt-4">Failed to load news.</div>}
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </div>
  );
};

export default News;

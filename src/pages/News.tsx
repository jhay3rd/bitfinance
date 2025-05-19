
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBubble from '../components/ChatBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewsCard } from '@/components/NewsCard';
import { NewsSearch } from '@/components/news/NewsSearch';
import { CategoryFilter } from '@/components/news/CategoryFilter';
import { NewsGrid } from '@/components/news/NewsGrid';
import { newsData } from '@/data/NewsData';

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Extract unique categories from news data
  const categories: string[] = ['all', ...Array.from(
    new Set(newsData.map(item => item.category))
  )];
  
  // Filter news based on search query and selected category
  const filteredNews = newsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crypto News & Insights</h1>
            <p className="text-lg md:text-xl max-w-3xl mb-6">
              Stay updated with the latest news, trends, and market analysis in the cryptocurrency world.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <NewsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <div>
                <CategoryFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* News Content */}
        <div className="container mx-auto max-w-6xl py-12 px-4">
          {filteredNews.length > 0 ? (
            <NewsGrid news={filteredNews} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">No results found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Subscribe to our Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-300">Get the latest crypto news directly to your inbox</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="max-w-xs"
                  type="email"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default News;

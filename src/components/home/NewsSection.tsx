
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const NewsSection: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for news
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "Bitcoin Hits New All-Time High as Institutional Adoption Grows",
      description: "Bitcoin surges to new heights as major financial institutions continue to adopt the leading cryptocurrency.",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      source: "CryptoNews",
      date: "2 hours ago",
      url: "#",
      tags: ["Bitcoin", "Trending"]
    }
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Crypto News</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed with the latest developments in the crypto world, market trends, and important updates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {newsData.map(news => (
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
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-bitfinance-primary text-bitfinance-primary hover:bg-bitfinance-primary hover:text-white"
            onClick={() => navigate("/news")}
          >
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

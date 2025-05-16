
import React from "react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";

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

interface NewsGridProps {
  filteredNews: NewsItem[];
  isLoaded: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ filteredNews, isLoaded }) => {
  return (
    <div className="space-y-8">
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
        <div className="text-center">
          <Button variant="outline">Load More News</Button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;

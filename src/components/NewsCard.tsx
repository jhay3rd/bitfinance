
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  tags?: string[];
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  source,
  date,
  url,
  tags = [],
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // If it's an external URL, open in new tab
    if (url.startsWith('http')) {
      window.open(url, "_blank", "noopener noreferrer");
    } else {
      // If it's an internal route, navigate to it
      navigate(url);
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">{source}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-bitfinance-primary transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;

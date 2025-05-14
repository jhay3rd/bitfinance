
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
};

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&dpr=2&q=80",
    rating: 5,
    review: "BitFinance has transformed my investment strategy. The daily trader plan consistently delivers impressive returns and the platform is incredibly user-friendly.",
    date: "May 10, 2025",
    verified: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&dpr=2&q=80",
    rating: 4.5,
    review: "After trying several crypto investment platforms, BitFinance stands out for its transparency and remarkable customer service. The returns are consistently high.",
    date: "April 27, 2025",
    verified: true,
  },
  {
    id: "3",
    name: "Jessica Martinez",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&dpr=2&q=80",
    rating: 5,
    review: "I've been using BitFinance for over 2 years and I'm consistently impressed with their professionalism and the stability of returns. Highly recommended!",
    date: "May 2, 2025",
    verified: true,
  },
  {
    id: "4",
    name: "Robert Williams",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&dpr=2&q=80",
    rating: 4.5,
    review: "The quarterly investment plan has exceeded my expectations. BitFinance has a solid track record and their platform security gives me peace of mind.",
    date: "April 15, 2025",
    verified: true,
  },
];

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {Array(fullStars).fill(0).map((_, i) => (
        <Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
    </div>
  );
};

const ClientReviews: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Don't just take our word for it. Here's what our clients have to say about their experience with BitFinance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-start mb-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={review.image} alt={review.name} />
                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {review.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full">
                      <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-100" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className="font-semibold">{review.name}</h4>
                    {review.verified && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                        Verified Client
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <RatingStars rating={review.rating} />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"{review.review}"</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;

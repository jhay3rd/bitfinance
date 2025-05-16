
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NewsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const NewsSearch: React.FC<NewsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-4 md:mb-0 md:w-1/2">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search news articles..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default NewsSearch;

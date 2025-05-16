
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  uniqueTags: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory, 
  uniqueTags 
}) => {
  return (
    <div className="space-y-4">
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

      <div className="flex gap-2 flex-wrap">
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
    </div>
  );
};

export default CategoryFilter;

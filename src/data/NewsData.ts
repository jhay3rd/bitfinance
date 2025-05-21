
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  tags: string[];
}

// Mock news data
export const newsData: NewsItem[] = [
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

// Helper function to get unique tags from news data
export const getUniqueTags = (): string[] => {
  return Array.from(new Set(newsData.flatMap((news) => news.tags))).sort();
};

// Helper function to filter news based on search term and category
export const filterNews = (searchTerm: string, selectedCategory: string): NewsItem[] => {
  return newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      news.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });
};

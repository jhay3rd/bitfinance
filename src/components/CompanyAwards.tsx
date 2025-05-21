
import React from "react";
import { Award } from "lucide-react";

type Award = {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
};

const awards: Award[] = [
  {
    id: "1",
    title: "Best Crypto Investment Platform",
    organization: "Global Finance Awards",
    year: "2024",
    description: "Recognized for outstanding returns and platform security"
  },
  {
    id: "2",
    title: "Most Innovative Fintech Solution",
    organization: "Fintech Innovation Summit",
    year: "2023",
    description: "Awarded for our revolutionary approach to cryptocurrency investments"
  },
  {
    id: "3", 
    title: "Customer Excellence Award",
    organization: "International Business Association",
    year: "2022",
    description: "For exceptional customer service and client satisfaction"
  },
  {
    id: "4",
    title: "Top 10 Crypto Companies",
    organization: "Blockchain Industry Review",
    year: "2021",
    description: "Listed among the most influential companies in the cryptocurrency space"
  },
  {
    id: "5",
    title: "Security Excellence Award",
    organization: "CyberSecurity Global Conference",
    year: "2020",
    description: "For maintaining highest security standards in financial transactions"
  },
];

const CompanyAwards: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Awards & Recognition</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Since our founding over 7 years ago, BitFinance has been recognized for excellence and innovation in the cryptocurrency investment space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {awards.map((award) => (
            <div 
              key={award.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{award.year}</h4>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{award.title}</h3>
              <p className="text-sm text-primary font-medium mb-3">{award.organization}</p>
              <p className="text-gray-600 dark:text-gray-300">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyAwards;

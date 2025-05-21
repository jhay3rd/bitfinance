
import React from "react";

interface DepositHeaderProps {
  title: string;
  description: string;
}

const DepositHeader: React.FC<DepositHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default DepositHeader;

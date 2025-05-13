
import React from "react";
import PortfolioAssetCard from "./PortfolioAssetCard";

export interface PortfolioAsset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  color: string;
  icon: string;
}

interface PortfolioAssetsProps {
  assets: PortfolioAsset[];
}

const PortfolioAssets: React.FC<PortfolioAssetsProps> = ({ assets }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mt-6">Your Assets</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {assets.map((asset) => (
          <PortfolioAssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
};

export default PortfolioAssets;
export type { PortfolioAsset };


import React from "react";
import PortfolioAssetCard from "./PortfolioAssetCard";
import { PortfolioAsset } from "@/models/dashboard";

interface PortfolioAssetsProps {
  assets: PortfolioAsset[];
}

const PortfolioAssets: React.FC<PortfolioAssetsProps> = ({ assets }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mt-6 mb-4">Your Assets</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {assets.map((asset) => (
          <PortfolioAssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
};

export default PortfolioAssets;

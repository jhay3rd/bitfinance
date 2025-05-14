
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DepositRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard with deposit tab active
    navigate("/dashboard", { state: { activeTab: "deposit" } });
  }, [navigate]);
  
  // Show loading while redirecting
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to deposit page...</p>
      </div>
    </div>
  );
};

export default DepositRedirect;

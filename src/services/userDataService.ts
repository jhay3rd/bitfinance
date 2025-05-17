
import { PortfolioAsset } from '@/models/dashboard';
import { authService } from './authService';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'investment';
  amount: string;
  asset: string;
  date: string;
  status: 'approved' | 'pending' | 'reviewing' | 'rejected' | 'completed';
}

interface UserPortfolio {
  assets: PortfolioAsset[];
  totalValue: number;
  lastUpdated: string;
}

// Helper to get current user ID
const getCurrentUserId = (): string | null => {
  const user = authService.getCurrentUser();
  return user ? user.id : null;
};

// User data service for managing user-specific data
export const userDataService = {
  // Portfolio management
  getPortfolio: (): UserPortfolio | null => {
    const userId = getCurrentUserId();
    if (!userId) return null;
    
    try {
      const portfolioData = localStorage.getItem(`portfolio_${userId}`);
      if (portfolioData) {
        return JSON.parse(portfolioData);
      }
    } catch (error) {
      console.error('Failed to get portfolio data', error);
    }
    
    // Return default portfolio if not found
    return {
      assets: [],
      totalValue: 0,
      lastUpdated: new Date().toISOString()
    };
  },
  
  savePortfolio: (portfolio: UserPortfolio): boolean => {
    const userId = getCurrentUserId();
    if (!userId) return false;
    
    try {
      localStorage.setItem(`portfolio_${userId}`, JSON.stringify({
        ...portfolio,
        lastUpdated: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save portfolio data', error);
      return false;
    }
  },
  
  // Add asset to portfolio
  addAsset: (asset: PortfolioAsset): boolean => {
    const portfolio = userDataService.getPortfolio();
    if (!portfolio) return false;
    
    const existingAssetIndex = portfolio.assets.findIndex(a => a.id === asset.id);
    
    if (existingAssetIndex >= 0) {
      // Update existing asset
      portfolio.assets[existingAssetIndex] = {
        ...portfolio.assets[existingAssetIndex],
        ...asset
      };
    } else {
      // Add new asset
      portfolio.assets.push(asset);
    }
    
    // Recalculate total value - Fix: Convert string or number to number before adding
    portfolio.totalValue = portfolio.assets.reduce(
      (total, asset) => {
        // Handle asset value whether it's a string or already a number
        const numericValue = typeof asset.value === 'string'
          ? parseFloat(asset.value.replace(/[^0-9.-]+/g, ""))
          : asset.value;
        return total + numericValue;
      }, 
      0
    );
    
    return userDataService.savePortfolio(portfolio);
  },
  
  // Transaction management
  getTransactions: (): Transaction[] => {
    const userId = getCurrentUserId();
    if (!userId) return [];
    
    try {
      const transactionsData = localStorage.getItem(`transactions_${userId}`);
      if (transactionsData) {
        return JSON.parse(transactionsData);
      }
    } catch (error) {
      console.error('Failed to get transactions data', error);
    }
    
    // Return empty array - no more default transactions
    return [];
  },
  
  saveTransactions: (transactions: Transaction[]): boolean => {
    const userId = getCurrentUserId();
    if (!userId) return false;
    
    try {
      localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
      return true;
    } catch (error) {
      console.error('Failed to save transactions data', error);
      return false;
    }
  },
  
  addTransaction: (transaction: Transaction): boolean => {
    const transactions = userDataService.getTransactions();
    transactions.unshift(transaction); // Add to beginning of array (newest first)
    
    // Also fire a storage event so other components can update
    window.dispatchEvent(new Event('storage'));
    
    return userDataService.saveTransactions(transactions);
  },
  
  // User settings management
  getSettings: (): Record<string, any> => {
    const userId = getCurrentUserId();
    if (!userId) return {};
    
    try {
      const settingsData = localStorage.getItem(`settings_${userId}`);
      if (settingsData) {
        return JSON.parse(settingsData);
      }
    } catch (error) {
      console.error('Failed to get user settings', error);
    }
    
    return {};
  },
  
  saveSetting: (key: string, value: any): boolean => {
    const userId = getCurrentUserId();
    if (!userId) return false;
    
    try {
      const settings = userDataService.getSettings();
      settings[key] = value;
      localStorage.setItem(`settings_${userId}`, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Failed to save user setting', error);
      return false;
    }
  },
  
  // Check if user is a first-time user
  isFirstTimeUser: (): boolean => {
    const userId = getCurrentUserId();
    if (!userId) return false;
    
    try {
      const hasSeenWelcome = localStorage.getItem(`welcome_seen_${userId}`);
      return !hasSeenWelcome;
    } catch (error) {
      console.error('Failed to check first-time user', error);
      return false;
    }
  },
  
  markWelcomeSeen: (): void => {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    localStorage.setItem(`welcome_seen_${userId}`, 'true');
  }
};

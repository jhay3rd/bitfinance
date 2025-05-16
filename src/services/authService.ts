
// Authentication service to handle user login, registration, and session management

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  registeredDate: string;
  lastLogin: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

// Initialize auth state from localStorage
const getInitialAuthState = (): AuthState => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return JSON.parse(authData);
    }
  } catch (error) {
    console.error('Failed to parse auth data', error);
  }
  return { isAuthenticated: false, user: null };
};

// Generate a unique ID for users
const generateUserId = (): string => {
  return 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const authService = {
  // Get current auth state
  getAuthState: (): AuthState => {
    return getInitialAuthState();
  },

  // Register a new user
  register: (fullName: string, email: string, password: string): UserProfile => {
    // In a real app, we would hash passwords and validate data
    const newUser: UserProfile = {
      id: generateUserId(),
      fullName,
      email,
      registeredDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    // Store user in users collection
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[email] = {
      ...newUser,
      password, // In a real app, we would hash this
    };
    localStorage.setItem('users', JSON.stringify(users));

    // Set as current authenticated user
    const authState: AuthState = {
      isAuthenticated: true,
      user: newUser,
    };
    localStorage.setItem('auth', JSON.stringify(authState));

    // Initialize empty portfolio for the new user
    initializeUserData(newUser.id);

    return newUser;
  },

  // Login existing user
  login: (email: string, password: string): UserProfile | null => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const user = users[email];

      if (user && user.password === password) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));

        // Set as authenticated
        const authState: AuthState = {
          isAuthenticated: true,
          user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            registeredDate: user.registeredDate,
            lastLogin: user.lastLogin,
          },
        };
        localStorage.setItem('auth', JSON.stringify(authState));

        return authState.user;
      }
    } catch (error) {
      console.error('Login failed', error);
    }
    
    return null;
  },

  // Handle social login (Google, Apple)
  socialLogin: (provider: 'google' | 'apple', userData: any): UserProfile => {
    const email = userData.email || `${provider}_user_${Date.now()}@example.com`;
    const fullName = userData.name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;
    
    // Check if user exists
    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      let user = users[email];
      
      if (!user) {
        // Create new user if doesn't exist
        user = {
          id: generateUserId(),
          fullName,
          email,
          registeredDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider
        };
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Initialize empty portfolio for new social user
        initializeUserData(user.id);
      } else {
        // Update last login
        user.lastLogin = new Date().toISOString();
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      // Set as authenticated
      const authState: AuthState = {
        isAuthenticated: true,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          registeredDate: user.registeredDate,
          lastLogin: user.lastLogin,
        },
      };
      localStorage.setItem('auth', JSON.stringify(authState));
      
      return authState.user;
    } catch (error) {
      console.error(`${provider} login failed`, error);
      // Create a fallback user if something went wrong
      return authService.register(fullName, email, "socialLoginPassword");
    }
  },

  // Logout user
  logout: () => {
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: false, user: null }));
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const authState = getInitialAuthState();
    return authState.isAuthenticated && !!authState.user;
  },

  // Get current user
  getCurrentUser: (): UserProfile | null => {
    const authState = getInitialAuthState();
    return authState.user;
  }
};

// Initialize empty data for new users
const initializeUserData = (userId: string) => {
  // Initialize empty portfolio
  const emptyPortfolio = {
    assets: [],
    totalValue: 0,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(`portfolio_${userId}`, JSON.stringify(emptyPortfolio));
  
  // Initialize empty transactions list
  localStorage.setItem(`transactions_${userId}`, JSON.stringify([]));
  
  // Initialize default settings
  const defaultSettings = {
    theme: 'light',
    notificationsEnabled: true,
    currency: 'USD'
  };
  localStorage.setItem(`settings_${userId}`, JSON.stringify(defaultSettings));
};

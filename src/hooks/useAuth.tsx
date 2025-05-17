
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, AuthState } from '../services/authService';
import { useToast } from './use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  googleSignIn: () => Promise<boolean>;
  appleSignIn: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(authService.getAuthState());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Keep auth state in sync with localStorage
  useEffect(() => {
    const currentState = authService.getAuthState();
    setAuthState(currentState);
  }, []);

  // Login handler
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const user = authService.login(email, password);
      
      if (user) {
        setAuthState({ isAuthenticated: true, user });
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.fullName}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const user = authService.register(fullName, email, password);
      setAuthState({ isAuthenticated: true, user });
      toast({
        title: "Registration successful",
        description: `Welcome to BitFinance, ${user.fullName}!`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign-in handler
  // NOTE: This is a mock implementation. In a production app, you would integrate with Google OAuth API
  // using something like Firebase Auth, Auth0, or a custom OAuth implementation
  const googleSignIn = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to Google OAuth
      // For demo, we'll create a mock Google user
      const mockGoogleUser = {
        name: "Google User",
        email: `google_user_${Date.now()}@gmail.com`,
        picture: "https://example.com/avatar.png"
      };
      
      const user = authService.socialLogin('google', mockGoogleUser);
      setAuthState({ isAuthenticated: true, user });
      
      toast({
        title: "Google Sign-In Successful",
        description: `Welcome to BitFinance, ${user.fullName}!`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Apple sign-in handler
  // NOTE: This is a mock implementation. In a production app, you would integrate with Apple Sign In
  // using their JavaScript SDK or a third-party auth provider like Firebase Auth or Auth0
  const appleSignIn = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to Apple OAuth
      // For demo, we'll create a mock Apple user
      const mockAppleUser = {
        name: "Apple User",
        email: `apple_user_${Date.now()}@icloud.com`,
      };
      
      const user = authService.socialLogin('apple', mockAppleUser);
      setAuthState({ isAuthenticated: true, user });
      
      toast({
        title: "Apple Sign-In Successful",
        description: `Welcome to BitFinance, ${user.fullName}!`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Apple Sign-In Failed",
        description: "Could not sign in with Apple",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    authService.logout();
    setAuthState({ isAuthenticated: false, user: null });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const value = {
    ...authState,
    login,
    register,
    googleSignIn,
    appleSignIn,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

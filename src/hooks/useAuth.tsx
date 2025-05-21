import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, AuthState } from '../services/authService';
import { useToast } from './use-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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
  const googleSignIn = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      return new Promise((resolve, reject) => {
        const login = useGoogleLogin({
          onSuccess: async (tokenResponse) => {
            try {
              const backendRes = await axios.post('/api/auth/google', { token: tokenResponse.access_token });
              const { token, user } = backendRes.data;
              // Store JWT in localStorage
              localStorage.setItem('jwt', token);
              setAuthState({ isAuthenticated: true, user });
              toast({
                title: 'Google Sign-In Successful',
                description: `Welcome to BitFinance, ${user.name || user.fullName || user.email}!`,
              });
              resolve(true);
            } catch (err: any) {
              toast({
                variant: 'destructive',
                title: 'Google Sign-In Failed',
                description: err?.response?.data?.message || err.message,
              });
              resolve(false);
            } finally {
              setIsLoading(false);
            }
          },
          onError: (error) => {
            toast({
              variant: 'destructive',
              title: 'Google Sign-In Failed',
              description: error?.error || 'Google sign-in was cancelled or failed.',
            });
            setIsLoading(false);
            resolve(false);
          },
        });
        login();
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error?.message || 'Could not sign in with Google',
      });
      setIsLoading(false);
      return false;
    }
  };

  // Apple sign-in handler
  const appleSignIn = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check if AppleID JS SDK is loaded
      if (!(window as any).AppleID) {
        toast({
          variant: 'destructive',
          title: 'Apple Sign-In Failed',
          description: 'Apple Sign-In is not supported in this browser.',
        });
        setIsLoading(false);
        return false;
      }
      return new Promise((resolve) => {
        (window as any).AppleID.auth.init({
          clientId: import.meta.env.VITE_APPLE_CLIENT_ID || 'your-apple-client-id',
          scope: 'name email',
          redirectURI: window.location.origin + '/login',
          usePopup: true,
        });
        (window as any).AppleID.auth.signIn().then(async (response: any) => {
          try {
            const id_token = response.authorization && response.authorization.id_token;
            if (!id_token) throw new Error('No id_token received from Apple');
            const backendRes = await axios.post('/api/auth/apple', { token: id_token });
            const { token, user } = backendRes.data;
            localStorage.setItem('jwt', token);
            setAuthState({ isAuthenticated: true, user });
            toast({
              title: 'Apple Sign-In Successful',
              description: `Welcome to BitFinance, ${user.name || user.fullName || user.email}!`,
            });
            resolve(true);
          } catch (err: any) {
            toast({
              variant: 'destructive',
              title: 'Apple Sign-In Failed',
              description: err?.response?.data?.message || err.message,
            });
            resolve(false);
          } finally {
            setIsLoading(false);
          }
        }).catch((error: any) => {
          toast({
            variant: 'destructive',
            title: 'Apple Sign-In Failed',
            description: error?.error || 'Apple sign-in was cancelled or failed.',
          });
          setIsLoading(false);
          resolve(false);
        });
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Apple Sign-In Failed',
        description: error?.message || 'Could not sign in with Apple',
      });
      setIsLoading(false);
      return false;
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

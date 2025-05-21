
import { useState, useEffect, createContext, useContext } from 'react';

interface AdminAuthState {
  isAuthenticated: boolean;
  credentials: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<string | null>(null);

  // Check if admin is authenticated on mount
  useEffect(() => {
    const storedCredentials = localStorage.getItem('adminAuth');
    if (storedCredentials) {
      setCredentials(storedCredentials);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const newCredentials = btoa(`${email}:${password}`);
      const res = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Basic ${newCredentials}`,
        },
      });
      
      if (res.ok) {
        localStorage.setItem('adminAuth', newCredentials);
        setCredentials(newCredentials);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Admin login error:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setCredentials(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, credentials, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default useAdminAuth;

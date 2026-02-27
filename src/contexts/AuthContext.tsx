import { createContext, useContext, useState, ReactNode } from 'react';

const ADMIN_USERNAME = 'syedmaroofhussain';
const ADMIN_PASSWORD = 'sahil#72755';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });

  const signIn = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const signOut = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

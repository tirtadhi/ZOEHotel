'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users untuk demo (dalam production, ini akan dari database)
const MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@booking.com',
    phone: '+62812-3456-7890',
    role: 'admin',
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+62812-1111-1111',
    role: 'user',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Untuk demo: admin@booking.com / admin123 atau user@example.com / user123
      const foundUser = MOCK_USERS.find((u) => u.email === email);

      if (!foundUser) {
        alert(
          'User not found! Use:\nAdmin: admin@booking.com / admin123\nUser: user@example.com / user123'
        );
        return false;
      }

      // Validasi password sederhana untuk demo
      const validPassword =
        (email === 'admin@booking.com' && password === 'admin123') ||
        (email === 'user@example.com' && password === 'user123');

      if (!validPassword) {
        alert('Invalid password! Use:\nAdmin: admin123\nUser: user123');
        return false;
      }

      // Set user
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user already exists
      if (MOCK_USERS.find((u) => u.email === email)) {
        alert('Email already registered!');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role: 'user',
      };

      // Add to mock users (in production, this would be saved to database)
      MOCK_USERS.push(newUser);

      // Auto login after signup
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

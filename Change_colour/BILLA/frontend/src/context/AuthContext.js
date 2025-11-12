import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  // Check for existing user in localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // --- Signup Function ---
  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      // Store user data (including token) in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || 'Signup failed' };
    }
  };

  // --- Login Function ---
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      // Store user data (including token) in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || 'Invalid credentials' };
    }
  };

  // --- Logout Function ---
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
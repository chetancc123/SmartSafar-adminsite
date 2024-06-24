// AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const navigate = useNavigate(); // Hook for navigation

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/'); // Redirect to home page after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to login page after logout
  };

  useEffect(() => {
    // Check if the user is already authenticated from localStorage
    const isAuthenticatedFromStorage = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (isAuthenticatedFromStorage) {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      setUser(userFromStorage);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
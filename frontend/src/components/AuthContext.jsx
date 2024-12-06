import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [login, setLogin] = useState(localStorage.getItem('login') || null);

  const loginUser = (newToken, newLogin) => {
    setToken(newToken);
    setLogin(newLogin);
    localStorage.setItem('token', newToken);
    localStorage.setItem('login', newLogin);
  };

  const logoutUser = () => {
    setToken(null);
    setLogin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  };

  return (
    <AuthContext.Provider value={{ token, login, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
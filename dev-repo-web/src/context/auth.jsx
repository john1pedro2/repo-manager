import React, { useState, useEffect, createContext } from "react";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    const recoveredToken = localStorage.getItem('token');

    if (recoveredUser && recoveredToken) {
      setUser(JSON.parse(recoveredUser));
      setToken(JSON.parse(recoveredToken));
      api.defaults.headers.authorization = `Bearer: ${recoveredToken}`;
    }

    setLoading(false);

  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    

    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);

    setUser(response.data.user);
    setToken(response.data.token);
    api.defaults.headers.authorization = `Bearer: ${response.data.token}`; 
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.authorization = null;
  }

  return(
    <AuthContext.Provider value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout
      }}>
      { children }
    </AuthContext.Provider>
  );
}
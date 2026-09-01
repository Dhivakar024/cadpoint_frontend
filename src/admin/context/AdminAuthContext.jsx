import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cadpoint-backend.onrender.com/api';
const AUTH_TOKEN_KEY = 'cadpoint_admin_auth_token_v1';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('cadpoint_admin_user') || localStorage.getItem('cadpoint_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 60000,
        });
        if (res.data && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.warn('Admin session expired or invalid', err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, [token]);

  const login = async (username, password, remember = true) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/login`,
        { username, password },
        { timeout: 60000 }
      );
      if (res.data && res.data.token) {
        const authToken = res.data.token;
        const userData = res.data.user || { username: 'admin', email: 'admin@cadpoint.co.in', role: 'admin' };

        setToken(authToken);
        setUser(userData);

        try {
          if (remember) {
            localStorage.setItem(AUTH_TOKEN_KEY, authToken);
            localStorage.setItem('cadpoint_admin_user', JSON.stringify(userData));
          } else {
            sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
            sessionStorage.setItem('cadpoint_admin_user', JSON.stringify(userData));
          }
        } catch (e) {
          console.warn('Unable to persist token in browser storage', e);
        }
        return res.data;
      } else {
        throw new Error(res.data?.error || 'Invalid admin credentials');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        throw new Error(err.response.data.error);
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        throw new Error('Backend server is starting up (cold start). Please wait 10 seconds and click Sign In again.');
      } else if (err.message === 'Network Error' || !err.response) {
        throw new Error('Unable to connect to CADPOINT API Server. Please check your network connection or try again in a few seconds.');
      } else {
        throw err;
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem('cadpoint_admin_user');
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('cadpoint_admin_user');
    } catch (e) {
      console.warn('Error clearing session storage', e);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

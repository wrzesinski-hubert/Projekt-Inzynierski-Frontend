import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { User } from '../types';
import axios from 'axios';

export interface CASContext {
  user?: User;
  logout: () => void;
}

export const CASContext = createContext<CASContext | undefined>(undefined);

export interface CASProviderProps {
  children: ReactNode;
}

export const CASProvider = ({ children }: CASProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    if (!ticket) {
      redirectToCASLoginService();
    }
    try {
      if (!sessionStorage.getItem('userToken')) {
        const { data: token } = await axios.get(`${process.env.REACT_APP_API_URL}/token?ticket=${ticket}`);
        sessionStorage.setItem('userToken', token);
        setUser({ ...user, token });
      }
      const token = sessionStorage.getItem('userToken');
      setUser({ ...user, token });
    } catch (e) {
      console.log(e);
    }
  };

  function logout() {
    redirectToCASLogoutService();
  }

  function redirectToCASLogoutService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`);
  }

  function redirectToCASLoginService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`);
  }

  return <CASContext.Provider value={{ user, logout }}>{children}</CASContext.Provider>;
};

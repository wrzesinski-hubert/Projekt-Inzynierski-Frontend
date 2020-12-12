import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { User, Token } from '../types';
import { axiosInstance } from '../utils/axiosInstance';

export interface CASContext {
  user?: User;
  logout: () => void;
  token?: string | null;
}

export const CASContext = createContext<CASContext | undefined>(undefined);

export interface CASProviderProps {
  children: ReactNode;
}

export const CASProvider = ({ children }: CASProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const login = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const ticket = urlParams.get('ticket');
      if (!ticket) {
        redirectToCASLoginService();
      }
      try {
        if (!localStorage.getItem('userToken')) {
          const { data: token } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/token?ticket=${ticket}`);
          localStorage.setItem('userToken', token.token);
          localStorage.setItem('userPrivilige', token.authorityRole);
        }
        const tokenTMP: any = JSON.parse(localStorage.getItem('userToken') as string);
        const token: Token = {
          authorityRole: tokenTMP.authorityRole,
          email: tokenTMP.email,
          id: tokenTMP.id,
          token: tokenTMP.token,
        };
        setToken(token.token);
      } catch (e) {
        console.log(e);
      }
    };
    login();
  }, []);

  function logout() {
    redirectToCASLogoutService();
  }

  function redirectToCASLogoutService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`);
  }

  function redirectToCASLoginService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`);
  }

  return <CASContext.Provider value={{ user, token, logout }}>{children}</CASContext.Provider>;
};

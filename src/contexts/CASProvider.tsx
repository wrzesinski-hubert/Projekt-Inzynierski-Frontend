import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { LoggedUser } from '../types';
import { axiosInstance } from '../utils/axiosInstance';

export interface CASContext {
  user: LoggedUser | undefined;
  logout: () => void;
  token: string | undefined;
}

export const CASContext = createContext<CASContext | undefined>(undefined);

export interface CASProviderProps {
  children: ReactNode;
}

export const CASProvider = ({ children }: CASProviderProps) => {
  const [user, setUser] = useState<LoggedUser>();
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => {
    const login = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const ticket = urlParams.get('ticket');
      if (!ticket) {
        redirectToCASLoginService();
      }
      try {
        if (!localStorage.getItem('userToken')) {
          const { data: user } = await axiosInstance.get<LoggedUser & { token: string }>(
            `${process.env.REACT_APP_API_URL}/token?ticket=${ticket}`,
          );
          setUser({ authorityRole: user.authorityRole, email: user.email, id: user.id });
          localStorage.setItem('userToken', user.token);
          localStorage.setItem('userPrivilige', user.authorityRole);
        }
        const token = localStorage.getItem('userToken');
        token && setToken(token);
      } catch (e) {
        console.log(e);
      }
    };
    login();
  }, []);

  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userPrivilige');
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

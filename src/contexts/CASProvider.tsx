import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { LoggedUser } from '../types';
import { axiosInstance, getNewTokens } from '../utils/axiosInstance';


export interface CASContext {
  user: LoggedUser | undefined;
  logout: () => void;
  token: string | undefined;
  refreshToken: string | undefined;
  isFetchingToken: boolean;
  role: string | undefined;
}

export const CASContext = createContext<CASContext | undefined>(undefined);

export interface CASProviderProps {
  children: ReactNode;
}

export const CASProvider = ({ children }: CASProviderProps) => {
  const [user, setUser] = useState<LoggedUser>();
  const [token, setToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  useEffect(() => {
    const login = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const ticket = urlParams.get('ticket');
      if (!ticket) {
        redirectToCASLoginService();
      }
      try {
        if (!localStorage.getItem('userToken')) {
          setIsFetchingToken(true);
          const { data: user } = await axiosInstance.get<LoggedUser & { token: string; refreshToken: string }>(
            `${process.env.REACT_APP_API_URL}/token?ticket=${ticket}`,
          );
          setUser({ authorityRole: user.authorityRole, email: user.email, id: user.id });
          localStorage.setItem('userToken', user.token);
          localStorage.setItem('userPrivilige', user.authorityRole);
          localStorage.setItem('refreshToken', user.refreshToken);
          setIsFetchingToken(false);
        }
        else{
          getNewTokens();
        }
        const token = localStorage.getItem('userToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('userPrivilige');
        token && setToken(token);
        refreshToken && setRefreshToken(refreshToken);
        role && setRole(role);
      } catch (e) {
        console.log(e);
      }
    };
    login();
  }, []);

  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userPrivilige');
    redirectToCASLogoutService();
  }

  function redirectToCASLogoutService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`);
  }

  function redirectToCASLoginService() {
    window.location.replace(`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`);
  }

  return (
    <CASContext.Provider value={{ user, token, refreshToken, logout, isFetchingToken, role }}>
      {children}
    </CASContext.Provider>
  );
};

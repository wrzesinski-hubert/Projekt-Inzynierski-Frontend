import React, { useState, useEffect } from 'react';
import { User } from '../types';

export interface CASContext {
  user: User | null;
  logout: () => void;
}

export const CASContext = React.createContext<CASContext | null>(null);

export interface CASProviderProps {
  children: React.ReactNode;
}

export const CASProvider = ({ children }: CASProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    login();
  }, []);

  function login() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (!ticket) {
      redirectToCASLoginService();
    }
    if (ticket) {
      console.log(`Ticket is: ${ticket}`);
      setUser({ ...user, ticket: ticket });
    }
  }

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

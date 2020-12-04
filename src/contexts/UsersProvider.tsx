import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { axiosInstance } from '../utils/axiosInstance';

interface UserContext {
  users: Array<User>;
}

export const usersContext = createContext<UserContext | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get<Array<User>>(
        `${process.env.REACT_APP_API_URL}/api/v1/Users/student/search?query=`,
      );
      console.log(data);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 200);
  }, []);

  return (
    <usersContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};

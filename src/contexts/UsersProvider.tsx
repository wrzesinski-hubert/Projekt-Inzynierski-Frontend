import React, { useState, createContext, useEffect, ReactNode, useRef } from 'react';
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
      const {data}= await axiosInstance.get<Array<User>>(`${process.env.REACT_APP_API_URL}/api/v1/users/student/search?query=`);
      setUsers(data);
      console.log(data);
    } catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
      getUsers();
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

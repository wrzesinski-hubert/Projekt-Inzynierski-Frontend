import React, { useState, createContext, useEffect, ReactNode, useRef } from 'react';
import { Student } from '../types';
import { axiosInstance } from '../utils/axiosInstance';

interface StudentContext {
  students: Array<Student>;
}

export const studentsContext = createContext<StudentContext | undefined>(undefined);

interface StudentsProviderProps {
  children: ReactNode;
}

export const StudentsProvider = ({ children }: StudentsProviderProps) => {
  const [students, setStudents] = useState<Array<Student>>([]);

  const userPrivilige = localStorage.getItem('userPrivilige');

  const getStudents = async () => {
    try {
      const { data } = await axiosInstance.get<Array<Student>>(
        `${process.env.REACT_APP_API_URL}/api/v1/users/students`,
      );
      setStudents(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      userPrivilige === 'DEANERY' && getStudents();
    }, 500);
  }, []);

  return (
    <studentsContext.Provider
      value={{
        students,
      }}
    >
      {children}
    </studentsContext.Provider>
  );
};

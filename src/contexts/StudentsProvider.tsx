import React, { useState, createContext, useEffect, ReactNode, useRef, useContext } from 'react';
import { Student } from '../types';
import { axiosInstance } from '../utils/axiosInstance';
import { CASContext } from './CASProvider';

interface StudentContext {
  students: Array<Student>;
  selectedStudent: Student | null;
  changeSelectedStudent: (studentId: number) => void;
}

export const studentsContext = createContext<StudentContext | undefined>(undefined);

interface StudentsProviderProps {
  children: ReactNode;
}

export const StudentsProvider = ({ children }: StudentsProviderProps) => {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  //not working currently
  const userPrivilige = localStorage.getItem('userPrivilige');
  const { user } = useContext(CASContext)!;

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

  const changeSelectedStudent = (studentId: number) => {
    setSelectedStudent(students.find((student) => student.id === studentId)!);
  };

  useEffect(() => {
    setTimeout(() => {
      // user?.authorityRole === 'DEANERY' &&
      getStudents();
    }, 500);
  }, []);

  return (
    <studentsContext.Provider
      value={{
        selectedStudent,
        students,
        changeSelectedStudent,
      }}
    >
      {children}
    </studentsContext.Provider>
  );
};

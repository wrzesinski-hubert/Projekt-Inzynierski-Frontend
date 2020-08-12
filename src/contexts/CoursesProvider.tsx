import React, { useState, createContext, useEffect } from 'react';
import { Course, Group } from '../types';

interface courseContext {
  courses: Array<Course>;
  choosenGroups: Array<Group>;
  addCourse: (courses: Course) => void;
  addGroup: (group: Group) => void;
}
export const coursesContext = createContext<courseContext | null>(null);

interface CoursesProviderProps {
  children: React.ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };
  const addGroup = (group: Group) => {
    setChoosenGroups([...choosenGroups, group]);
  };

  return (
    <coursesContext.Provider value={{ courses, choosenGroups, addCourse, addGroup }}>
      {children}
    </coursesContext.Provider>
  );
};

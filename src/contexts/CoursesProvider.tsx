import React, { useState, createContext, useEffect } from 'react';
import { Course, Group } from '../types';
import axios from 'axios';
interface CourseContext {
  courses: Array<Course>;
  choosenCourses: Array<Course>;
  choosenGroups: Array<Group>;
  addChoosenCourse: (courses: Course) => void;
  addChoosenGroup: (group: Group) => void;
}
export const coursesContext = createContext<CourseContext | null>(null);

interface CoursesProviderProps {
  children: React.ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [choosenCourses, setChoosenCourses] = useState<Array<Course>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);

  const addChoosenCourse = (choosenCourse: Course) => {
    setChoosenCourses([...choosenCourses, choosenCourse]);
  };
  const addChoosenGroup = (choosenGroup: Group) => {
    //const choosenCourse = courses.filter(course=>(course.groups.map(group=>group.id).includes(choosenGroup.id)))
    console.log("id" + choosenGroup.id )
    console.log("mapowanie: " + courses.filter(course=>(course.groups.map(group=>group.id))));
    //console.log("wybrane kursy: " + choosenCourse);
    setChoosenGroups([...choosenGroups, choosenGroup]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getCourses`);
      setCourses(data);
    };
    fetchData();
  }, []);

  return (
    <coursesContext.Provider value={{ courses, choosenGroups, choosenCourses, addChoosenCourse, addChoosenGroup }}>
      {children}
    </coursesContext.Provider>
  );
};

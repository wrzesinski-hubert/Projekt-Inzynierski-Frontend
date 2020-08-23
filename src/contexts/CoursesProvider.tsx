import React, { useState, createContext, useEffect } from 'react';
import { Course, Group, Basket } from '../types';
import axios from 'axios';

interface CourseContext {
  courses: Array<Course>;
  choosenCourses: Array<Course>;
  choosenGroups: Array<Group>;
  basket: Array<Basket>;
  addToBasket: (courses: Basket) => void;
  addChoosenGroup: (group: Group, id: number) => void;
}
export const coursesContext = createContext<CourseContext | null>(null);

interface CoursesProviderProps {
  children: React.ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  //fetch courses with groups
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [basket, setBasket] = useState<Array<Basket>>([]);
  //with groups
  const [choosenCourses, setChoosenCourses] = useState<Array<Course>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);

  const addToBasket = (course: Basket) => setBasket([...basket, course]);

  useEffect(() => {
    console.log(basket);
  }, [basket]);

  const addChoosenGroup = (choosenGroup: Group, id: number) => {
    //move to utilities
    //change type to group type from api
    function hasChoosenGroupType(type: string) {
      const res = choosenCourse.groups!.find((group) => group.type === type);
      console.log(`res is: ${JSON.stringify(res)}`);
      return !!res;
    }

    const choosenCourse = choosenCourses.find((cc) => cc.id === id)!;

    const type = choosenGroup.type;
    console.log(`group type is: ${type}`);
    if (hasChoosenGroupType(type)) {
      const group = choosenCourse.groups!.find((group) => group.type === type);
      console.log(`group is: ${JSON.stringify(group)}`);
      console.log(choosenCourse.groups);
      if (group) {
        group.type = type;
      }
      setChoosenGroups([...choosenGroups, choosenGroup]);
    } else {
      console.log('pierwsza grupa/wykłąd');
      //może być złe
      choosenCourse.groups!.push(choosenGroup);
      // setChoosenCourses(course => course.id === choosenCourse.id)
      setChoosenGroups([...choosenGroups, choosenGroup]);
    }
    console.log(`choosen courses after changing group: ${JSON.stringify(choosenCourses)}`);

    console.log(choosenCourse);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: courses } = await axios.get(`${process.env.REACT_APP_API_URL}/getCourses`);

      for (const course of courses) {
        const { data: groups } = await axios.get(`${process.env.REACT_APP_API_URL}/getCourseGroups?id=${course.id}`);
        //porozmawiać z Filipem, żeby odrobinę przerobił endpoint
        course.groups = groups;
      }

      setCourses(courses);
    };
    fetchData();
  }, []);

  return (
    <coursesContext.Provider value={{ courses, choosenGroups, choosenCourses, basket, addToBasket, addChoosenGroup }}>
      {children}
    </coursesContext.Provider>
  );
};

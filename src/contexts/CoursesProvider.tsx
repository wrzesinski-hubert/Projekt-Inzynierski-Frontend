import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Course, Group, Basket, GroupType } from '../types';
import axios from 'axios';

interface CourseContext {
  courses: Array<Course>;
  basket: Array<Basket>;
  addToBasket: (courses: Basket) => void;
  addGroup: (group: Group, id: number) => void;
  deleteFromBasket: (id: number) => void;
}
export const coursesContext = createContext<CourseContext | null>(null);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  //fetch courses with groups
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [basket, setBasket] = useState<Array<Basket>>([]);

  const addToBasket = (course: Basket) => setBasket([...basket, course]);

  const deleteFromBasket = (id: number) => setBasket(basket.filter(course => course.id !== id));


  useEffect(() => {
    console.log('BASKET');
    console.log(basket);
  }, [basket]);

  //immutability

  const addGroup = (choosenGroup: Group, id: number) => {
    const basketCourse = basket.filter((course) => course.id === id)[0];
    const type = choosenGroup.type;
    if (type === GroupType.CLASS) {
      setBasket(
        basket.map((basket) => (basket.id === basketCourse.id ? { ...basket, classes: choosenGroup } : basket)),
      );
    } else if (type === GroupType.LECTURE) {
      setBasket(
        basket.map((basket) => (basket.id === basketCourse.id ? { ...basket, lecture: choosenGroup } : basket)),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: courses } = await axios.get(`${process.env.REACT_APP_API_URL}/getCoursesWithGroups`);
      courses.sort((a: Course, b: Course) => (a.name > b.name ? 1 : -1));
      setCourses(courses);
    };
    fetchData();
  }, []);

  return (
    <coursesContext.Provider value={{ courses, basket, addToBasket, addGroup, deleteFromBasket }}>{children}</coursesContext.Provider>
  );
};

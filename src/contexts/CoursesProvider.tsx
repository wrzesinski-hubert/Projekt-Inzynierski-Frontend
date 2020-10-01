import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Course, Group, Basket, GroupType } from '../types';
import axios from 'axios';

interface CourseContext {
  courses: Array<Course>;
  basket: Array<Basket>;
  addToBasket: (courses: Course) => void;
  addGroup: (group: Group, id: number) => void;
  deleteFromBasket: (id: number) => void;
  saveBasket: () => void;
}
export const coursesContext = createContext<CourseContext | null>(null);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  //fetch courses with groups
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [basket, setBasket] = useState<Array<Basket>>([]);

  const addToBasket = (course: Course) => {
    const courseToBasket = {
      name: course.name,
      id: course.id,
      classes: course.classes[0],
      lecture: course.lectures !== undefined ? course.lectures[0] : undefined,
    } as Basket;
    setBasket([...basket, courseToBasket]);
  };

  const deleteFromBasket = (id: number) => setBasket(basket.filter((course) => course.id !== id));

  const saveBasket = () => {
    // try {
    //   axios.post(`${process.env.REACT_APP_API_URL}/api/v1/commisions/add`);
    // } catch (e) {
    //   console.log(e);
    // }
    console.log('saving to basket');
  };

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
      const { data } = await axios.get<Array<{ id: string; name: string; groups: Array<Group> }>>(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/getCoursesWithGroups`,
      );
      const courses = data.map(({ id, name, groups }) => ({
        id: parseInt(id),
        name,
        lectures: groups.filter(({ type }) => type === GroupType.LECTURE),
        classes: groups.filter(({ type }) => type === GroupType.CLASS),
      })) as Array<Course>;
      console.log('courses mapped');
      console.log(courses);
      courses.sort((a: Course, b: Course) => (a.name > b.name ? 1 : -1));

      setCourses(courses);
    };
    fetchData();
  }, []);

  return (
    <coursesContext.Provider value={{ courses, basket, addToBasket, addGroup, deleteFromBasket, saveBasket }}>
      {children}
    </coursesContext.Provider>
  );
};

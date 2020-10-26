import React, { useState, createContext, useEffect, ReactNode, useContext } from 'react';
import { Course, Group, Basket, GroupType } from '../types';
import axios from 'axios';
import { CASContext, CASProvider } from './CASProvider';

interface CourseContext {
  courses: Array<Course>;
  basket: Array<Basket>;
  addToBasket: (courses: Course) => void;
  addGroup: (group: Group, id: number) => void;
  deleteFromBasket: (id: number) => void;
  saveBasket: () => void;
}
export const coursesContext = createContext<CourseContext | undefined>(undefined);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  //fetch courses with groups
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [basket, setBasket] = useState<Array<Basket>>([]);

  const CAS = useContext(CASContext)!;
  const token = CAS?.user?.token;

  const addToBasket = (course: Course) => {
    const courseToBasket: Basket = {
      name: course.name,
      id: course.id,
      classes: course.classes[0],
      lecture: course.lectures !== undefined ? course.lectures[0] : undefined,
    };
    setBasket([...basket, courseToBasket]);
  };

  const deleteFromBasket = (id: number) => setBasket(basket.filter((course) => course.id !== id));

  const saveBasket = async () => {
    try {
      //to be deleted
      let data = [7, 43, 54];
      let json = JSON.stringify(data);
      let post_data = { json_data: json };
      const ech = await axios.post<Array<number>>(
        `${process.env.REACT_APP_API_URL}/api/v1/commisions/add?`,
        [7, 43, 54],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('api response;', ech);
    } catch (e) {
      console.log(e);
    }
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
      const { data: courses } = await axios.get<Array<Course>>(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/getCoursesWithGroups`,
      );
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

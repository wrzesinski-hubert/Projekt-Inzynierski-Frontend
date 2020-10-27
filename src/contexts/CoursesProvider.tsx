import React, { useState, createContext, useEffect, ReactNode, useContext } from 'react';
import { Course, Group, Basket, GroupType } from '../types';
import axios from 'axios';
import { CASContext } from './CASProvider';
import { useSnackbar } from 'notistack';

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

  const { enqueueSnackbar } = useSnackbar();

  const CAS = useContext(CASContext)!;
  const token = CAS?.user?.token;

  const selectBasketIds = (basket: Array<Basket>) => {
    const classesIds = basket.map((course) => course.classes.id);
    const lecturesIds = basket.map((course) => course?.lecture?.id);

    return lecturesIds[0] === undefined ? classesIds : [...classesIds, ...lecturesIds];
  };

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
    const basketIds = selectBasketIds(basket);

    const config = {
      method: 'post' as const,
      url: `${process.env.REACT_APP_API_URL}/api/v1/commisions/add?`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(basketIds),
    };

    try {
      await axios.request(config);
      enqueueSnackbar('Plan został zapisany', {
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar('Zapisywanie planu nie powiodło się', {
        variant: 'error',
      });
    }
  };

  const addGroup = (choosenGroup: Group, id: number) => {
    const basketCourse = basket.filter((course) => course.id === id)[0];
    const { type } = choosenGroup;
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

  const getNewestTimetable = async () => {
    //todo
    try {
      const { data: basket } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/assignments/getCurrentAssignments`,
      );
      // setBasket(basket);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchClasses = async () => {
    try {
      const { data: courses } = await axios.get<Array<Course>>(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/getCoursesWithGroups`,
      );
      courses.sort((a, b) => (a.name > b.name ? 1 : -1));
      setCourses(courses);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchClasses();
    getNewestTimetable();
  }, []);

  return (
    <coursesContext.Provider value={{ courses, basket, addToBasket, addGroup, deleteFromBasket, saveBasket }}>
      {children}
    </coursesContext.Provider>
  );
};

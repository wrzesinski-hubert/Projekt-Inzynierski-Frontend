import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Course, Group, Basket, GroupType, SchedulerEvent } from '../types';
import { useSnackbar } from 'notistack';
import { createClassTime } from '../utils';
import { axiosInstance } from '../utils/axiosInstance';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const StyledCloseIcon = styled(CloseIcon)`
  color: #000000;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

interface CourseContext {
  courses: Array<Course>;
  basket: Array<Basket>;
  hoveredGroup: Group | undefined | null;
  addCourseToBasket: (courses: Course) => void;
  changeHoveredGroup: (group: Group | null) => void;
  changeGroupInBasket: (group: Group, courseId: number) => void;
  restoreGroupInBasket: (restoreGroup: Group, courseId: number) => void;
  deleteFromBasket: (id: number) => void;
  saveBasket: () => void;
  selectSchedulerEvents: () => Array<SchedulerEvent>;
  selectBasketNames: () => Array<string>;
  selectBasketCourses: () => Array<Course>;
  selectBasketCourseGroups: (courseId: number) => { lecture: Group | undefined; classes: Group | undefined };
}
export const coursesContext = createContext<CourseContext | undefined>(undefined);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { closeSnackbar } = useSnackbar();

  //fetch courses with groups
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [basket, setBasket] = useState<Array<Basket>>([]);
  const [hoveredGroup, setHoveredGroup] = useState<Group | undefined | null>(null);
  const selectBasketIds = () => {
    const classesIds = basket.map((course) => course?.classes?.id).filter((course) => course !== undefined);
    const lecturesIds = basket.map((course) => course?.lecture?.id).filter((course) => course !== undefined);
    return [...classesIds, ...lecturesIds];
  };

  const selectBasketNames = () => basket.map(({ name }) => name);

  const selectBasketCourses = () => {
    const basketNames = selectBasketNames();
    return basketNames.reduce((sum, basketName) => {
      const course = courses.find(({ name }) => basketName === name);
      return course === undefined ? sum : [...sum, course];
    }, [] as Array<Course>);
  };

  const selectSchedulerEvents = () => {
    return basket.reduce((res, el) => {
      const { name } = el;
      if (el.classes) {
        const { time } = el.classes;
        res.push({ ...el.classes, name, time: createClassTime(time) });
      }
      if (el.lecture) {
        const { time } = el.lecture;
        res.push({ ...el.lecture, name, time: createClassTime(time) });
      }
      return res;
    }, [] as Array<SchedulerEvent>);
  };

  const selectBasketCourseGroups = (courseId: number) => {
    const course = basket.find(({ id }) => id === courseId);
    if (course !== undefined) {
      return { lecture: course.lecture, classes: course.classes };
    } else {
      return { lecture: undefined, classes: undefined };
    }
  };

  const changeHoveredGroup = (group: Group | null) => setHoveredGroup(group);

  const addCourseToBasket = (course: Course) => {
    const courseToBasket: Basket = {
      name: course.name,
      id: course.id,
      classes: course.classes !== undefined ? course.classes[0] : undefined,
      lecture: course.lectures !== undefined ? course.lectures[0] : undefined,
    };
    setBasket([...basket, courseToBasket]);
  };

  const deleteFromBasket = (id: number) => setBasket(basket.filter((course) => course.id !== id));

  const saveBasket = async () => {
    const basketIds = selectBasketIds();
    const action = (key: any) => (
      <>
        <StyledCloseIcon
          onClick={() => {
            closeSnackbar(key);
          }}
        ></StyledCloseIcon>
      </>
    );

    try {
      await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/commisions/user`, JSON.stringify(basketIds));
      enqueueSnackbar('Plan został zapisany', {
        variant: 'success',
        action,
      });
    } catch (e) {
      console.log('error: ', e);
      enqueueSnackbar('Zapisywanie planu nie powiodło się', {
        variant: 'error',
        action,
      });
    }
  };

  const changeGroupInBasket = (choosenGroup: Group, courseId: number) => {
    const basketCourse = basket.filter((course) => course.id === courseId)[0];
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
    changeHoveredGroup(choosenGroup);
  };

  const restoreGroupInBasket = (restoreGroup: Group, courseId: number) => {
    const basketCourse = basket.filter((course) => course.id === courseId)[0];
    const { type } = restoreGroup;
    if (type === GroupType.CLASS) {
      setBasket(
        basket.map((basket) => (basket.id === basketCourse.id ? { ...basket, classes: restoreGroup } : basket)),
      );
    } else if (type === GroupType.LECTURE) {
      setBasket(
        basket.map((basket) => (basket.id === basketCourse.id ? { ...basket, lecture: restoreGroup } : basket)),
      );
    }
  };

  const getNewestTimetable = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/assignments/user`,
      );
      const basket = data === '' ? [] : data;
      setBasket(basket);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data: courses } = await axiosInstance.get<Array<Course>>(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/all?groups=true`,
      );
      const sortedCourses = courses.sort((a, b) => (a.name > b.name ? 1 : -1));
      setCourses(sortedCourses);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCourses();
      getNewestTimetable();
    }, 200);
  }, []);

  return (
    <coursesContext.Provider
      value={{
        courses,
        basket,
        hoveredGroup,
        addCourseToBasket,
        changeHoveredGroup,
        changeGroupInBasket,
        deleteFromBasket,
        restoreGroupInBasket,
        saveBasket,
        selectSchedulerEvents,
        selectBasketNames,
        selectBasketCourses,
        selectBasketCourseGroups,
      }}
    >
      {children}
    </coursesContext.Provider>
  );
};

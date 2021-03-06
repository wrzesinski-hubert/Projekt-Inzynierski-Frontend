import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Course, Group, Basket, GroupType, SchedulerEvent, TimetableHistory } from '../types';
import { useSnackbar } from 'notistack';
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
  timetableHistory: Array<TimetableHistory>;
  hoveredGroup: Group | undefined | null;
  userID: string;
  isDataLoading: boolean;
  historyBasket: Array<Basket>;
  tour: string;
  isSavingLoading: boolean;
  getCurrentTour: () => void;
  addCourseToBasket: (courses: Course) => void;
  changeHoveredGroup: (group: Group | null) => void;
  changeGroupInBasket: (group: any, courseId: number) => void;
  restoreGroupInBasket: (restoreGroup: Group, courseId: number) => void;
  deleteFromBasket: (id: number) => void;
  saveBasket: (userID: string) => Promise<void>;
  changeStudent: (studentId: string) => void;
  selectSchedulerEvents: () => Array<SchedulerEvent>;
  selectHistorySchedulerEvents: () => Array<SchedulerEvent>;
  selectBasketNames: () => Array<string>;
  selectBasketCourses: () => Array<Course>;
  selectBasketCourseGroups: (courseName: string) => { lecture: Group | undefined; classes: Group | undefined };
  selectGroups: () => Array<Group>;
  getNewestStudentTimetable: (studentId: string) => void;
  getStudentTimetablesHistory: (studentId: string) => void;
  changeDataLoading: (isLoading: boolean) => void;
  setHistoryBasketFromHistoryGroups: (groupsIds: Array<number>) => void;
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
  const [historyBasket, setHistoryBasket] = useState<Array<Basket>>([]);
  const [timetableHistory, setTimetableHistory] = useState<Array<TimetableHistory>>([]);
  const [userID, setUserID] = useState('');
  const [hoveredGroup, setHoveredGroup] = useState<Group | undefined | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [tour, setTour] = useState('');
  const [isSavingLoading, setIsSavingLoading] = useState(false);

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
      const { name, symbol } = el;
      if (el.classes) {
        res.push({ ...el.classes, name, symbol});
      }
      if (el.lecture) {
        res.push({ ...el.lecture, name, symbol });
      }
      return res;
    }, [] as Array<SchedulerEvent>);
  };

  const selectHistorySchedulerEvents = () => {
    return historyBasket.reduce((res, el) => {
      const { name } = el;
      if (el.classes) {
        res.push({ ...el.classes, name });
      }
      if (el.lecture) {
        res.push({ ...el.lecture, name });
      }
      return res;
    }, [] as Array<SchedulerEvent>);
  };

  const selectBasketCourseGroups = (courseName: string) => {
    const course = basket.find(({ name }) => name === courseName);
    if (course !== undefined) {
      return { lecture: course.lecture, classes: course.classes };
    } else {
      return { lecture: undefined, classes: undefined };
    }
  };

  const selectGroups = () => {
    const groups = [];
    return (courses as unknown) as Array<Group>;
  };

  const changeHoveredGroup = (group: Group | null) => setHoveredGroup(group);

  const changeDataLoading = (isLoading: boolean) => setIsDataLoading(isLoading);

  const addCourseToBasket = (course: Course) => {
    const courseToBasket: Basket = {
      name: course.name,
      id: course.id,
      symbol: course.symbol,
      classes: course.classes !== undefined ? course.classes[0] : undefined,
      lecture: course.lectures !== undefined ? course.lectures[0] : undefined,
    };
    setBasket([...basket, courseToBasket]);
  };

  const deleteFromBasket = (id: number) => setBasket(basket.filter((course) => course.id !== id));

  const changeStudent = async (studentId: string) => {
    setUserID(studentId);
    setTimeout(() => {
      getNewestStudentTimetable(studentId);
      getStudentTimetablesHistory(studentId);
    }, 100);
  };

  const saveBasket = async (userID: string) => {
    setIsSavingLoading(true);
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
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/commisions/user/${userID}`,
        JSON.stringify(basketIds),
      );
      enqueueSnackbar('Plan zosta?? zapisany', {
        variant: 'success',
        action,
      });
    } catch (e) {
      console.log('error: ', e);
      enqueueSnackbar('Zapisywanie niemo??liwe w czasie bezturowym', {
        variant: 'error',
        action,
      });
    }
    getStudentTimetablesHistory(userID);
    setIsSavingLoading(false);
  };

  const changeGroupInBasket = (choosenGroup: any, courseId: number) => {
    const basketCourse = basket.filter((course) => course.id === courseId)[0];
    if (choosenGroup.lecture && choosenGroup.classes) {
      const prev = choosenGroup.prev === 'lecture' ? choosenGroup.lecture : choosenGroup.classes;
      setBasket(
        basket.map((basket) =>
          basket.id === basketCourse.id
            ? { ...basket, lecture: choosenGroup.lecture, classes: choosenGroup.classes }
            : basket,
        ),
      );
      changeHoveredGroup(prev);
    }
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
      const { data } = await axiosInstance.get<Array<Basket> | ''>(
        `${process.env.REACT_APP_API_URL}/api/v1/commisions/user/schedule`,
      );
      const basket = data === '' ? [] : data;
      setBasket(basket);
    } catch (e) {
      console.log(e);
    }
  };

  const getNewestStudentTimetable = async (studentId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/commisions/user/${studentId}/schedule`,
      );
      const basket = data === '' ? [] : data;

      setBasket(basket);
    } catch (e) {
      console.log(e);
    }
  };

  const getStudentTimetablesHistory = async (studentId: string) => {
    try {
      const { data } = await axiosInstance.get<Array<TimetableHistory> | []>(
        `${process.env.REACT_APP_API_URL}/api/v1/commisions/user/${studentId}?groups=true`,
      );
      setTimetableHistory(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data: courses } = await axiosInstance.get<Array<Course>>(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/all?groups=true&takenPlaces=true`,
      );
      const sortedCourses = courses.sort((a, b) => (a.name > b.name ? 1 : -1));
      setCourses(sortedCourses);
    } catch (e) {
      console.log(e);
    }
  };

  const setHistoryBasketFromHistoryGroups = (groupsIds: Array<number>) => {
    const basket: Array<Basket> = [];
    for (const groupId of groupsIds) {
      for (const course of courses) {
        const { lectures, classes, name, id } = course;
        let basketElement: Basket = { name: name, id: id };
        if (lectures) {
          for (const lecture of lectures) {
            if (groupId === lecture.id) {
              basketElement = { ...basketElement, lecture: lecture };
            }
          }
        }
        if (classes) {
          for (const singleClass of classes) {
            if (groupId === singleClass.id) {
              basketElement = { ...basketElement, classes: singleClass };
            }
          }
        }
        if (basketElement.classes !== undefined || basketElement.lecture !== undefined) {
          basket.push(basketElement);
        }
      }
    }
    setHistoryBasket(basket);
  };

  const getCurrentTour = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/configurator/config/tour`);
      setTour(data.currentTour);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsDataLoading(true);
    setTimeout(() => {
      getCurrentTour();
      fetchCourses();
      getNewestTimetable();
      setIsDataLoading(false);
    }, 600);
  }, []);

  return (
    <coursesContext.Provider
      value={{
        userID,
        courses,
        basket,
        hoveredGroup,
        timetableHistory,
        isDataLoading,
        historyBasket,
        tour,
        isSavingLoading,
        getCurrentTour,
        addCourseToBasket,
        changeHoveredGroup,
        changeGroupInBasket,
        deleteFromBasket,
        restoreGroupInBasket,
        saveBasket,
        selectSchedulerEvents,
        selectHistorySchedulerEvents,
        selectBasketNames,
        selectBasketCourses,
        selectBasketCourseGroups,
        selectGroups,
        getNewestStudentTimetable,
        changeStudent,
        getStudentTimetablesHistory,
        setHistoryBasketFromHistoryGroups,
        changeDataLoading,
      }}
    >
      {children}
    </coursesContext.Provider>
  );
};

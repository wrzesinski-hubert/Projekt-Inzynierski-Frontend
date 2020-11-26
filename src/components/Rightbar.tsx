import React, { useContext } from 'react';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { debounce } from '../utils/index';

const RightbarWrapper = styled.div`
  padding: 15px;
  text-align: center;
  height: 100%;
  width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    border-style: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4b4b4b;
  }
  background-color: white;
  border-radius: 5px;
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.59);
`;
const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #43a047;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  &:hover {
    color: #ffffff;
    box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.24);
  }

  &:active {
    background-color: #54c457;
  }

  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.24);
`;

export const Rightbar = () => {
  const { selectBasketCourses, saveBasket } = useContext(coursesContext)!;

  const basketCourses = selectBasketCourses();
  const handleSave = debounce(() => saveBasket(), 500);

  return (
    <RightbarWrapper>
      <SaveButton onClick={handleSave}>ZAPISZ</SaveButton>
      {basketCourses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </RightbarWrapper>
  );
};

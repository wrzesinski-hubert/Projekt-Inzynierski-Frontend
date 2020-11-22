import React, { useContext } from 'react';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { debounce } from '../utils/index';

const RightbarStyled = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  height: 100%;
  width: 300px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    border-style:none;
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
  background-color: #417cab;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  &:hover {
    color: white;
  }
  box-shadow: 6px 6px 6px -2px rgba(0, 0, 0, 0.59);
`;

export const Rightbar = () => {
  const { selectBasketCourses, saveBasket } = useContext(coursesContext)!;

  const basketCourses = selectBasketCourses();
  const handleSave = debounce(() => saveBasket(), 500);

  return (
    <RightbarStyled>
      <SaveButton onClick={handleSave}>ZAPISZ</SaveButton>
      {basketCourses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </RightbarStyled>
  );
};

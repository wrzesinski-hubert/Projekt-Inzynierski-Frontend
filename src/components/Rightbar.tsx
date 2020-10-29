import React, { useContext } from 'react';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { debounce } from 'lodash';

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
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d4b851;
    border: 1px solid;
  }
`;
const RightbarTextStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #417cab !important;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  background-color: red;
  margin-bottom: 10px;
  &:hover {
    color: white;
  }
  box-shadow: 6px 6px 6px -2px rgba(0, 0, 0, 0.59);
`;

export const Rightbar = () => {
  const { courses, basket, saveBasket } = useContext(coursesContext)!;

  const getBasketGroups = () => {
    const names = basket.map(({ name }) => name);
    return courses.filter(({ name }) => names.includes(name));
  };

  const filteredCourses = getBasketGroups();

  const handleSave = debounce(() => saveBasket(), 500);

  //need to insert student name from db and course maybe based on current time or from db too
  return (
    <RightbarStyled>
      <RightbarTextStyled>
        <SaveButton onClick={handleSave}>ZAPISZ</SaveButton>
      </RightbarTextStyled>
      {filteredCourses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </RightbarStyled>
  );
};

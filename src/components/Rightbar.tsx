import React, { useState, useContext, MouseEvent } from 'react';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';

const RightbarStyled = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  font-family: Lato;
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
  border-bottom: 1px solid;
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(100, 181, 246) !important;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  background-color: red;
  margin-bottom: 10px;
  &:hover {
    color: #d3d3d3;
  }
`;

export const Rightbar = () => {
  const { courses, basket, saveBasket } = useContext(coursesContext)!;

  const getBasketGroups = () => {
    const names = basket.map(({ name }) => name);
    return courses.filter(({ name }) => names.includes(name));
  };

  const filteredCourses = getBasketGroups();

  //need to insert student name from db and course maybe based on current time or from db too
  return (
    <RightbarStyled>
      <RightbarTextStyled>
        <p>
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </p>
        <SaveButton onClick={saveBasket}>SAVE</SaveButton>
      </RightbarTextStyled>
      {filteredCourses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
    </RightbarStyled>
  );
};

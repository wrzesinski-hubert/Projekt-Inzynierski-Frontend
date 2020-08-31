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
  border-bottom: 1px solid;
`;

export const Rightbar = () => {
  const { courses, basket } = useContext(coursesContext)!;

  const getBasketGroups = () => {
    const names = basket.map(({ name }) => name);
    return courses.filter(({ name }) => names.includes(name));
  };

  const filteredCourses = getBasketGroups();

  //need to insert student name from db and course maybe based on current time or from db too
  return (
    <RightbarStyled>
      <RightbarTextStyled>
        Hubert Wrzesiński<br></br>
        Semestr zimowy 2020/2021
      </RightbarTextStyled>
      {filteredCourses.map((course, index) => (
        <CourseCard
          course={course}
          key={index}
        />
      ))}
    </RightbarStyled>
  );
};

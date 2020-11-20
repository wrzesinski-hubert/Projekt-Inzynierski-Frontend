import React, { useState, useContext, useEffect, MouseEvent, forwardRef } from 'react';
import { coursesContext } from '../contexts/CoursesProvider';
import { Course } from '../types';
import styled from 'styled-components';



const DropdownContainer = styled.div`
  position: relative;
  z-index: 99999999;
  max-height: 420px;
  border-radius: 3px;
  overflow-y: auto;
  box-shadow: 0.05em 0.2em 0.6em rgba(0, 0, 0, 0.2);
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
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
    background-color: black;
    border: 1px solid;
  }
`;

const CourseContainer = styled.div`
  padding: 5px;
  padding-left: 20px;
  background-color: #f2f4f7;
  font-size: 18px;
  font-weight: 500;
  scroll-snap-align: end;
  :hover {
    background-color: #eceef4;
    cursor: pointer;
  }
`;

interface DropdownProps {
  open: boolean;
  input: string;
  handleCloseDropdown: () => void;
}

export const Dropdown = forwardRef(({ open, input, handleCloseDropdown }: DropdownProps, ref: any) => {
  //courses - choosenCourses
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  const { courses, basket, addToBasket } = useContext(coursesContext)!;

  const sortedCourses = courses.sort((a, b) => (a.name > b.name ? 1 : -1));

  useEffect(() => {
    console.log('wut');
  }, [open, input, handleCloseDropdown]);

  useEffect(() => {
    console.log('input is: ', input);
  }, [input]);

  useEffect(() => {
    console.log('is open: ', open);
  }, [open]);

  useEffect(() => {
    const filterCourses = (input: string) => {
      const choosenCoursesNames = basket.map(({ name }) => name.trim());
      const filteredCourses = sortedCourses.filter(
        ({ name }) =>
          name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              input
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, ''),
            ) && !choosenCoursesNames.includes(name),
      );
      setFilteredCourses(filteredCourses);
    };
    console.log("filtering courses");
    filterCourses(input);
  }, [open, input, basket]);

  const onCourseClick = async (event: MouseEvent) => {
    const target = event.currentTarget;
    if (target.id && target.textContent) {
      const course = filteredCourses.find(({ id }) => id.toString() === target.id)!;
      console.log('added course is');
      console.log(course);
      addToBasket(course);
      handleCloseDropdown();
    }
  };

  return (
    <DropdownContainer>
      {open && (
        <>
          {filteredCourses.map(({ name, id }, index) => (
            <CourseContainer key={index} id={id.toString()} onClick={onCourseClick}>
              <p>{name} </p>
            </CourseContainer>
          ))}
        </>
      )}
    </DropdownContainer>
  );
});

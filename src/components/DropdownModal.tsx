import React, { useState, useContext, useEffect, MouseEvent, useMemo } from 'react';
import { coursesContext } from '../contexts/CoursesProvider';
import { studentsContext } from '../contexts/StudentsProvider';
import { Course, Student } from '../types';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  z-index: 99999999;
  max-height: 396px;
  border-radius: 3px;
  overflow-y: auto;
  opacity: 0.97;
  box-shadow: 0.05em 0.2em 0.6em rgba(0, 0, 0, 0.2);
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  ::-webkit-scrollbar-track {
    background-color: #f2f4f7;
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    background-color: #f2f4f7;
    width: 5px;
    border-style: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4b4b4b;
  }
`;

const CourseContainer = styled.div`
  padding: 5px;
  padding-left: 20px;
  background-color: #f2f4f7;
  font-size: 16px;
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
  handleSelectedGroupChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectedOption: string;
}

export const DropdownModal = ({
  open,
  input,
  handleCloseDropdown,
  selectedOption,
  handleSelectedGroupChange,
}: DropdownProps) => {
  const { courses, selectBasketNames } = useContext(coursesContext)!;
  const basketNames = useMemo(() => selectBasketNames(), [selectBasketNames]);
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  const onCourseClick = (event: MouseEvent) => {
    const target = event.currentTarget;
    if (target.id && target.textContent) {
      const course = filteredCourses.find(({ id }) => id.toString() === target.id)!;

      handleSelectedGroupChange((course as unknown) as any);
      handleCloseDropdown();
    }
  };

  useEffect(() => {
    const filterCourses = (input: string) => {
      const filteredCourses = courses.filter(
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
            ) && !basketNames.includes(name),
      );
      setFilteredCourses(filteredCourses);
    };
    filterCourses(input);
  }, [basketNames, courses, input]);

  return (
    <DropdownContainer>
      {open && (
        <>
          {
            <div>
              {filteredCourses.map(({ name, id }, index) => (
                <CourseContainer key={index} id={id.toString()} onClick={onCourseClick}>
                  <p>{name} </p>
                </CourseContainer>
              ))}
            </div>
          }
        </>
      )}
    </DropdownContainer>
  );
};

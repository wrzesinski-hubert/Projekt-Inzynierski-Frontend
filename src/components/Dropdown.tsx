import React, { useState, useContext, useEffect, MouseEvent, ChangeEvent } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { coursesContext } from '../contexts/CoursesProvider';
import { Course } from '../types';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    position: absolute;
    left: 280px;
    top: 65px;
    z-index: 99;
    min-width: 70%;
    max-height: 420px;
    border-radius:3px;
    overflow-y: auto;
    box-shadow: 0.05em 0.2em 0.6em rgba(0,0,0,.2);
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
    background-color: #ECEEF4;
    cursor: pointer;
  }
`;

const Input = styled.input`
    background-color: #F1F2F5;
     font-size: 20px;
     height: 100%;
     width: 100%; 
     border: none;
     &:focus {
      outline: none;
     }
     
`

interface DropdownProps {
  clearInput: boolean;
  handleClearInput: () => void;
}

export const Dropdown = ({ clearInput, handleClearInput }: DropdownProps) => {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  //courses - choosenCourses
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  const { courses, basket, addToBasket } = useContext(coursesContext)!;

  useEffect(() => {
    const filterCourses = (input: string) => {
      const choosenCoursesNames = basket.map(({ name }) => name.trim());
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
            ) && !choosenCoursesNames.includes(name),
      );
      setFilteredCourses(filteredCourses);
    };
    filterCourses(input);
  }, [input, open, basket]);

  useEffect(() => {
    clearInput && (setInput(''), handleClearInput());
  }, [clearInput]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

  const handleClick = () => setOpen(true);

  const handleClickAway = () => setOpen(false);

  const onCourseClick = async (event: MouseEvent) => {
    const target = event.currentTarget;
    if (target.id && target.textContent) {
      const course = filteredCourses.find(({ id }) => id.toString() === target.id)!;
      console.log('added course is');
      console.log(course);
      addToBasket(course);
      setOpen(false);
    }
  };

  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
      <>
        <Input
          placeholder="Wyszukaj przedmiot..."
          onChange={handleChange}
          onClick={handleClick}
          value={input}
        />
        {open && (
          <DropdownContainer>
            {filteredCourses.map(({ name, id }, index) => (
              <CourseContainer key={index} id={id.toString()} onClick={onCourseClick}>
                <p>{name} </p>
              </CourseContainer>
            ))}
          </DropdownContainer>
        )}
      </>
    // </ClickAwayListener>
  );
};

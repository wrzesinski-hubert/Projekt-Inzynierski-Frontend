import React, { useState, useContext, useEffect, MouseEvent, ChangeEvent } from 'react';
import { Input } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { coursesContext } from '../contexts/CoursesProvider';
import { Course } from '../types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const DropdownContainer = styled.div`
  max-height: 420px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  z-index: 100;
  position: relative;
  border-radius: 0px 0px 0px 15px;
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

const CourseContainer = styled.div`
  position: relative;
  z-index: 10;
  padding: 5px;
  padding-left: 20px;
  background-color: #e6c759;
  font-size: 18px;
  font-family: Lato;
  scroll-snap-align: end;
  border-bottom: 1px solid;
  :hover {
    background-color: #d4b851;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  topbarInput: {
    marginTop: '8px',
    width: '100%',
  },
});

interface DropdownProps {
  clearInput: boolean;
  handleClearInput: () => void;
}

export const Dropdown = ({ clearInput, handleClearInput }: DropdownProps) => {
  const classes = useStyles();

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
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Input
          placeholder="Wyszukaj..."
          inputProps={{ 'aria-label': 'description' }}
          className={classes.topbarInput}
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
      </div>
    </ClickAwayListener>
  );
};

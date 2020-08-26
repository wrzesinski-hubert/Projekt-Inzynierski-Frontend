import React, { useState, useContext, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { coursesContext } from '../contexts/CoursesProvider';
import { Course, Basket } from '../types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const CourseStyled = styled.div`
  position: relative;
  z-index: 10;
  padding: 5px;
  padding-left: 20px;
  background-color: #e6c759;
  font-size: 18px;
  font-family: Lato;
  :hover {
    background-color: #d4b851;
    cursor: pointer;
  }
`;

const DropdownStyled = styled.div`
  max-height: 400px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
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

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState<string>('');

  //courses - choosenCourses
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  const { courses, basket, addToBasket } = useContext(coursesContext)!;

  useEffect(() => {
    const filterCourses = (input: string) => {
      const choosenCoursesNames = basket.map(({ name }) => name.trim());
      const filteredCourses = courses.filter(
        ({ name }) => name.toLowerCase().includes(input.toLowerCase()) && !choosenCoursesNames.includes(name),
      );
      setFilteredCourses(filteredCourses);
    };
    filterCourses(input);
  }, [input, open, basket]);

  useEffect(() => {
    if (clearInput) {
      setInput('');
      handleClearInput();
    }
  }, [clearInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

  const handleClick = () => setOpen(true);

  const handleClickAway = () => setOpen(false);

  const onCourseClick = async (event: MouseEvent) => {
    const target = event.currentTarget;
    if (target.id && target.textContent) {
      const id = target.id;
      const name = target.textContent;

      //porozmawiać z Filipem, żeby odrobinę przerobił endpoint
      const course: Basket = { name: name.trim(), id: parseInt(id), lecture: null, classes: null };

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
          <DropdownStyled>
            {filteredCourses.map(({ name, id }, index) => (
              <CourseStyled key={index} id={id.toString()} onClick={onCourseClick}>
                <p>{name} </p>
              </CourseStyled>
            ))}
          </DropdownStyled>
        )}
      </div>
    </ClickAwayListener>
  );
};
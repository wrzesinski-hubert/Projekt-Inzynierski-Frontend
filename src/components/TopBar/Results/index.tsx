import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { coursesContext } from '../../../contexts/CoursesProvider';
import { Course } from '../../../types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

interface courseData {
  name: string;
  id: number;
}

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

const Dropdown = styled.div`
  max-height: 400px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const useStyles = makeStyles({
  topbarInput: {
    marginTop:"8px",
    width: '100%',
  },
});

export const Results: React.FC = () => {
  const classes = useStyles();
  const [input, setInput] = useState<string>('');
  const [coursesData, setcoursesData] = useState<Array<courseData>>([]);
  const [filteredcoursesData, setFilteredcoursesData] = useState<Array<courseData>>([]);
  const [open, setOpen] = React.useState(false);

  const { courses, addCourse } = useContext(coursesContext)!;

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(`http://localhost:1285/getCourses`);
      const coursesData = results.data.map((result: { id: number; name: string }) => ({
        id: result.id,
        name: result.name,
      }));

      setcoursesData(coursesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const names = courses.map((course) => course.name);
    const filtercourses = (value: string) => {
      let filteredcourses = coursesData.filter(
        (course) => course.name.toLowerCase().includes(value.toLowerCase()) && !names.includes(course.name),
      );
      setFilteredcoursesData(filteredcourses);
    };
    filtercourses(input);
  }, [input, open]);

  const getGroupsByCourseId = async (id: string) => {
    const { data } = await axios.get(`http://localhost:1285/getCourseGroups?id=${id}`);
    return data;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const onCourseClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (target.id && target.textContent) {
      const id = target.id;
      const name = target.textContent;
      const groups = await getGroupsByCourseId(id);
      const course: Course = {
        name: name,
        id: parseInt(id),
        groups: groups,
      };
      addCourse(course);
      setOpen(false);
    }

    // let groups: Array<Group> = [];
    // let course = { groups: groups } as course;
    // course.id = result[0].course.id;
    // course.name = result[0].course.name;
    // for (let i = 0; i < result.length; i++) {
    //   let group = {} as Group;
    //   group.id = result[i].id;
    //   group.day = result[i].day;
    //   group.time = result[i].time;
    //   group.courser = result[i].courser.title + ' ' + result[i].courser.name + ' ' + result[i].courser.surname;
    //   group.room = result[i].room.trim();
    //   course.groups.push(group);
    // }
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
        {open ? (
          <Dropdown>
            {filteredcoursesData.map((course, index) => (
              <CourseStyled key={index} id={String(course.id)} onClick={onCourseClick}>
                <p>{course.name} </p>
              </CourseStyled>
            ))}
          </Dropdown>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

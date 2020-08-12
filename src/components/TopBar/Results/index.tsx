import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import './index.scss';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { coursesContext } from '../../../contexts/CoursesProvider';
import { Course, Group } from '../../../types';

interface courseData {
  name: string;
  id: number;
}

export const Results: React.FC = () => {
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
          className="top-bar__input-field"
          onChange={handleChange}
          onClick={handleClick}
          value={input}
        />
        {open ? (
          <div className="dropdown">
            {filteredcoursesData.map((course, index) => (
              <div className="course" key={index} id={String(course.id)} onClick={onCourseClick}>
                <p>{course.name} </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

import React, { useContext, MouseEvent } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '../assets/expand.png';
import { Course, Group } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

interface ClassExandIconProps {
  isSelected: boolean;
}

const CourseStyled = styled.div`
  display: flex;
  min-height: 50px;
  background-color: rgb(100, 181, 246) !important;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  align-items: stretch;
`;

const CourseNameStyled = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ClassGroupStyled = styled.div`
  padding-top: 1px;
  padding-bottom: 1px;
  :hover {
    cursor: pointer;
    transition: 1s;
    background-color: #8bc8fb;
  }
`;

const ClassExandIconStyled = styled.img<ClassExandIconProps>`
  margin-top: 5px;
  width: 20px;
  transition: 0.2s;
  transform: ${(props) => (props.isSelected ? 'scaleY(-1);' : 'scaleY(1);')};
`;

const useStyles = makeStyles({
  expanded: {
    maxHeight: '244px',
    overflowY: 'auto',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(1,0,0,0.1)',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#d4b851',
      outline: '1px solid slategrey',
    },
  },
});

interface CourseCardProps {
  onCardClick: (event: MouseEvent) => void;
  course: Course;
  id: string;
  isSelected: boolean;
}

export const CourseCard = ({ onCardClick, course, id, isSelected }: CourseCardProps) => {
  const classes = useStyles();

  const { addChoosenGroup, choosenCourses } = useContext(coursesContext)!;

  const onGroupClick = (group: Group) => addChoosenGroup(group);

  return (
    <CourseStyled onClick={onCardClick} id={id}>
      <CourseNameStyled>{course.name}</CourseNameStyled>
      <Collapse className={classes.expanded} in={isSelected} timeout="auto" unmountOnExit>
        {choosenCourses.map((course) => (
          <div key={id}>
            {course.groups.map((group, index) => (
              <ClassGroupStyled key={index} onClick={() => onGroupClick(group)}>
                <p>
                  {group.time} {group.room} <br></br> {group.lecturer}
                </p>
              </ClassGroupStyled>
            ))}
          </div>
        ))}
      </Collapse>
      <div onClick={onCardClick} id={id}>
        <ClassExandIconStyled isSelected={isSelected} alt="expand" src={ExpandIcon} />
      </div>
    </CourseStyled>
  );
};

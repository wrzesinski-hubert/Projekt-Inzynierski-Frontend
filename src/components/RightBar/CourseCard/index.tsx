import React, { useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from './expand.png';
import { Course, Group } from '../../../types/index';
import { coursesContext } from '../../../contexts/CoursesProvider';
import { group } from 'console';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

interface CourseCardProps {
  onGroupMouseOver: (id: number, name: string) => void;
  onCardClick: (e: React.MouseEvent) => void;
  course: Course;
  id: string;
  isSelected: boolean;
}

interface ClassExandIconProps {
  isSelected: boolean;
}


const ClassStyled = styled.div`
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

const ClassNameStyled = styled.div`
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
    transform: ${props => props.isSelected ? 'scaleY(-1);' : 'scaleY(1);'};
`

const useStyles = makeStyles({
  expanded: {
    maxHeight: "244px",
    overflowY: "auto",
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(1,0,0,0.1)'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: "10px",
      backgroundColor: '#d4b851',
      outline: '1px solid slategrey'
    }
  }
});

export function CourseCard({ onGroupMouseOver, onCardClick, course, id, isSelected }: CourseCardProps) {
  const classes = useStyles();
  const { addGroup, courses } = useContext(coursesContext)!;

  function onGroupClick(group: Group) {
    addGroup(group);
  }

  return (
    <ClassStyled onClick={onCardClick} id={id}>
      <ClassNameStyled>{course.name}</ClassNameStyled>
      <Collapse className={classes.expanded} in={isSelected} timeout="auto" unmountOnExit>
        {courses.map((course, index) => (
          <>
            {course.groups.map((group, index) => (
              <ClassGroupStyled
                key={index}
                onMouseOver={() => onGroupMouseOver(group.id, course.name)}
                onClick={() => onGroupClick(group)}
              >
                <p>
                  {group.time} {group.room} <br></br> {group.lecturer}
                </p>{' '}
              </ClassGroupStyled>
            ))}
          </>
        ))}
      </Collapse>
      <div onClick={onCardClick} id={id}>
        <ClassExandIconStyled isSelected={isSelected} alt="expand" src={ExpandIcon} />
      </div>
    </ClassStyled>
  );
}

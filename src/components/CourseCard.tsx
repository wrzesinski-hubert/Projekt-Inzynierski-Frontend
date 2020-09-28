import React, { useState, useContext, MouseEvent } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '../assets/expand.png';
import { Course, Group } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

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
  position: relative;
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

const DeleteFromBasketIcon = styled(CloseIcon)`
  width: 20px;
  cursor: pointer;
  position: absolute;
  left: 235px;
  top: -10px;
  &:hover {
    fill: #d3d3d3;
  }
`;

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const [isSelected, setSelected] = useState(false);
  const classes = useStyles();

  const { addGroup, deleteFromBasket } = useContext(coursesContext)!;

  const onGroupClick = (group: Group, id: number) => addGroup(group, id);

  return (
    <CourseStyled>
      <DeleteFromBasketIcon onClick={() => deleteFromBasket(course.id)}></DeleteFromBasketIcon>
      <CourseNameStyled onClick={() => setSelected(!isSelected)}>{course.name}</CourseNameStyled>
      <Collapse className={classes.expanded} in={isSelected} timeout="auto" unmountOnExit>
        {course.groups.map((group, index) => (
          <ClassGroupStyled key={index} onClick={() => onGroupClick(group, course.id)}>
            <p>
              {group.time} {group.room} <br></br> {group.lecturer}
            </p>
          </ClassGroupStyled>
        ))}
      </Collapse>
      <div onClick={() => setSelected(!isSelected)}>
        <ClassExandIconStyled isSelected={isSelected} alt="expand" src={ExpandIcon} />
      </div>
    </CourseStyled>
  );
};

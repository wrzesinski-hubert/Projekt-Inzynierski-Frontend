import React, { useState, useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { Course, Group } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Bin } from '../assets/bin.svg';

const CourseCardWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 40px;
  background-color: rgb(100, 181, 246);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  align-items: stretch;
  box-shadow: 9px 9px 8px -2px rgba(0, 0, 0, 0.59);
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const BinIcon = styled(Bin)`
  width: 20px;
  height: 20px;
  max-width: 20px;
  min-width: 20px;
  cursor: pointer;
  &:hover {
    fill: white;
  }
`;

const CourseName = styled.div`
  padding-left: 3px;
  padding-right: 3px;
  font-size: 16px;
  user-select: none;
`;

const ClassGroupStyled = styled.div`
  position: relative;
  padding-top: 1px;
  padding-bottom: 1px;
  :hover {
    cursor: pointer;
    background-color: #9ed3ff;
  }
  :last-child {
    border-radius: 0 0 10px 10px;
}
`;

interface ExpandIconProps {
  selected: boolean;
}

const ExpandIcon = styled(Expand)<ExpandIconProps>`
  width: 20px;
  height: 20px;
  max-width: 20px;
  min-width: 20px;
  transition: 0.2s;
  transform: ${({ selected }) => (selected ? 'scaleY(-1);' : 'scaleY(1);')};
`;

const TypeClass = styled.div`
  font-size: 12px;
  position: absolute;
  border-radius: 15px;
  background-color: #00506b;
  border: 2px solid white;
  min-width: 45px;
  top: 5px;
  left: 5px;
  color: white;
`;
  
const useStyles = makeStyles({
  expanded: {
    maxHeight: '244px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3em',
      borderStyle:'none',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: '#4b4b4b',
    },
  },
});

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const classes = useStyles();
  const { changeGroupInBasket, deleteFromBasket } = useContext(coursesContext)!;

  const [isSelected, setSelected] = useState(false);

  const groups = [...course.lectures!, ...course.classes!];

  const onGroupClick = (group: Group, id: number) => changeGroupInBasket(group, id);

  return (
    <CourseCardWrapper>
      <TitleWrapper>
        <BinIcon onClick={() => deleteFromBasket(course.id)}></BinIcon>
        <CourseName onClick={() => setSelected(!isSelected)}>{course.name}</CourseName>
        <ExpandIcon onClick={() => setSelected(!isSelected)} selected={isSelected} />
      </TitleWrapper>
      <Collapse className={classes.expanded} in={isSelected} timeout="auto" unmountOnExit>
        {groups.map((group, index) => (
          <ClassGroupStyled key={index} onClick={() => onGroupClick(group, course.id)}>
            <TypeClass>{group.type === 'CLASS' ? 'Ćw.' : 'Wyk.'}</TypeClass>
            <p>
              {group.time} {group.room} <br></br> {group.lecturer}
            </p>
          </ClassGroupStyled>
        ))}
      </Collapse>
    </CourseCardWrapper>
  );
};

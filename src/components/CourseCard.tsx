import React, { useState, useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { Course, Group, GroupType } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMemo } from 'react';
import { createClassTime } from '../utils';

const CourseCardWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 40px;
  background-color: #b5d2e0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  align-items: stretch;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
`;

const TitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 550;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 2px;
`;

const BinIcon = styled(DeleteIcon)`
  max-width: 30px;
  min-width: 30px;
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
  padding-bottom: 5px;
  transition: background-color 0.4s ease;
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

export const ExpandIcon = styled(Expand)<ExpandIconProps>`
  width: 20px;
  height: 20px;
  max-width: 20px;
  min-width: 20px;
  transition: 0.2s;
  transform: ${({ selected }) => (selected ? 'scaleY(-1);' : 'scaleY(1);')};
`;

type StyledGroupTypeProps = {
  groupType: GroupType;
};

const StyledGroupType = styled.div<StyledGroupTypeProps>`
  font-size: 12px;
  position: absolute;
  border-radius: 15px;
  background-color: ${({ groupType }) => (groupType === 'CLASS' ? '#FFDC61' : '#9ed3ff')};
  border: 2px solid white;
  min-width: 45px;
  top: 5px;
  left: 5px;
  color: black;
`;

const FlexboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type FlexItemProps = {
  justifyContent?: string;
};

const FlexItem = styled.div<FlexItemProps>`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
`;

const useStyles = makeStyles({
  expanded: {
    maxHeight: '244px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3em',
      borderStyle: 'none',
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
  const {
    hoveredGroup,
    changeGroupInBasket,
    deleteFromBasket,
    selectBasketCourseGroups,
    changeHoveredGroup,
  } = useContext(coursesContext)!;
  const [isSelected, setSelected] = useState(true);
  const groups = [...course.lectures!, ...course.classes!];
  const basketCourseGroups = useMemo(() => selectBasketCourseGroups(course.id), []);
  const [previous, setPrevious] = useState(basketCourseGroups);
  // console.log('lecture is: ', courseLecture);
  // console.log('class is: ', courseClasses);
  const onGroupClick = (group: Group, courseId: number) => {
    setPrevious((prev) => (group.type === GroupType.CLASS ? { ...prev, classes: group } : { ...prev, lecture: group }));
    changeGroupInBasket(group, courseId);
  };

  return (
    <CourseCardWrapper>
      <TitleWrapper onClick={() => setSelected(!isSelected)}>
        <BinIcon
          onClick={(e) => {
            e.stopPropagation();
            deleteFromBasket(course.id);
            setSelected(false);
          }}
        ></BinIcon>
        <CourseName onClick={() => setSelected(!isSelected)}>{course.name}</CourseName>
        <ExpandIcon onClick={() => setSelected(!isSelected)} selected={isSelected} />
      </TitleWrapper>
      <Collapse className={classes.expanded} in={isSelected} timeout="auto" unmountOnExit>
        {groups.map((group: Group, index) => (
          <ClassGroupStyled
            key={index}
            onClick={() => onGroupClick(group, course.id)}
            onMouseEnter={() => {
              if (group.type === GroupType.CLASS) {
                changeGroupInBasket(group, course.id);
                // setTimeout(()=> { changeHoveredGroup(courseClasses)},[500])
              }
              if (group.type === GroupType.LECTURE) {
                changeGroupInBasket(group, course.id);
                // setTimeout(()=> { changeHoveredGroup(courseLecture)},[500])
              }
            }}
            onMouseLeave={() => {
              if (hoveredGroup) {
                if (hoveredGroup.type === GroupType.CLASS && previous.classes !== undefined) {
                  changeGroupInBasket(previous.classes, course.id);
                }
                if (hoveredGroup.type === GroupType.LECTURE && previous.lecture !== undefined) {
                  changeGroupInBasket(previous.lecture, course.id);
                }
                changeHoveredGroup(null);
              }
            }}
          >
            <StyledGroupType groupType={group.type}>{group.type === 'CLASS' ? 'ĆW' : 'WYK'}</StyledGroupType>
            <FlexboxWrapper>
              {group.lecturer.replace('UAM', '').length >= 32 ? (
                <FlexItem style={{ justifyContent: 'center', marginLeft: '40px' }}>
                  {group.lecturer.replace('UAM', '')}
                </FlexItem>
              ) : (
                <FlexItem style={{ justifyContent: 'center', marginLeft: '10px' }}>
                  {group.lecturer.replace('UAM', '')}
                </FlexItem>
              )}
              {console.log("abisfdibuafsbuiafsbuifasbuibuiafsbuifasbuifsabuiasf",group)}
              <FlexItem style={{ justifyContent: 'center', margin: '0 50px' }}>
                <span> {createClassTime(group.time)[0] + " - " + createClassTime(group.time)[1]} {/* Sala: {group.room} */}</span>
              </FlexItem>
            </FlexboxWrapper>
          </ClassGroupStyled>
        ))}
      </Collapse>
    </CourseCardWrapper>
  );
};

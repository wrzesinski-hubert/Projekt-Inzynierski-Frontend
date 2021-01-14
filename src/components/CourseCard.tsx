import React, { useState, useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ReactComponent as Expand } from '../assets/expand.svg';
import { Course, Group, GroupType } from '../types/index';
import { coursesContext } from '../contexts/CoursesProvider';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMemo } from 'react';
import { dayMapping } from '../constants';

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

type ClassGroupProps = {
  isSelected: boolean;
};

const ClassGroupStyled = styled.div<ClassGroupProps>`
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: color 0.3s, background-color 0.3s;
  :hover {
    cursor: pointer;
    ${({ isSelected }) =>
      !isSelected &&
      css`
        background-color: rgba(223, 238, 245, 0.308);
      `}
  }
  :last-child {
    border-radius: 0 0 10px 10px;
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: #85aec2;
    `}
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

  const onGroupClick = (group: Group, courseId: number) => {
    setPrevious((prev) => (group.type === GroupType.CLASS ? { ...prev, classes: group, prev:"classes" } : { ...prev, lecture: group,prev:"lecture" }));
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
            isSelected={group.id === previous?.classes?.id || group.id === previous?.lecture?.id ? true : false}
            key={index}
            onClick={() => onGroupClick(group, course.id)}
            onMouseEnter={() => {
              if (group.type === GroupType.CLASS) {
                changeGroupInBasket({classes: group,lecture:previous.lecture}, course.id);
              }
              if (group.type === GroupType.LECTURE) {
                changeGroupInBasket({lecture: group,classes:previous.classes}, course.id);
              }
            }}
            onMouseLeave={() => {
              if (hoveredGroup) {
                changeGroupInBasket(previous, course.id);            
              }
              changeHoveredGroup(null);
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
              <FlexItem style={{ justifyContent: 'center', flexDirection: 'column' }}>
                <div>{dayMapping[group.day]}</div>
                <div>
                  {group.time} - {group.endTime}
                </div>
              </FlexItem>
            </FlexboxWrapper>
          </ClassGroupStyled>
        ))}
      </Collapse>
    </CourseCardWrapper>
  );
};

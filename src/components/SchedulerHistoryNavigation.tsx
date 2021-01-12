import React, { useContext } from 'react';
import styled from 'styled-components';
import { coursesContext } from '../contexts/CoursesProvider';
import RightArrow  from '../assets/right-arrow.svg';
import LeftArrow  from '../assets/left-arrow.svg';

type ButtonProps = {
  direction: 'left' | 'right';
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:-15px;
`;

const StyledButton = styled.div<ButtonProps>`
cursor:pointer;
user-select: none;
margin:10px;
border-radius:5px;
  border-radius: 15px;
  background-color: #9ed3ff;
  border: 2px solid white;
  min-width: 45px;
  color: black;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 12px;
  :hover{
  background-color:#85c8ff;
}
  transition: color 0.3s, background-color 0.3s;
`;

const StyledArrow = styled.img`
width:20px;
`;


const StyledDate = styled.div`
user-select: none;
margin:10px;
border-radius:5px;
  border-radius: 15px;
  background-color: #FFDC61;
  border: 2px solid white;
  min-width: 45px;
  text-align:center;
  color: black;
  padding: 10px;
`;

type SchedulerHistoryNavigationProps = {
  commisionDate?: Date;
  SubstractCurrentTimetable: (value: number) => void;
  AddCurrentTimetable: (value: number) => void;
};

export const SchedulerHistoryNavigation = ({
  commisionDate,
  SubstractCurrentTimetable,
  AddCurrentTimetable,
}: SchedulerHistoryNavigationProps) => {

  return (
    <Wrapper>
      <StyledButton
        direction="left"
        onClick={() => {
          console.log('left clicked');
          SubstractCurrentTimetable(-1);
        }}
      >
        <StyledArrow src={LeftArrow}></StyledArrow>
      </StyledButton>
      <StyledDate>{commisionDate}</StyledDate>
      <StyledButton
        direction="right"
        onClick={() => {
          console.log('right clicked');
          AddCurrentTimetable(1);
        }}
      >
        <StyledArrow src={RightArrow}></StyledArrow>
      </StyledButton>
    </Wrapper>
  );
};

import React, { useContext } from 'react';
import styled from 'styled-components';
import { coursesContext } from '../contexts/CoursesProvider';

type ButtonProps = {
  direction: 'left' | 'right';
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button<ButtonProps>`
  width: 100px;
  height: 100px;
  background-color: ${({ direction }) => (direction === 'left' ? 'red' : 'blue')};
`;

type SchedulerHistoryNavigationProps = {
  commisionDate?: Date;
  changeCurrentTimetable: (value: number) => void;
};

export const SchedulerHistoryNavigation = ({
  commisionDate,
  changeCurrentTimetable,
}: SchedulerHistoryNavigationProps) => {
  return (
    <Wrapper>
      <StyledButton
        direction="left"
        onClick={() => {
          console.log('left clicked');
          changeCurrentTimetable(-1);
        }}
      >
        LEFT
      </StyledButton>
      {commisionDate}
      <StyledButton
        direction="right"
        onClick={() => {
          console.log('right clicked');
          changeCurrentTimetable(1);
        }}
      >
        RIGHT
      </StyledButton>
    </Wrapper>
  );
};

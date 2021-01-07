import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { coursesContext } from '../contexts/CoursesProvider';
import { Scheduler } from './Scheduler';
import { SchedulerHistoryNavigation } from './SchedulerHistoryNavigation';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SchedulerHistory = () => {
  const { timetableHistory, setBasketFromHistoryGroups } = useContext(coursesContext)!;
  const [currentTimetable, setCurrentTimetable] = useState(timetableHistory.length===0 ? 0 : timetableHistory.length - 1);
  let commisionDate = timetableHistory[currentTimetable]?.commisionDate;

  const SubstractCurrentTimetable = (value: number) => {
    if (currentTimetable > 0) {
      setCurrentTimetable((currentTimetable) => currentTimetable + value);
    }
  };

  const AddCurrentTimetable = (value: number) => {
    if (currentTimetable < timetableHistory.length - 1) {
      setCurrentTimetable((currentTimetable) => currentTimetable + value);
    }
  };

  useEffect(() => {
    console.log('current timetable is: ', currentTimetable);
    console.log('23113knkalsdnkasdlk', timetableHistory);
    const timetable = timetableHistory[currentTimetable];
    if (timetable) {
      const { groups } = timetable;
      setBasketFromHistoryGroups(groups);
    }
  }, [currentTimetable,timetableHistory]);

  return (
    <Wrapper>
      {timetableHistory.length > 0 && (
        <SchedulerHistoryNavigation commisionDate={commisionDate} SubstractCurrentTimetable={SubstractCurrentTimetable} AddCurrentTimetable={AddCurrentTimetable} />
      )}
      <Scheduler />
    </Wrapper>
  );
};

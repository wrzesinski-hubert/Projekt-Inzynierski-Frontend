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
  const [currentTimetable, setCurrentTimetable] = useState(timetableHistory === [] ? 0 : timetableHistory.length - 1);
  let commisionDate = undefined;
  if (currentTimetable) {
    commisionDate = timetableHistory[currentTimetable]?.commisionDate;
  }

  const changeCurrentTimetable = (value: number) => {
    setCurrentTimetable((currentTimetable) => currentTimetable + value);
  };

  useEffect(() => {
    console.log('current timetable is: ', currentTimetable);
    const timetable = timetableHistory[currentTimetable];
    if (timetable) {
      const { groups } = timetable;
      setBasketFromHistoryGroups(groups);
    }
  }, [currentTimetable]);

  return (
    <Wrapper>
      {timetableHistory.length > 1 && (
        <SchedulerHistoryNavigation commisionDate={commisionDate} changeCurrentTimetable={changeCurrentTimetable} />
      )}
      <Scheduler />
    </Wrapper>
  );
};

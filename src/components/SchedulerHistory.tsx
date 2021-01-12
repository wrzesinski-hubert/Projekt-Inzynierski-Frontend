import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { coursesContext } from '../contexts/CoursesProvider';
import { SchedulerEvent } from '../types';
import { Scheduler } from './Scheduler';
import { SchedulerHistoryNavigation } from './SchedulerHistoryNavigation';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface SchedulerHistoryProps {
  schedulerHistoryEvents: Array<SchedulerEvent>;
}

export const SchedulerHistory = ({schedulerHistoryEvents}:SchedulerHistoryProps) => {
  const { timetableHistory, setHistoryBasketFromHistoryGroups } = useContext(coursesContext)!;
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
    const timetable = timetableHistory[currentTimetable];
    if (timetable) {
      const { groups } = timetable;
      setHistoryBasketFromHistoryGroups(groups);
    }
    else{
      setHistoryBasketFromHistoryGroups([]);
    }
  }, [currentTimetable,timetableHistory]);

  return (
    <Wrapper>
      {timetableHistory.length > 0 && (
        <SchedulerHistoryNavigation commisionDate={commisionDate} SubstractCurrentTimetable={SubstractCurrentTimetable} AddCurrentTimetable={AddCurrentTimetable} />
      )}
      <Scheduler schedulerEvents={schedulerHistoryEvents}/>
    </Wrapper>
  );
};

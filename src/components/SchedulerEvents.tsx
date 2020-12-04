import React, { useContext } from 'react';
import { SchedulerRow } from './SchedulerRow';
import { coursesContext } from '../contexts/CoursesProvider';
import { selectGroupsToShow } from '../utils/index';
import { ROWS_COUNT } from '../constants';
interface SchedulerEventsProps {
  cellWidth: number;
  cellHeight: number;
}

export const SchedulerEvents = ({ cellWidth, cellHeight }: SchedulerEventsProps) => {
  const { selectSchedulerEvents } = useContext(coursesContext)!;

  const schedulerEvents = selectSchedulerEvents();

  return (
    <div>
      {[...Array(ROWS_COUNT)].map((_, index) => (
        <SchedulerRow
          key={index}
          groups={selectGroupsToShow(schedulerEvents, index)}
          indexRow={index}
          rowTop={
            index === 0
              ? cellHeight / 2
              : index === 1
              ? cellHeight * 4
              : index === 2
              ? cellHeight * 7.5
              : index === 3
              ? cellHeight * 11.5
              : index === 4
              ? cellHeight * 15
              : index === 5
              ? cellHeight * 18.5
              : 0
          }
          cellWidth={cellWidth}
          cellHeight={cellHeight}
        />
      ))}
    </div>
  );
};

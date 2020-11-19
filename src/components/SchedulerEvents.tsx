import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import { SchedulerRow } from './SchedulerRow';
import { coursesContext } from '../contexts/CoursesProvider';
import { Group, Basket } from '../types';

interface SchedulerEventsProps {
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

export const SchedulerEvents = ({ cellTop, cellWidth, cellHeight }: SchedulerEventsProps) => {
  const { basket } = useContext(coursesContext)!;
  console.log(`values: cellTop: ${cellTop}, cellWidth: ${cellWidth}, cellHeight: ${cellHeight}`);
  const [choosenGroupsMappedToEvents, setChoosenGroupsMappedToEvents] = useState<any>([]);

  const groupTimeToEventRowMapping: { [time: string]: number } = {
    '8.15': 0,
    '10.00': 1,
    '11.45': 2,
    '13.45': 3,
    '15.30': 4,
    '17.15': 5,
  };

  useEffect(() => {
    function mapGroupTimeToEventRow(basket: Array<Basket>) {
      const classes = basket.map(({ classes, name }) => ({ ...classes, name })) as Array<Group & { name: string }>;
      const lectures = basket.map(({ lecture, name }) => ({ ...lecture, name })) as Array<Group & { name: string }>;
      const merged = [...classes, ...lectures];

      //deleted if statement, maybe it is needed
      const groupsMapped = merged.map(({ id, day, lecturer, room, time, name, type }) => ({
        id,
        day,
        lecturer,
        room,
        eventRow: groupTimeToEventRowMapping[time],
        name,
        type,
      }));
      setChoosenGroupsMappedToEvents(groupsMapped);
    }
    mapGroupTimeToEventRow(basket);
  }, [basket]);

  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <SchedulerRow
          key={index}
          groups={choosenGroupsMappedToEvents.filter((group: any) => group.eventRow === index)}
          indexRow={index}
          cellTop={
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

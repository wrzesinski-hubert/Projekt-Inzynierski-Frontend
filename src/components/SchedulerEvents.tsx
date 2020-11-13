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

  interface GroupTimeToEventRowMapping {
    [time: string]: number;
  }
  const groupTimeToEventRowMapping: GroupTimeToEventRowMapping = {
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
              ? cellTop + cellHeight/2
              : index === 1
                ? cellTop + (cellHeight + cellHeight * 2 * index)
                : index === 2
                  ? cellTop + (cellHeight + cellHeight * 2 * index - cellHeight / 2)
                  : index === 3
                    ? cellTop + (cellHeight + cellHeight * 2 * index - cellHeight / 2)
                    : index === 4
                      ? cellTop + (cellHeight + cellHeight * 2 * index - cellHeight)
                      : index === 5
                        ? cellTop + (cellHeight + cellHeight * 2 * index - (cellHeight * 3) / 2)
                        : 0
          }
          cellWidth={cellWidth}
          cellHeight={cellHeight}
        />
      ))}
    </div>
  );
};

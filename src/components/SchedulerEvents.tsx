import React, { useContext, useEffect, useState } from 'react';
import { SchedulerRow } from './SchedulerRow';
import { coursesContext } from '../contexts/CoursesProvider';
import { Group, Basket } from '../types';

interface SchedulerEventsProps {
  cellTop: number;
  cellWidth: number;
}

export const SchedulerEvents = ({ cellTop, cellWidth }: SchedulerEventsProps) => {
  const { basket } = useContext(coursesContext)!;

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
      const basketGroups = basket.map(({ classes, lecture }) => ({
        ...classes,
        ...lecture,
      })) as Array<Group>;

      console.log('passed basket');
      console.log(basket);
      console.log(`basketgroups`);
      console.log(basketGroups);
      const groupsMapped = basketGroups.map(({ id, day, lecturer, room, time }) => ({
        id,
        day,
        lecturer,
        room,
        eventRow: groupTimeToEventRowMapping[time],
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
          groups={choosenGroupsMappedToEvents.filter((group: any) => {
            return group.eventRow === index;
          })}
          indexRow={index}
          cellTop={
            index == 3
              ? cellTop + (25 + 80 * index)
              : index < 3
              ? cellTop + (12 + 80 * index)
              : cellTop + (25 + 80 * index)
          }
          cellWidth={cellWidth}
        />
      ))}
    </div>
  );
};

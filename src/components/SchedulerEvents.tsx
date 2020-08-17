import React, { useContext, useEffect, useState } from 'react';
import { SchedulerRow } from './SchedulerRow';
import { coursesContext } from '../contexts/CoursesProvider';
import { Group } from '../types';

interface SchedulerEventsProps {
  cellTop: number;
  cellWidth: number;
}

export const SchedulerEvents = ({ cellTop, cellWidth }: SchedulerEventsProps) => {
  const { choosenGroups } = useContext(coursesContext)!;

  const [choosenGroupsMappedToEvents, setChoosenGroupsMappedToEvents] = useState<any>([]);

  interface GroupTimeToEventRowMapping {
    [time: string]: number;
  }
  //delete later additional mappings
  const groupTimeToEventRowMapping: GroupTimeToEventRowMapping = {
    '08.15': 0,
    '10.00': 1,
    '11.45': 2,
    '13.45': 3,
    '15.30': 4,
    '17.15': 5,
    '10.17': 0,
    '13.55': 1,
  };

  useEffect(() => {
    function mapGroupTimeToEventRow(choosenGroups: Array<Group>) {
      const groupsMapped = choosenGroups.map(({ id, day, lecturer, room, time }) => ({
        id,
        day,
        lecturer,
        room,
        eventRow: groupTimeToEventRowMapping[time],
      }));
      setChoosenGroupsMappedToEvents(groupsMapped);
    }
    mapGroupTimeToEventRow(choosenGroups);
  }, [choosenGroups]);

  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <SchedulerRow
          key={index}
          groups={choosenGroupsMappedToEvents.filter((group: any) => {
            return group.eventRow === index;
          })}
          indexRow={index}
          cellTop={cellTop + (10 + 70 * index)}
          cellWidth={cellWidth}
        />
      ))}
    </div>
  );
};

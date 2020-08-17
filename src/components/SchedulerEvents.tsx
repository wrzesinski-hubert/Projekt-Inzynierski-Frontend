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

  const [groupsMappedToEvents, setGroupsMappedToEvents] = useState<any>([]);

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
    function mapGroupTimeToEventRow(groups: Array<Group>) {
      const groupsMappedToEventsTemp = [];
      for (const group of groups) {
        const groupTime = group.time;
        const eventRow: number = groupTimeToEventRowMapping[groupTime];
        const groupMappedToEvent: any = {
          id: group.id,
          day: group.day,
          eventRow: eventRow,
          lecturer: group.lecturer,
          room: group.room,
        };
        setGroupsMappedToEvents((groupsMappedToEvents: any) => [...groupsMappedToEvents, groupMappedToEvent]);
      }
    }
    function alternative(choosenGroups: Array<Group>) {
      const groupsMapped = choosenGroups.map(({ id, day, lecturer, room, time }) => ({
        id,
        day,
        lecturer,
        room,
        eventRow: groupTimeToEventRowMapping[time],
      }));
      setGroupsMappedToEvents(groupsMapped);
    }
    alternative(choosenGroups);
  }, [choosenGroups]);

  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <SchedulerRow
          key={index}
          groups={groupsMappedToEvents.filter((group: any) => {
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

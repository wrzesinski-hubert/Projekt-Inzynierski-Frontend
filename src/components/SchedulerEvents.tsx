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

  // const groups: Array<Group> = [{ id: "5", day: "4", time: "11.45", courser: "dr Dorota Blinkiewicz", room: "A2-3" },
  // { id: "28", day: "1", time: "13.45", courser: "dr Barbara Kołodziejczak", room: "D-3" },
  // { id: "69", day: "4", time: "15.30", courser: "dr Karol Gierszewski", room: "A2-3" }];

  interface GroupTimeToEventRowMapping {
    [time: string]: number;
  }

  const groupTimeToEventRowMapping: GroupTimeToEventRowMapping = {
    '08.15': 0,
    '10.00': 1,
    '11.45': 2,
    '13.45': 3,
    '15.30': 4,
    '17.15': 5,
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
      function alternative(groups: Array<Group>) {
        const groupsMapped = choosenGroups.map(({ id, day, lecturer, room, time }) => ({
          id,
          day,
          lecturer,
          room,
          eventRow: groupTimeToEventRowMapping[time],
        }));
        setGroupsMappedToEvents(groupsMapped);
      }
    }
    mapGroupTimeToEventRow(choosenGroups);
  }, [choosenGroups]);

  useEffect(() => {
  }, [groupsMappedToEvents]);

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

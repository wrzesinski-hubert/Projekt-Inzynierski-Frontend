import React from 'react';
import { Group } from '../types';
import styled from 'styled-components';

interface SchedulerEventProps {
  eventIndex: number;
  cellTop: number;
  cellWidth: number;
}

const SchedulerEvent = styled.div<SchedulerEventProps>`
  position: absolute;
  top: ${(props) => props.cellTop}px;
  left: ${(props) => props.cellWidth + 5 + props.cellWidth * props.eventIndex}px;
  width: ${(props) => (props.cellWidth * 2) / 3}px;
  height: 60px;
  background-color: lightblue;
  z-index: 2;
`;

interface SchedulerRowProps {
  groups: Array<Group>;
  indexRow: number;
  cellTop: number;
  cellWidth: number;
}

export const SchedulerRow = ({ groups, indexRow, cellTop, cellWidth }: SchedulerRowProps) => {
  // console.log(`You passed me these of a groupzzz`);
  // console.log(groups)

  return (
    <>
      {[...Array(5)].map((value, eventIndex) => (
        <SchedulerEvent
          eventIndex={eventIndex}
          cellTop={cellTop}
          cellWidth={cellWidth}
          key={`eventRow${indexRow}eventCol${eventIndex}`}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map((group, index) =>
            group.day === eventIndex ? <div key={index}>{groups[index]?.lecturer}</div> : null,
          )}
        </SchedulerEvent>
      ))}
    </>
  );
};

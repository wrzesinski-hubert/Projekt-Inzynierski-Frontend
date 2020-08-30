import React from 'react';
import { Group } from '../types';
import styled from 'styled-components';

interface SchedulerEventProps {
  eventIndex: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

const SchedulerEvent = styled.div<SchedulerEventProps>`
  position: absolute;
  top: ${({ cellTop }) => cellTop}px;
  left: ${({ cellWidth, eventIndex }) => cellWidth + 5 + cellWidth * eventIndex}px;
  width: ${({ cellWidth }) => (cellWidth * 2.5) / 3}px;
  height: ${({ cellHeight }) => (cellHeight * 2 * 3) / 4}px;
  background-color: lightblue;
  z-index: 2;
`;

interface SchedulerRowProps {
  groups: Array<Group>;
  indexRow: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

export const SchedulerRow = ({ groups, indexRow, cellTop, cellWidth, cellHeight }: SchedulerRowProps) => {
  return (
    <>
      {[...Array(5)].map((_, eventIndex) => (
        <SchedulerEvent
          eventIndex={eventIndex}
          cellTop={cellTop}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          key={eventIndex}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map((group, index) => group.day === eventIndex && <div key={index}>{groups[index]?.lecturer}</div>)}
        </SchedulerEvent>
      ))}
    </>
  );
};

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
  height: 69px;
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


  return (
    <>
      {[...Array(5)].map((_, eventIndex) => (
        <SchedulerEvent
          eventIndex={eventIndex}
          cellTop={cellTop}
          cellWidth={cellWidth}
          key={eventIndex}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map((group, index) =>
            group.day === eventIndex && <div key={index}>{groups[index]?.lecturer}</div>,
          )}
        </SchedulerEvent>
      ))}
    </>
  );
};

import React, { MouseEvent } from 'react';
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
  z-index: 2;
`;

const ClassDiv = styled.div<SchedulerEventProps>`
  width: ${({ cellWidth }) => (cellWidth * 2.5) / 3}px;
  height: ${({ cellHeight }) => (cellHeight * 2 * 3) / 4}px;
  z-index: 2;
  border-radius: 10px;
  padding-left: 5px;
  background-color: rgb(100, 181, 246);
`;

interface SchedulerRowProps {
  groups: Array<Group & { name: string }>;
  indexRow: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
  onClick: (e: MouseEvent) => void;
}

export const SchedulerRow = ({ groups, indexRow, cellTop, cellWidth, cellHeight, onClick }: SchedulerRowProps) => {
  return (
    <>
      {[...Array(5)].map((_, eventIndex) => (
        <SchedulerEvent
          onClick={onClick}
          eventIndex={eventIndex}
          cellTop={cellTop}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          key={eventIndex}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map(
            (group, index) =>
              group.day === eventIndex && (
                <ClassDiv
                  eventIndex={eventIndex}
                  cellTop={cellTop}
                  cellWidth={cellWidth}
                  cellHeight={cellHeight}
                  id={`eventRow${indexRow}eventCol${eventIndex}`}
                  key={index}
                >
                  {groups[index].name}
                </ClassDiv>
              ),
          )}
        </SchedulerEvent>
      ))}
    </>
  );
};

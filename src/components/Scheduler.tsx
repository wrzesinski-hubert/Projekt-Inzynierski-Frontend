import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useState } from 'react';
import { SchedulerEvents } from './SchedulerEvents';
import { days, hours } from '../constants/index';
import styled from 'styled-components/macro';

const SchedulerWrapper = styled.div`
  border-collapse: collapse;
  flex-grow: 1;
`;

const TableBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
`;

const TableHead = styled.div`
  display: flex;
  width: 100%;
`;

interface TableCellProps {
  height: number;
}

const TableCell = styled.div<TableCellProps>`
  height: ${({ height }) => height}px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 24px;
`;

const T = styled.table`
  width: 100%;
  height: 100%;
`;

export const Scheduler = () => {
  const [currentEventsIds, setCurrentEventsIds] = useState<Array<string>>([]);
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellTop, setCellTop] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    console.log(cellTop);
  }, [cellTop]);

  useEffect(() => {
    const handleResize = () => {
      if (cellRef.current && wrapperRef.current) {
        setCellWidth(cellRef.current.getBoundingClientRect().width);
        setCellTop(cellRef.current.getBoundingClientRect().top);
        setWrapperHeight(wrapperRef.current.getBoundingClientRect().height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const displayEvents = () => {
      currentEventsIds.map((eventId: string) => {
        const event = document.getElementById(eventId);
        if (event) {
          event.style.backgroundColor = 'blue';
        }
      });
    };
    displayEvents();
  }, [currentEventsIds]);

  const handleClick = (e: React.MouseEvent) => {
    const cellId = e.currentTarget.id;
    // const column = cellId.slice(0, 9);
    // const row = cellId.slice(1);
    //const eventId = `eventCol${column}eventRow${Math.floor(parseInt(row) / 2)}`;
    console.log(currentEventsIds)
    setCurrentEventsIds((currentEventsIds) => [...currentEventsIds, cellId]);
  };

  return (
    <>
      <SchedulerWrapper ref={wrapperRef}>
        <TableHead>
          {days.map((day, index) => (
            <TableCell height={wrapperHeight / 13} key={index} ref={cellRef}>
              {day}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {hours.map((hour, indexRow) => (
            <TableRow key={indexRow}>
              {[hour, '', '', '', '', ''].map((value, indexCell) =>
                indexRow === 0 && indexCell === 1 ? (
                  <TableCell height={wrapperHeight / 13} key={`${indexRow}${indexCell}`}></TableCell>
                ) : (
                  <TableCell height={wrapperHeight / 13} key={`${indexRow}${indexCell}`}>
                    {value}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
        <SchedulerEvents onClick={handleClick} cellTop={cellTop} cellWidth={cellWidth} cellHeight={wrapperHeight / 13}/>
      </SchedulerWrapper>
    </>
  );
};

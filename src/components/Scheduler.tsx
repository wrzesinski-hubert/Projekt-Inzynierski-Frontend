import React, { useEffect, MouseEvent, useRef } from 'react';
import { useState } from 'react';
import { SchedulerEvents } from './SchedulerEvents';
import { days, hours } from '../constants/index';
import styled from 'styled-components/macro';

const SchedulerWrapper = styled.div`
  border-collapse: collapse;
  flex: 1;
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
  isHourColumn?: boolean;
}

const TableCell = styled.div<TableCellProps>`
  height: ${({ height }) => height}px;
  /* border: ${({ isHourColumn }) => !isHourColumn && '1px solid #ddd'}; */
  border-width: ${({ isHourColumn }) => !isHourColumn && '1px'};
  border-style: ${({ isHourColumn }) => !isHourColumn && 'solid dotted dotted dotted'};
  /* border-bottom: ${({ isHourColumn }) => !isHourColumn && '1px dotted #ddd'}; */
  margin-top: ${({ isHourColumn, height }) => isHourColumn ? -(height / 2) : 0}px;
  display: flex;
  align-items: center;
  justify-content: ${({ isHourColumn }) => isHourColumn ? 'flex-end' : 'center'};
  flex: ${({ isHourColumn }) => isHourColumn ? '1' : '5'};
  margin-right: ${({ isHourColumn }) => isHourColumn ? '10px' : '0px'};
  font-size:  0.75vw;
  user-select: none;
  border-collapse:collapse; 
`;


export const Scheduler = () => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellTop, setCellTop] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);

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

  return (
    <>
      <SchedulerWrapper ref={wrapperRef}>
        <TableHead>
          {days.map((day, indexCell) =>
            indexCell === 0 ? (
              <TableCell height={wrapperHeight / 26} isHourColumn={true} key={indexCell} ref={cellRef}>
                {day}
              </TableCell>
            ) : (
                <TableCell height={wrapperHeight / 26} key={indexCell} ref={cellRef}>
                  {day}
                </TableCell>
              ),
          )}
        </TableHead>
        <TableBody>
          {hours.map((hour, indexRow) => (
            <TableRow key={indexRow}>
              {[hour, '', '', '', '', ''].map((value, indexCell) =>
                indexCell === 0 ? (
                  <TableCell height={wrapperHeight / 26} isHourColumn={true} key={`${indexRow}${indexCell}`}>
                    {value}
                  </TableCell>
                ) : (
                    <TableCell height={wrapperHeight / 26} key={`${indexRow}${indexCell}`}>
                      {value}
                    </TableCell>
                  ),
              )}
            </TableRow>
          ))}
        </TableBody>
        <SchedulerEvents cellTop={cellTop} cellWidth={cellWidth} cellHeight={wrapperHeight / 26} />
      </SchedulerWrapper>
    </>
  );
};

import React, { useLayoutEffect, useRef } from 'react';
import { useState } from 'react';
import { SchedulerEvents } from './SchedulerEvents';
import { days, hours } from '../constants/index';
import styled from 'styled-components/macro';

const SchedulerWrapper = styled.div`
  border-collapse: collapse;
  flex: 1;
  background-color: white;
  padding: 10px 40px 25px 10px;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.59);
`;

const TableBody = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100% * 25 / 26);
`;

const TableRow = styled.div`
  display: flex;
  height: 100%;
`;

const TableHead = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% / 26);
`;

interface TableCellProps {
  cellHeight?: number;
  isHourColumn?: boolean;
}

const TableCell = styled.div<TableCellProps>`
  border-width: ${({ isHourColumn }) => !isHourColumn && '1px'};
  border-style: ${({ isHourColumn }) => !isHourColumn && 'none solid dotted none'};
  border-color: rgb(235, 235, 235);
  display: flex;
  align-items: center;
  justify-content: ${({ isHourColumn }) => (isHourColumn ? 'flex-end' : 'center')};
  flex: ${({ isHourColumn }) => (isHourColumn ? '1' : '5')};
  margin-right: ${({ isHourColumn }) => (isHourColumn ? '10px' : '0px')};
  margin-top: ${({ isHourColumn, cellHeight }) => (isHourColumn ? `-${cellHeight}px` : '0px')};
  font-size: 0.75vw;
  user-select: none;
  border-collapse: collapse;
  :nth-child(2) {
    border-left: 1px solid rgb(235, 235, 235);
  }
  font-weight: bold;
`;

export const Scheduler = () => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (cellRef.current) {
        setCellWidth(cellRef.current.getBoundingClientRect().width);
        setCellHeight(cellRef.current.getBoundingClientRect().height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SchedulerWrapper>
      <TableHead>
        {days.map((day, indexCell) =>
          indexCell === 0 ? (
            <TableCell isHourColumn={true} key={indexCell}>
              {day}
            </TableCell>
          ) : (
            <TableCell style={{ borderStyle: 'none none solid none' }} key={indexCell}>
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
                <TableCell isHourColumn={true} cellHeight={cellHeight} key={`${indexRow}${indexCell}`}>
                  {value}
                </TableCell>
              ) : indexRow === 0 && indexCell === 1 ? (
                <TableCell ref={cellRef} key={`${indexRow}${indexCell}`}>
                  {value}
                </TableCell>
              ) : indexRow === 23 ? (
                <TableCell style={{ borderBottom: '1px solid   rgb(235, 235, 235)' }} key={`${indexRow}${indexCell}`}>
                  {value}
                </TableCell>
              ) : indexRow === 5 ? (
                <TableCell style={{ borderBottom: '1px solid  rgb(235, 235, 235)' }} key={`${indexRow}${indexCell}`}>
                  {value}
                </TableCell>
              ) : indexRow % 2 !== 0 ? (
                <TableCell style={{ borderBottom: '1px solid  rgb(235, 235, 235)' }} key={`${indexRow}${indexCell}`}>
                  {value}
                </TableCell>
              ) : (
                <TableCell key={`${indexRow}${indexCell}`}>{value}</TableCell>
              ),
            )}
          </TableRow>
        ))}
        <SchedulerEvents cellWidth={cellWidth} cellHeight={cellHeight} />
      </TableBody>
    </SchedulerWrapper>
  );
};

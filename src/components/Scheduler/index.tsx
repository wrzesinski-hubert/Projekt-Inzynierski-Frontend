import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { SchedulerEvents } from "./SchedulerEvents";
import { days, hours } from "../../constants/index";
import styled from "styled-components";

const SchedulerWrapper = styled.div`
  flex-grow: 3;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableCell = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  flex: 1;
`;

const TableHead = styled.div`
  display: flex;
  width: 100%;
`;

const TableHeadCell = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  flex: 1;
`;

export const Scheduler = () => {
  const [currentEventsIds, setCurrentEventsIds] = useState<Array<string>>([]);
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellTop, setCellTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (cellRef.current) {
        setCellWidth(cellRef.current.getBoundingClientRect().width);
        setCellTop(cellRef.current.getBoundingClientRect().top);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const displayEvents = () => {
      currentEventsIds.map((eventId: string) => {
        const event = document.getElementById(eventId);
        if (event) {
          event.style.display = "block";
        }
      });
    };
    displayEvents();
  }, [currentEventsIds]);

  // const handleClick = (e: React.MouseEvent) => {
  //   const cellId = e.currentTarget.id;
  //   const column = cellId.slice(0, 1);
  //   const row = cellId.slice(1);
  //   const eventId = `eventCol${column}eventRow${Math.floor(parseInt(row) / 2)}`;

  //   setCurrentEventsIds((currentEventsIds) => [...currentEventsIds, eventId]);
  // };

  return (
    <>
      <SchedulerWrapper>
        <TableHead>
          {days.map((day, index) => (
            <TableHeadCell key={index}>{day}</TableHeadCell>
          ))}
        </TableHead>
        <TableBody>
          {hours.map((hour, indexRow) => (
            <TableRow key={indexRow}>
              {[hour, "", "", "", "", ""].map((value, indexCell) =>
                indexRow === 0 && indexCell === 1 ? (
                  <TableCell
                    key={`${indexRow}${indexCell}`}
                    ref={cellRef}
                  ></TableCell>
                ) : (
                  <TableCell key={`${indexRow}${indexCell}`}>{value}</TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
        <SchedulerEvents cellTop={cellTop} cellWidth={cellWidth} />
      </SchedulerWrapper>
    </>
  );
};

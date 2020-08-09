import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./index.scss";
import { SchedulerEvents } from "./SchedulerEvents";
const days = ["", "poniedziałek", "wtorek", "środa", "czwartek", "piątek"];

const hours = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

let events: Array<number> = [];
for (let i = 0; i < hours.length / 2; i++) {
  events.push(i);
}

let center: "center" = "center";
let row: "row" = "row";
let column: "column" = "column";
// const collapse: "collapse" = "collapse";
const tbodyStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: column,
};

const rowStyles = {
  display: "flex",
  flexDirection: row,
};

const cellStyles = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: center,
  flex: 1,
};

const theadStyles = {
  display: "flex",
  width: "100%",
};

// const scheduler = {
//   marginTop: "20px",
//   borderCollapse: collapse,
// };

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
      <div className="scheduler">
        <div style={theadStyles}>
          {days.map((day, index) => (
            <div className="th" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div style={tbodyStyles}>
          {hours.map((hour, indexRow) => (
            <div key={indexRow} style={rowStyles}>
              {[hour, "", "", "", "", ""].map((value, indexCell) =>
                indexRow === 0 && indexCell === 1 ? (
                  <div key={`${indexRow}${indexCell}`}  ref={cellRef} style={cellStyles}></div>
                ) : (
                  <div key={`${indexRow}${indexCell}`} style={cellStyles}>{value}</div>
                )
              )}
            </div>
          ))}
        </div>
        <SchedulerEvents cellTop={cellTop} cellWidth={cellWidth} />
      </div>
    </>
  );
};

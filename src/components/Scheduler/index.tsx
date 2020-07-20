import React, { useEffect } from "react";
import { useState } from "react";
import "./index.scss";
import { SchedulerEvent } from "./SchedulerEvent";
import { Column } from "./Column";
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
  "20:00",
  "21:00",
];

let events: Array<number> = [];
for (let i = 0; i < hours.length / 2; i++) {
  events.push(i);
}

let terms = ["Zawsze", "jest pora", "na kurde", "lody", "koral"];

export const Scheduler = () => {
  const [currentEventsIds, setCurrentEventsIds] = useState<Array<string>>([]);
  useEffect(() => {
    const displayEvents = () => {
      currentEventsIds.map((eventId: string) => {
        const event = document.getElementById(eventId);
        event!.style.display = "block";
      });
    };
    displayEvents();
  }, [currentEventsIds]);

  const handleClick = (e: React.MouseEvent) => {
    const cellId = e.currentTarget.id;
    const column = cellId.slice(0, 1);
    const row = cellId.slice(1);
    const eventId = `eventCol${column}eventRow${Math.floor(parseInt(row) / 2)}`;

    setCurrentEventsIds((currentEventsIds) => [...currentEventsIds, eventId]);
  };

  return (
    <>
      <div className="scheduler">
        <div className="thead">
          {days.map((day, index) => (
            <div className="th" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="tbody">
          <Column hours={hours}  isEventable={false}/>
          {terms.map((_, colIndex) => (
            <Column hours={hours} handleClick={handleClick} colIndex={colIndex} isEventable={true} >
              <SchedulerEvent events={events} colIndex={colIndex} />
            </Column>
          ))}
        </div>
        

      </div>
    </>
  );
};

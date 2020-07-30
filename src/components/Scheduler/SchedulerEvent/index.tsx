import React from "react";

interface SchedulerEventProps {
  events: Array<number>;
  colIndex: number;
}

export const SchedulerEvent = ({ events, colIndex }: SchedulerEventProps) => {
  const handleEventClick = (e: React.MouseEvent) => {
    const eventDiv = e.target as HTMLDivElement;
    eventDiv.style.backgroundColor = "#1547C5";
  };

  return (
    <>
      {events.map((_, index) => (
        <div
          id={`eventCol${colIndex}eventRow${index}`}
          style={{
            position: "absolute",
            top: 80 * index + 10,
            left: 5,
            backgroundColor: "#839FE6",
            color: "white",
            borderRadius: 5,
            width: "80%",
            height: 60,
            display: "none",
          }}
          onClick={handleEventClick}
        >
          :)
        </div>
      ))}
    </>
  );
};

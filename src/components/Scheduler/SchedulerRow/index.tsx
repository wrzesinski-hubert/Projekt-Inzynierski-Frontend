import React from "react";
import { Group } from "../../../businesslogic/types/group";

interface SchedulerRowProps {
  groups: Array<Group>;
  indexRow: number;
  cellTop: number;
  cellWidth: number;
}

export const SchedulerRow = ({
  groups,
  indexRow,
  cellTop,
  cellWidth,
}: SchedulerRowProps) => {
  // const handleEventClick = (e: React.MouseEvent) => {
  //   const eventDiv = e.target as HTMLDivElement;
  //   eventDiv.style.backgroundColor = "#1547C5";
  // };

  const group = {0: {id: 5, day: 4, time: "11.45", lecturer: "dr Dorota Blinkiewicz", room: "A2-3"}}

  return (
    <div>
      {[...Array(5)].map((value, index) => (
        <div
          key = {`eventRow${indexRow}eventCol${index}`} 
          id={`eventRow${indexRow}eventCol${index}`}
          style={{
            position: "absolute",
            top: cellTop,
            left: cellWidth + 5 + cellWidth * index,
            width: (cellWidth * 2) / 3,
            height: 60,
            backgroundColor: "lightblue",
            zIndex: 2,
          }}
        >
          
          {groups.map((value, index) => (
            <div key={index}>{groups[index]?.lecturer}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

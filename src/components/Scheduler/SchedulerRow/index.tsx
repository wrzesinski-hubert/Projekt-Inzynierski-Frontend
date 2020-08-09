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

  console.log(`You passed me these of a groupzzz: ${groups}`)


  return (
    <div>
      {[...Array(5)].map((value, eventIndex) => (
        <div
          key={`eventRow${indexRow}eventCol${eventIndex}`}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
          style={{
            position: "absolute",
            top: cellTop,
            left: cellWidth + 5 + cellWidth * eventIndex,
            width: (cellWidth * 2) / 3,
            height: 60,
            backgroundColor: "lightblue",
            zIndex: 2,
          }}
        >

          {groups.map((group, index) =>
            (
              parseInt(group.day) === eventIndex ? <div key={index}>{groups[index]?.lecturer}</div>
                : null
            ))}
        </div>
      ))}
    </div>
  );
};

import React, { useContext } from "react";
import { SchedulerRow } from "../SchedulerRow";
import { LecturesContext } from "../../../businesslogic/LecturesProvider";

interface SchedulerEventsProps {
  cellTop: number;
  cellWidth: number;
}

export const SchedulerEvents = ({
  cellTop,
  cellWidth,
}: SchedulerEventsProps) => {
//   const handleEventClick = (e: React.MouseEvent) => {
//     const eventDiv = e.target as HTMLDivElement;
//     eventDiv.style.backgroundColor = "#1547C5";
//   };
    const mapGroupToEvent = () => {
        
    }

const { choosenGroups } = useContext(LecturesContext);

  const group = {0: {id: 5, day: 4, time: "11.45", lecturer: "dr Dorota Blinkiewicz", room: "A2-3"}}


  console.log(choosenGroups)
  return (
    <div>
      <SchedulerRow
        groups={choosenGroups}
        indexRow={0}
        cellTop={cellTop + 10}
        cellWidth={cellWidth}
      />
      <SchedulerRow
        groups={[]}
        indexRow={1}
        cellTop={cellTop + 80}
        cellWidth={cellWidth}
      />
      <SchedulerRow
        groups={[]}
        indexRow={2}
        cellTop={cellTop + 150}
        cellWidth={cellWidth}
      />
      <SchedulerRow
        groups={[]}
        indexRow={3}
        cellTop={cellTop + 230}
        cellWidth={cellWidth}
      />
      <SchedulerRow
        groups={[]}
        indexRow={4}
        cellTop={cellTop + 300}
        cellWidth={cellWidth}
      />
      <SchedulerRow
        groups={[]}
        indexRow={5}
        cellTop={cellTop + 370}
        cellWidth={cellWidth}
      />
    </div>
  );
};

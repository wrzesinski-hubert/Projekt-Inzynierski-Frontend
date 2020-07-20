import React from "react";

interface CellProps {
  colIndex: number;
  index: number;
  term?: string;
  handleClick?: (e: React.MouseEvent) => void;
  isEventable?: boolean;
}

export const Cell = ({
  colIndex,
  index,
  term,
  handleClick,
  isEventable,
}: CellProps) => {
  return (
    <div id={`${colIndex} ${index}`} className="td" onClick={handleClick}>
      {isEventable || term}
    </div>
  );
};

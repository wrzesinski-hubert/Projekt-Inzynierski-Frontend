import React from "react";
import { Cell } from "../Cell";

interface ColumnProps {
  hours: Array<string>;
  handleClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  colIndex?: number;
  isEventable?: boolean;
}

export const Column = ({
  hours,
  colIndex,
  isEventable,
  children,
  ...rest
}: ColumnProps) => {
  return (
    <div className="tbody__column">
      {hours.map((hour, index) => (
        <Cell
          {...rest}
          index={index}
          term={hour}
          colIndex={colIndex || 0}
          isEventable={isEventable}
        />
      ))}
      {children}
    </div>
  );
};

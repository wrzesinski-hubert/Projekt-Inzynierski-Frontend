import React, { MouseEvent, useEffect, useState } from 'react';
import { Group, GroupType } from '../types';
import styled from 'styled-components/macro';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      marginLeft: 5,
      textAlign: 'center',
    },
  }),
);

interface SchedulerEventProps {
  eventIndex: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

const SchedulerEvent = styled.div<SchedulerEventProps>`
  position: absolute;
  display: flex;
  top: ${({ cellTop }) => cellTop}px;
  left: ${({ cellWidth, eventIndex }) => cellWidth + 5 + cellWidth * eventIndex}px;
  width: ${({ cellWidth }) => (cellWidth * 2.5) / 3}px;
  height: ${({ cellHeight }) => (cellHeight * 2 * 3) / 4}px;
  z-index: 2;
`;

interface ClassesProps{
  cellWidth: number;
  cellHeight: number;
  groupType: GroupType;
}

const Classes = styled.div<ClassesProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 10px;
  /* background-color: rgb(100, 181, 246); */
  width: ${({ cellWidth }) => (cellWidth * 2.5) / 3}px;
  height: ${({ cellHeight }) => (cellHeight * 2 * 3) / 4}px;
  margin-right: 5px;
  text-align: center;
  background-color:${({groupType})=>groupType === "CLASS" ? "purple" : "red"}
`;

interface SchedulerRowProps {
  groups: Array<Group & { name: string }>;
  indexRow: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

export const SchedulerRow = ({ groups, indexRow, cellTop, cellWidth, cellHeight }: SchedulerRowProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [popoverId, setPopoverId] = useState<string | null>(null);

  console.log("123s"+JSON.stringify(groups));

  //looks weird
  const handlePopoverOpen = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(event.currentTarget.id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverId(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {[...Array(5)].map((_, eventIndex) => (
        <SchedulerEvent
          eventIndex={eventIndex}
          cellTop={cellTop}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          key={eventIndex}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map(
            (group, index) =>
              group.day === eventIndex && (
                <>
                  <Classes
                    groupType={group.type}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    id={`eventRow${indexRow}eventCol${eventIndex}${index}`}
                    key={index}
                    aria-owns={open ? `mouse-over-popover` : undefined}
                    aria-haspopup="true"
                    onMouseEnter={(e) => handlePopoverOpen(e)}
                    onMouseLeave={handlePopoverClose}
                  >
                    <p>
                      {groups[index].name}
                      <br></br>
                      {groups[index].room}
                    </p>
                  </Classes>
                  <Popover
                    id={`mouse-over-popover`}
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={popoverId === `eventRow${indexRow}eventCol${eventIndex}${index}`}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography>
                      <p>{groups[index].name}</p>
                      <p>{groups[index].lecturer}</p>
                      <p>{groups[index].room}</p>
                    </Typography>
                  </Popover>
                </>
              ),
          )}
        </SchedulerEvent>
      ))}
    </>
  );
};

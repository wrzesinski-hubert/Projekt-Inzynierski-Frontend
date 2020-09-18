import React, { MouseEvent } from 'react';
import { Group } from '../types';
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

const Classes = styled.div<SchedulerEventProps>`
  z-index: 2;
  border-radius: 10px;
  padding-left: 5px;
  background-color: rgb(100, 181, 246);
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

  //looks weird
  const handlePopoverOpen = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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
                    eventIndex={eventIndex}
                    cellTop={cellTop}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    id={`eventRow${indexRow}eventCol${eventIndex}`}
                    key={index}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    {groups[index].name}
                  </Classes>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography>I use Popover.</Typography>
                  </Popover>
                </>
              ),
          )}
        </SchedulerEvent>
      ))}
    </>
  );
};

import React, { Fragment, MouseEvent, useState } from 'react';
import { GroupType, SchedulerEvent } from '../types';
import styled from 'styled-components/macro';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MONDAY_TO_FRIDAY } from '../constants';

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

interface SchedulerEventsWrapperProps {
  eventIndex: number;
  rowTop: number;
  cellWidth: number;
  cellHeight: number;
}

const SchedulerEventsWrapper = styled.div<SchedulerEventsWrapperProps>`
  position: absolute;
  display: flex;
  top: ${({ rowTop }) => rowTop}px;
  left: ${({ cellWidth, eventIndex }) => (cellWidth * 1) / 5 + 4 + cellWidth * eventIndex}px;
  width: ${({ cellWidth }) => cellWidth - 10}px;
  height: ${({ cellHeight }) => cellHeight * 3}px;
  z-index: 2;
  padding-left: 10px;
`;

interface SchedulerEventProps {
  cellWidth: number;
  cellHeight: number;
  groupType: GroupType;
}

const StyledSchedulerEvent = styled.div<SchedulerEventProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  font-size: 0.65vw;
  line-height: normal;
  border-radius: 10px;
  height: ${({ cellHeight }) => cellHeight * 3}px;
  width: ${({ cellWidth }) => (cellWidth * 3) / 4}px;
  margin-right: 5px;
  padding: 5px 5px 5px 5px;
  text-align: center;
  background-color: ${({ groupType }) => (groupType === 'CLASS' ? '#FFDC61' : '#9ed3ff')};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
`;

const StyledTypography = styled(Typography)`
  background-color: white;
`;

interface SchedulerRowProps {
  groups: Array<SchedulerEvent>;
  indexRow: number;
  rowTop: number;
  cellWidth: number;
  cellHeight: number;
}

export const SchedulerRow = ({ groups, indexRow, rowTop, cellWidth, cellHeight }: SchedulerRowProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [popoverId, setPopoverId] = useState<string | null>(null);

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
    <div>
      {[...Array(MONDAY_TO_FRIDAY)].map((_, eventIndex) => (
        <SchedulerEventsWrapper
          eventIndex={eventIndex}
          rowTop={rowTop}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          key={eventIndex}
          id={`eventRow${indexRow}eventCol${eventIndex}`}
        >
          {groups.map(
            (group, index) =>
              group.day === eventIndex && (
                <Fragment key={index}>
                  <StyledSchedulerEvent
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
                    <div>
                      <p style={{ fontWeight: 700 }}>{groups[index].name}</p>
                      <p>
                        {groups[index].time[0]} - {groups[index].time[1]}
                      </p>
                    </div>
                  </StyledSchedulerEvent>
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
                    <StyledTypography>
                      <p>{groups[index].name}</p>
                      <p>{groups[index].lecturer}</p>
                      <p>{groups[index].room}</p>
                    </StyledTypography>
                  </Popover>
                </Fragment>
              ),
          )}
        </SchedulerEventsWrapper>
      ))}
    </div>
  );
};

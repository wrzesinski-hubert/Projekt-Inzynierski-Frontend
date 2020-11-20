import React, { MouseEvent, useState } from 'react';
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

interface ClassesWrapperProps {
  eventIndex: number;
  cellTop: number;
  cellWidth: number;
  cellHeight: number;
}

const ClassesWrapper = styled.div<ClassesWrapperProps>`
  position: absolute;
  display: flex;
  top: ${({ cellTop }) => cellTop}px;
  left: ${({ cellWidth, eventIndex }) => (cellWidth * 1) / 5 + 15 + cellWidth * eventIndex}px;
  width: ${({ cellWidth }) => cellWidth - 10}px;
  height: ${({ cellHeight }) => cellHeight * 3}px;
  z-index: 2;
  padding-left: 10px;
`;

interface ClassesProps {
  cellHeight: number;
  groupType: GroupType;
}

const Classes = styled.div<ClassesProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 10px;
  height: ${({ cellHeight }) => cellHeight * 3}px;
  margin-right: 5px;
  text-align: left;
  background-color: ${({ groupType }) => (groupType === 'CLASS' ? '#FFDC61' : '#9ed3ff')};
  box-shadow: 9px 9px 8px -2px rgba(0, 0, 0, 0.59);
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
      {[...Array(5)].map((_, eventIndex) => (
        <ClassesWrapper
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
                    onClick={() => {
                      console.log('group: ', group);
                    }}
                    groupType={group.type}
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
                      <p>{groups[index].room}</p>
                    </div>
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
        </ClassesWrapper>
      ))}
    </div>
  );
};

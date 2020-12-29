import React, { Fragment, MouseEvent, useState, useEffect, useContext } from 'react';
import { GroupType, SchedulerEvent } from '../types';
import styled, { css } from 'styled-components/macro';
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MONDAY_TO_FRIDAY } from '../constants';
import { coursesContext } from '../contexts/CoursesProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      fontSize: '14px',
    },
    paper: {
      padding: '15px 15px 15px 15px',
      textAlign: 'left',
      lineHeight: `1 !important`,
    },
  }),
);

const PopoverSpan = styled.span`
  font-weight: bold;
  margin-right: 2px;
`;

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
  isHovered: boolean;
}

const StyledSchedulerEvent = styled.div<SchedulerEventProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20000;
  font-size: 0.65vw;
  line-height: normal;
  border-radius: 10px;
  height: ${({ cellHeight }) => cellHeight * 3}px;
  width: ${({ cellWidth }) => (cellWidth * 3) / 4}px;
  margin-right: 5px;
  padding: 5px 5px 0 5px;
  text-align: center;
  background-color: ${({ groupType, isHovered }) => {
    if (isHovered) {
      return groupType === 'CLASS' ? '#FFE485' : '#D2EBFF';
    } else {
      return groupType === 'CLASS' ? '#FFDC61' : '#9ed3ff';
    }
  }};
  ${({ isHovered }) =>
    isHovered &&
    css`
      transition: background-color ease-in 0.4s;
    `}
  transition: background-color ease-out 0.4s;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
`;

const threeStyles = () => {
  return css`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 70px;
  `;
};

type BoldParagraphProps = {
  isThree?: boolean;
};

const BoldParagraph = styled.p<BoldParagraphProps>`
  overflow: hidden;
  flex: 3;
  ${({ isThree }) => isThree && threeStyles}
`;

const ClassWrap = styled.div`
  font-weight: 700;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: normal;
`;

const TextWrapper = styled.div`
  flex: 1;
  width: inherit;
  padding: 0 3px 5px 3px;
  display: flex;
  justify-content: space-between;
`;

interface SchedulerRowProps {
  groups: Array<SchedulerEvent>;
  indexRow: number;
  rowTop: number;
  cellWidth: number;
  cellHeight: number;
}

const getGroupsPerDay = (groups: Array<SchedulerEvent>) => {
  const groupsPerDay: any = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const group of groups) {
    groupsPerDay[group.day]++;
  }
  return groupsPerDay;
};

export const SchedulerRow = ({ groups, indexRow, rowTop, cellWidth, cellHeight }: SchedulerRowProps) => {
  const { hoveredGroup } = useContext(coursesContext)!;
  const classes = useStyles();
  const groupsPerDay = getGroupsPerDay(groups);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [popoverId, setPopoverId] = useState<string | null>(null);
  //looks weird
  const handlePopoverOpen = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(event.currentTarget.id);
  };

  const handlePopoverClose = (e: MouseEvent<any>) => {
    console.log('current target:', e.currentTarget);
    console.log(' target:', e.target);
    setPopoverId(null);
    setAnchorEl(null);
    console.log('click awayyy');
  };
  useEffect(() => {
    console.log('anchorEl: ', anchorEl);
  }, [anchorEl]);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
                    aria-describedby={id}
                    isHovered={group.id === hoveredGroup?.id}
                    groupType={group.type}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    id={`eventRow${indexRow}eventCol${eventIndex}${index}`}
                    key={index}
                    aria-owns={open ? `mouse-over-popover` : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handlePopoverOpen(e)}
                  >
                    <ClassWrap>
                      <BoldParagraph isThree={groupsPerDay[group.day] >= 3}>{groups[index].name}</BoldParagraph>
                      {groupsPerDay[group.day] < 3 ? (
                        <TextWrapper>
                          <div>{`${groups[index].time}-${groups[index].endTime}`}</div>
                          <div>
                            {groups[index].takenPlaces}/{groups[index].capacity}
                          </div>
                        </TextWrapper>
                      ) : (
                        <TextWrapper style={{ flexDirection: 'column' }}>
                          <div style={{ alignSelf: 'flex-end' }}>
                            {groups[index].takenPlaces}/{groups[index].capacity}
                          </div>
                        </TextWrapper>
                      )}
                    </ClassWrap>
                  </StyledSchedulerEvent>
                  <Popover
                    id={id}
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
                    <div style={{ display: 'flex', flexDirection: 'column', zIndex: 20000 }} onClick={() => {}}>
                      <p style={{ margin: '7px 0 7px 0', fontWeight: 'bold' }}>{groups[index].name}</p>
                      <p style={{ margin: '2px 0 2px 0' }}>
                        <PopoverSpan>Prowadzący:</PopoverSpan> {groups[index].lecturer}
                      </p>
                      <p style={{ margin: '2px 0 2px 0' }}>
                        <PopoverSpan>Sala zajęć</PopoverSpan>: {groups[index].room}
                      </p>
                      <p style={{ margin: '2px 0 2px 0' }}>
                        <PopoverSpan>Kod przedmiotu: </PopoverSpan>ACB129
                      </p>
                      <p style={{ margin: '2px 0 2px 0' }}>
                        <PopoverSpan>Kod grupy: </PopoverSpan>FVJ753
                      </p>
                      <p style={{ margin: '2px 0 2px 0' }}>
                        <PopoverSpan>Punkty ECTS:</PopoverSpan> 2
                      </p>
                    </div>
                  </Popover>
                </Fragment>
              ),
          )}
        </SchedulerEventsWrapper>
      ))}
    </div>
  );
};

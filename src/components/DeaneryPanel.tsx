import React, { useState, MouseEvent,useContext } from 'react';
import styled from 'styled-components/macro';
import Plan from '../assets/plan.svg';
import History from '../assets/history.svg';
import Statistics from '../assets/statistics.svg';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';
import { SchedulerHistory } from './SchedulerHistory';
import { coursesContext } from '../contexts/CoursesProvider';
import { SchedulerEvent } from '../types';

const LeftSide = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  text-align: center;
  border-radius: 5px;
`;

const Wrap = styled.div`
  display: flex;
  height: calc(100vh - 120px);
  background-color: #eceef4;
  width: 100%;
`;

const Wrapper = styled.div`
  flex: 12;
  display: flex;
  height: calc(100vh - 120px);
  background-color: #eceef4;
`;

interface LeftPanelElement {
  isCurrentTab: boolean;
}

const LeftPanelElement = styled.div<LeftPanelElement>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  //box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
  padding: 20px;
  cursor: pointer;
  box-shadow: ${({ isCurrentTab }) => (isCurrentTab === true ? `inset 0px 0px 11px 0px rgba(0,0,0,0.30)` : '')};
  border-bottom: 1px solid #979797;
  :first-child {
    border-radius: 0px 5px 0px 0px;
  }
  :last-child {
    border-radius: 0px 0px 5px 0px;
  }
`;

const HistoryDiv = styled.div`
  flex: 1;
  display: flex;
  margin-left: 20px;
  border-radius: 5px;
  height: calc(100vh - 120px);
`;

const StatsDiv = styled.div`
  flex: 1;
  display: flex;
  margin-left: 20px;
  border-radius: 5px;
  height: calc(100vh - 120px);
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  margin-left: 10px;
`;

const Text = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 5rem;
  user-select: none;
`;

const Logo = styled.img`
  width: 500px;
  height: 500px;
`;

const Icon = styled.img`
  width: 40px;
  margin: 5px;
`;

interface Deanery {
  schedulerEvents: Array<SchedulerEvent>;
}

export const Deanery = ({ schedulerEvents }: Deanery) => {
  const [currentTab, setCurrentTab] = useState<null | number>(1);
  const { getNewestStudentTimetable,userID } = useContext(coursesContext)!;
  const { selectHistorySchedulerEvents } = useContext(coursesContext)!;
  const schedulerHistoryEvents = selectHistorySchedulerEvents();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setCurrentTab(Number(e.currentTarget.id));
    getNewestStudentTimetable(userID);
  };

  return (
    <Wrap>
      <LeftSide>
        <LeftPanelElement id={'1'} isCurrentTab={currentTab === 1} onClick={handleClick}>
          <Icon alt="profile" src={Plan} />
          Pokaż plan
        </LeftPanelElement>
        <LeftPanelElement id={'2'} isCurrentTab={currentTab === 2} onClick={handleClick}>
          <Icon alt="history" src={History} />
          Historia Zmian
        </LeftPanelElement>
        <LeftPanelElement id={'3'} isCurrentTab={currentTab === 3} onClick={handleClick}>
          <Icon alt="statistics" src={Statistics} />
          Statystyki
        </LeftPanelElement>
      </LeftSide>
      <Wrapper>
        {currentTab === 1 ? (
          <>
            <Scheduler schedulerEvents={schedulerEvents}/>
            <Rightbar />
          </>
        ) : currentTab === 2 ? (
          <SchedulerHistory schedulerHistoryEvents={schedulerHistoryEvents}/>
        ) : currentTab === 3 ? (
          <StatsDiv />
        ) : (
          <LogoWrapper>
            <Logo alt="logo" src="https://plannaplan.pl/img/logo.svg" />
            <Text> plan na plan </Text>
          </LogoWrapper>
        )}
      </Wrapper>
    </Wrap>
  );
};

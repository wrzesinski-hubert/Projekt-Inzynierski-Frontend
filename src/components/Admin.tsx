import React, { useState, MouseEvent} from 'react';
import styled from 'styled-components/macro';
import Plan from '../assets/plan.svg';
import History from '../assets/history.svg';
import Statistics from '../assets/statistics.svg';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';

const LeftSide = styled.div`
  height: 100%;
  display: flex;
  flex:1;
  flex-direction: column;
  background-color: white;
`;

const Wrap = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background-color: #ECEEF4;
`;


const Wrapper = styled.div`
flex:5;
  display: flex;
  height: calc(100vh - 80px);
  background-color: #ECEEF4;
`;

interface LeftPanelElement{
    isCurrentTab:boolean;
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
  box-shadow: ${({isCurrentTab})=>(isCurrentTab === true ? `inset 0px 0px 26px 0px rgba(0,0,0,0.55)` : "")};
  border-bottom:1px solid;
`;
const Icon = styled.img`
  width: 40px;
  margin: 5px;
`;

export const Admin = () => {

    const[currentTab, setCurrentTab] = useState<null|number>(null);

    const handleClick = (e: MouseEvent<HTMLDivElement>)=>{
      setCurrentTab(Number(e.currentTarget.id));
    }

  return (
    <Wrap>
    <LeftSide>
      <LeftPanelElement id={"1"} isCurrentTab={currentTab===1} onClick={handleClick}>
        <Icon alt="profile" src={Plan} />
        Pokaż plan
      </LeftPanelElement>
      <LeftPanelElement id={"2"} isCurrentTab={currentTab===2} onClick={handleClick}>
        <Icon alt="history" src={History} />
        Historia Zmian
      </LeftPanelElement>
      <LeftPanelElement id={"3"} isCurrentTab={currentTab===3} onClick={handleClick}>
        <Icon alt="statistics" src={Statistics} />
        Statystyki
      </LeftPanelElement>
    </LeftSide>
    <Wrapper>
    <Scheduler/>
    <Rightbar/>
    </Wrapper>
    </Wrap>
  );
};

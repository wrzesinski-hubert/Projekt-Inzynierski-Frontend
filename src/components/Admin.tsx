import React, { useState} from 'react';
import styled from 'styled-components/macro';
import Plan from '../assets/plan.svg';
import History from '../assets/history.svg';
import Statistics from '../assets/statistics.svg';

const LeftSide = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

interface LeftPanelElement{
    choose:boolean;
}

const LeftPanelElement = styled.div<LeftPanelElement>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
  padding: 20px;
  cursor: pointer;
  background-color: ${({choose})=>(choose == true ? `blue` : "")};
`;
const Icon = styled.img`
  width: 40px;
  margin: 5px;
`;

export const Admin = () => {

    const[choose, setChoose] = useState(false);

    const handleClick = ()=>{
        setChoose(true);
    }

  return (
    <LeftSide>
      <LeftPanelElement choose={choose} onClick={handleClick}>
        <Icon alt="profile" src={Plan} />
        Pokaż plan
      </LeftPanelElement>
      <LeftPanelElement choose={choose} onClick={handleClick}>
        <Icon alt="history" src={History} />
        Historia Zmian
      </LeftPanelElement>
      <LeftPanelElement choose={choose} onClick={handleClick}>
        <Icon alt="statistics" src={Statistics} />
        Statystyki
      </LeftPanelElement>
    </LeftSide>
  );
};

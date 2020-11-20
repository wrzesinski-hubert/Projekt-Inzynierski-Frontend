import React, { useState, useContext } from 'react';
import Topbar from './Topbar';
import {Admin} from './Admin';
import { Transfer } from './Transfer';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background-color: #ECEEF4;
  padding-top:20px;
  padding-bottom:20px;
`;

export const App = () => {
  const [isOpenTransfer, setOpenTransfer] = useState(false);

  const handleTransfer = () => {
    setOpenTransfer(!isOpenTransfer);
  };

  return (
    <>
      <Topbar handleTransfer={handleTransfer} />
      <Transfer isOpen={isOpenTransfer} handleClose={handleTransfer} />
      <Wrapper>
        {/* <Admin/> */}
        <Scheduler />
        <Rightbar />
      </Wrapper>
    </>
  );
};

import React, { useState } from 'react';
import Topbar from './Topbar';
import { Transfer } from './Transfer';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
<<<<<<< HEAD
  background-color: #eceef4;
  padding-top: 20px;
  padding-bottom: 20px;
=======
  background-color: #ECEEF4;
  padding-top:20px;
  padding-bottom:20px;
  padding-right:20px;
>>>>>>> b687b3c014cabbedb9233d5f33e42d461a04a047
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

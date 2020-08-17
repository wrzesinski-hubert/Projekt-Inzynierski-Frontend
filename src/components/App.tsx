import React, { useState, useContext } from 'react';
import { Topbar } from './Topbar';
import { Transfer } from './Transfer/Transfer';
import { Scheduler } from './Scheduler';
import RightBar from './Rightbar';
import { CASContext } from '../contexts/CASProvider';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export const App = () => {
  const [isOpenTransfer, setOpenTransfer] = useState(false);

  const { logout } = useContext(CASContext)!;

  const handleTransfer = () => {
    setOpenTransfer(!isOpenTransfer);
  };

  return (
    <>
      <Topbar handleTransfer={handleTransfer} handleLogout={logout} />
      <Transfer isOpen={isOpenTransfer} handleClose={handleTransfer} />
      <Wrapper>
        <Scheduler />
        <RightBar />
      </Wrapper>
    </>
  );
};

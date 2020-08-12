import React, { useState, useContext } from 'react';
import TopBar from './components/TopBar/';
import Transfer from './components/Transfer/';
import { Scheduler } from './components/Scheduler';
import RightBar from './components/RightBar';
import { CASContext } from './contexts/CASProvider';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export const App = () => {
  const [isOpenTransfer, setOpenTransfer] = useState(false);

  const { logout } = useContext(CASContext)!;

  const handleCloseTransfer = () => {
    setOpenTransfer(!isOpenTransfer);
  };

  const onLangChange = () => {
    console.log('Language changed');
  };

  const onGroupMouseOver = () => {
    console.log(`On groupmouse over`);
  };

  return (
    <>
      <TopBar handleTransfer={handleCloseTransfer} onLangChange={onLangChange} handleLogout={logout} />
      <Transfer isOpen={isOpenTransfer} handleClose={handleCloseTransfer} />
      <Wrapper>
        <Scheduler />
        <RightBar onGroupMouseOver={onGroupMouseOver} />
      </Wrapper>
    </>
  );
};

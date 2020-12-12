import React, { ElementType, useContext, useState } from 'react';
import Topbar from './Topbar';
import { Transfer } from './Transfer';
import { Admin } from './Admin';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';
import styled from 'styled-components';
import { coursesContext } from '../contexts/CoursesProvider';
import LoadingOverlay from 'react-loading-overlay';
import { SyncLoader } from 'react-spinners';
const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background-color: #eceef4;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
`;

export const App = () => {
  const { isDataLoading } = useContext(coursesContext)!;
  const [isOpenTransfer, setOpenTransfer] = useState(false);

  const handleTransfer = () => {
    setOpenTransfer(!isOpenTransfer);
  };

  const userPrivilige = localStorage.getItem('userPrivilige');

  return (
    <>
      <LoadingOverlay active={isDataLoading} spinner={<SyncLoader />}>
        <Topbar handleTransfer={handleTransfer} />
        <Transfer isOpen={isOpenTransfer} handleClose={handleTransfer} />
        <Wrapper>
          {userPrivilige === 'STUDENT' ? (
            <>
              <Scheduler />
              <Rightbar />
            </>
          ) : (
            <Admin />
          )}
        </Wrapper>
      </LoadingOverlay>
    </>
  );
};

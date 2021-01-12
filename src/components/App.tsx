import React, { useContext, useState } from 'react';
import Topbar from './Topbar';
import { Transfer } from './Transfer';
import { Deanery } from './DeaneryPanel';
import { Scheduler } from './Scheduler';
import { Rightbar } from './Rightbar';
import { Administrator } from './Administrator';
import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay';
import { SyncLoader } from 'react-spinners';
import { CASContext } from '../contexts/CASProvider';
import { coursesContext } from '../contexts/CoursesProvider';
const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background-color: #eceef4;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
`;

export const App = () => {
  const { role } = useContext(CASContext)!;
  const [isOpenTransfer, setOpenTransfer] = useState(false);

  const { selectSchedulerEvents } = useContext(coursesContext)!;
  const schedulerEvents = selectSchedulerEvents();

  const handleTransfer = () => {
    setOpenTransfer(!isOpenTransfer);
  };

  const userPrivilige = localStorage.getItem('userPrivilige');
  return (
    <>
      <LoadingOverlay active={role === undefined} spinner={<SyncLoader />}>
        {userPrivilige !== 'ADMIN' && (
            <>
              <Topbar handleTransfer={handleTransfer} />
              <Transfer isOpen={isOpenTransfer} handleClose={handleTransfer} />
              <Wrapper>
                {userPrivilige === 'STUDENT' && (
                  <>
                    <Scheduler schedulerEvents={schedulerEvents} />
                    <Rightbar />
                  </>
                )}
                {userPrivilige === 'DEANERY' && <Deanery schedulerEvents={schedulerEvents} />}
              </Wrapper>
            </>
          )}
        {userPrivilige === 'ADMIN' && (
            <Administrator></Administrator>
        )}
      </LoadingOverlay>
    </>
  );
};

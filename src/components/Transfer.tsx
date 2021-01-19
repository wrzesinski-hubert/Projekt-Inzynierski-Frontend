import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { FormControl, MenuItem, Select, useControlled, useEventCallback } from '@material-ui/core';
import { axiosInstance } from '../utils/axiosInstance';
import { Group } from '../types';
import { coursesContext } from '../contexts/CoursesProvider';
import { Dropdown } from './Dropdown';
import { DropdownModal } from './DropdownModal';
import { dayMapping } from '../constants';
import TransferIcon from '../assets/switch.svg';

interface TransferProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isTransferOpen: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
});

const TransferStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  min-width: 35%;
  height: 70%;
  padding-top: 40px;
  background: white;
  box-shadow: 0px 0px 0px 4px #006b96;
  margin: 0 auto;
  border-radius: 5px;
  letter-spacing: 0.2ch;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const TransferGiveStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
`;

const TransferReceiveStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
`;

const TransferTextStyled = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const TransferInputStyled = styled.div`
  width: 250px;
  height: 25px;
  padding: 10px;
  font-size: 24px;
  transition-duration: 0.3s;
  input::placeholder {
    color: black;
    font-weight: bold;
    text-align: center;
  }
  text-transform: none;
`;

const SaveWrapper = styled.div`
  margin-top: 40px;
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #43a047;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 150px;
  font-size: 12px;
  letter-spacing: 0.1ch;
  line-height: normal;
  &:hover {
    color: #ffffff;
    box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.24);
  }

  &:active {
    background-color: #54c457;
  }

  text-transform: uppercase;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
`;

const ExchangesWrapper = styled.div`
  flex: 4;
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    border-style: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4b4b4b;
  }
  border-top: 1px solid;
`;

const ExchangesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Exchange = styled.div`
  background-color: #b5d2e0;
  border-radius: 10px;
  width: 280px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const deleteExchange = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/${id}`);
    console.log('delete exchange response: ', response);
  } catch (e) {
    console.log(e);
  }
};

export const Transfer = ({ handleClose, isTransferOpen }: TransferProps) => {
  const { basket, selectBasketCourses } = useContext(coursesContext)!;
  // const basketCourseGroups = useMemo(() => selectBasketCourseGroups(course.name), []);
  const basketCourses = selectBasketCourses();

  const classes = useStyles();
  // const groups = selectGroups();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const [assignmentsClasses, setAssignmentsClasses] = useState<Array<any>>([]);
  const [selectedAssignmentsClasses, setSelectedAssignmentsClasses] = useState<any>('');
  const [groups, setGroups] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>('');
  const [exchanges, setExchanges] = useState<any>(null);
  const [save, setSave] = useState(false);
  // const allGroups
  const handleSelectedAssignmentsGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAssignmentsClasses(1);
  };

  const handleGroupsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as any);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
  const handleShowDropdown = () => setOpen(true);

  const handleCloseDropdown = () => setOpen(false);

useEffect(()=>{
  console.log("ASAJNMENTS",selectedAssignmentsClasses)
},[selectedAssignmentsClasses])


useEffect(()=>{
  console.log("SELEKTET GTUP",selectedGroup)
},[selectedGroup])


  useEffect(() => {
    if (selectedAssignmentsClasses) {
      const allGroups = basketCourses.filter((el) => el.name === selectedAssignmentsClasses.name);
      const allClasses = allGroups[0]?.classes;
      if (allClasses) {
        const filteredClasses = allClasses.filter((el: any) => {
          return el.time !== selectedAssignmentsClasses.time;
        });
        setGroups(filteredClasses);
      }
    }
  }, [selectedAssignmentsClasses]);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/all`);
        setExchanges(data);
      } catch (e) {
        console.log(e);
      }
    };

    const getAssignmentsGroups = async () => {
      try {
        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/commisions/user/assignments`);
        const classes = data.filter((el: any) => el.type === 'CLASS');
        setAssignmentsClasses(classes);
      } catch (e) {
        console.log(e);
      }
    };
    getExchanges();
    getAssignmentsGroups();
  }, [isTransferOpen, save]);

  const createExchange = async (groupsIds: Array<number>) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange`,
        JSON.stringify({ assignment: groupsIds[0], group: groupsIds[1] }),
      );
    } catch (e) {
      console.log(e);
    }
    setSave(!save);
  };

  return (
    <div>
      <Modal
        className={classes.wrapper}
        open={isTransferOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={isTransferOpen}>
          <TransferStyled>
            <InputWrapper>
              <TransferGiveStyled>
                <TransferTextStyled>Oddam</TransferTextStyled>
                <TransferInputStyled>
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="assignments-groups"
                      value={selectedAssignmentsClasses}
                      onChange={handleSelectedAssignmentsGroupChange}
                      placeholder="Wyszukaj..."
                      style={{ width: '200px' }}
                    >
                      {assignmentsClasses.map((el) => {
                        return (
                          <MenuItem
                            key={el.id}
                            value={el}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                            }}
                          >
                            {`${el.name}  `}
                            <br></br>
                            {`(${dayMapping[el.day]} ${el.time} - ${el.endTime})`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </TransferInputStyled>
              </TransferGiveStyled>
              <SaveWrapper>
                {' '}
                <SaveButton
                  onClick={() => {
                    createExchange([selectedAssignmentsClasses.id, selectedGroup.id]);
                  }}
                >
                  Zaproponuj wymianę
                </SaveButton>
              </SaveWrapper>
              <TransferReceiveStyled>
                <TransferTextStyled>Przyjmę</TransferTextStyled>
                <TransferInputStyled>
                  <FormControl disabled={selectedAssignmentsClasses ? false : true}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="assignments-groups"
                      value={selectedGroup}
                      onChange={handleGroupsChange}
                      placeholder="Wyszukaj..."
                      style={{ width: '200px' }}
                    >
                      {groups.map((el: any, index: number) => {
                        return (
                          <MenuItem
                            key={index}
                            value={el}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                            }}
                          >
                            {`${selectedAssignmentsClasses.name}  `}
                            <br></br>
                            {`(${dayMapping[el.day]} ${el.time} - ${el.endTime})`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </TransferInputStyled>
              </TransferReceiveStyled>
            </InputWrapper>

            <ExchangesWrapper>
              {exchanges ? (
                exchanges.map((name: any) => (
                  <ExchangesRow>
                    {' '}
                    <Exchange>
                      {name.ownedAssignment.lecturer} <br></br> {dayMapping[name.ownedAssignment.day]} <br></br>{' '}
                      {name.ownedAssignment.time} - {name.ownedAssignment.endTime}
                    </Exchange>
                    <Icon alt="transfer" src={TransferIcon} />
                    <Exchange>
                      {name.desiredGroup.lecturer} <br></br> {dayMapping[name.desiredGroup.day]} <br></br>{' '}
                      {name.desiredGroup.time} - {name.desiredGroup.endTime}
                    </Exchange>{' '}
                  </ExchangesRow>
                ))
              ) : (
                <div></div>
              )}
            </ExchangesWrapper>
          </TransferStyled>
        </Fade>
      </Modal>
    </div>
  );
};

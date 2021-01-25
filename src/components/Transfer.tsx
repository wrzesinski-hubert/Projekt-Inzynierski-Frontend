import React, { ChangeEvent, useContext, useEffect, MouseEvent, useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import InformationIcon from '../assets/information.svg';

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
  background: white;
  margin: 0 auto;
  border-radius: 5px;
`;

const BinIcon = styled(DeleteIcon)`
  max-width: 30px;
  min-width: 30px;
  cursor: pointer;
  &:hover {
    fill: white;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top:40px;
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
  }

  &:active {
    background-color: #54c457;
  }

  text-transform: uppercase;
  box-shadow: 3px 3px 5px 0px rgba(189,189,189,1);
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
  border-top: 1px solid #b8b8b8;
`;

const ExchangesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 20px;
`;

const Information = styled.img`
  width: 35px;
`;

const Exchange = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b5d2e0;
  border-radius: 2px;
  width: 280px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  line-height:2;
`;

const ExchangeTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  
  margin:0;
`;

const ExchangeParagraph = styled.p`
  font-size: 13px;
  color: #1a1a1a;
  margin:0;
`;

export const Transfer = ({ handleClose, isTransferOpen }: TransferProps) => {
  const { basket, tour, selectBasketCourses } = useContext(coursesContext)!;
  // const basketCourseGroups = useMemo(() => selectBasketCourseGroups(course.name), []);
  const basketCourses = selectBasketCourses();

  const classes = useStyles();
  // const groups = selectGroups();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const [assignmentsClasses, setAssignmentsClasses] = useState<Array<any>>([]);
  const [selectedAssignmentsClasses, setSelectedAssignmentsClasses] = useState<any>('');
  const [selectedGroup, setSelectedGroup] = useState<any>('');
  const [groups, setGroups] = useState<any>([]);
  const [exchanges, setExchanges] = useState<any>(null);
  const [save, setSave] = useState(false);
  // const allGroups
  const handleSelectedAssignmentsGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAssignmentsClasses(event.target.value as any);
  };

  const handleGroupsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as any);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
  const handleShowDropdown = () => setOpen(true);

  const handleCloseDropdown = () => setOpen(false);

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

  const getExchanges = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/all`);
      setExchanges(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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
    setSelectedGroup('');
    setSelectedAssignmentsClasses('');
    setSave(!save);
  };

  const deleteExchange = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/${id}`);
      getExchanges();
    } catch (e) {
      console.log(e);
    }
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
          {tour === 'FIRST_TOUR' ? (
            <TransferStyled>
              <Information src={InformationIcon}></Information>
              <p>Wymiana przedmiotami jest dostępna dopiero podczas drugiej tury</p>
             <p>Wymianie podlegają tylko zaakceptowane grupy przedmiotów</p>
              <p>Wymiana grupami odbywa się tylko w obrębie danego przedmiotu</p></TransferStyled>
          ) : (
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
                        {assignmentsClasses.map((el: any, index: number) => {
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
                  exchanges.map((name: any, index: number) => (
                    <ExchangesRow key={index}>
                      {' '}
                      <Exchange>
                        <ExchangeTitle>{name.courseName}</ExchangeTitle>
                        <ExchangeParagraph>{name.ownedAssignment.lecturer} </ExchangeParagraph>
                        <ExchangeParagraph> {dayMapping[name.ownedAssignment.day]} </ExchangeParagraph>
                        <ExchangeParagraph>
                          {name.ownedAssignment.time} - {name.ownedAssignment.endTime}
                        </ExchangeParagraph>
                      </Exchange>
                      <Icon alt="transfer" src={TransferIcon} />
                      <Exchange>
                        <ExchangeTitle>{name.courseName}</ExchangeTitle>
                        <ExchangeParagraph>{name.desiredGroup.lecturer} </ExchangeParagraph>
                        <ExchangeParagraph> {dayMapping[name.desiredGroup.day]} </ExchangeParagraph>
                        <ExchangeParagraph>
                          {name.desiredGroup.time} - {name.desiredGroup.endTime}
                        </ExchangeParagraph>
                      </Exchange>{' '}
                      <BinIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          const id = Number(e.currentTarget.id);
                          deleteExchange(id);
                        }}
                        id={name.id}
                      ></BinIcon>
                    </ExchangesRow>
                  ))
                ) : (
                  <div></div>
                )}
              </ExchangesWrapper>
            </TransferStyled>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

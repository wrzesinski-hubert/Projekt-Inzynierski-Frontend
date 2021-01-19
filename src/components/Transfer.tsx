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

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #43a047;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  &:hover {
    color: #ffffff;
    box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.24);
  }

  &:active {
    background-color: #54c457;
  }

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
`;
const TransferStyled = styled.div`
  display: flex;
  flex-direction: row;
  outline: none;
  min-width: 35%;
  height: 70%;
  padding-top: 40px;
  background: white;
  box-shadow: 0px 0px 0px 4px #006b96;
  margin: 0 auto;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.3ch;
`;

const TransferGiveStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransferReceiveStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const deleteExchange = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/${id}`);
    console.log('delete exchange response: ', response);
  } catch (e) {
    console.log(e);
  }
};

const createExchange = async (groupsIds: Array<number>) => {
  console.log('groups ids are: ', groupsIds);
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange`,
      JSON.stringify({ assignment: groupsIds[0], group: groupsIds[1] }),
    );
    console.log('create exchange response is: ', response);
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
  // const allGroups
  const handleSelectedAssignmentsGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('it is: ', event.target.value);
    setSelectedAssignmentsClasses(event.target.value);
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
      console.log('allgroups: ', allGroups);
      console.log('allclasses: ', allClasses);
      if (allClasses) {
        const filteredClasses = allClasses.filter((el: any) => {
          return el.time !== selectedAssignmentsClasses.time;
        });
        console.log('filtered classes: ', filteredClasses);
        setGroups(filteredClasses);
      }
    }
  }, [selectedAssignmentsClasses]);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/all`);
        console.log('exchanges: ', data);
        setExchanges(data);
      } catch (e) {
        console.log(e);
      }
    };
    const getAssignmentsGroups = async () => {
      try {
        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/commisions/user/assignments`);
        console.log('assignments: ', data);
        const classes = data.filter((el: any) => el.type === 'CLASS');
        setAssignmentsClasses(classes);
      } catch (e) {
        console.log(e);
      }
    };
    console.log('open changed');
    getExchanges();
    getAssignmentsGroups();
  }, [isTransferOpen]);

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
                        <MenuItem key={el.id} value={el}>
                          {`${el.name}  (${dayMapping[el.day]} ${el.time} ${el.endTime})`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </TransferInputStyled>
            </TransferGiveStyled>
            <TransferReceiveStyled>
              <TransferTextStyled>Przyjmę</TransferTextStyled>
              <TransferInputStyled>
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
                      <MenuItem key={index} value={el}>
                        {`${selectedAssignmentsClasses.name} ${el.time} ${el.endTime} ${dayMapping[el.day]}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </TransferInputStyled>
            </TransferReceiveStyled>
            <SaveButton
              onClick={() => {
                createExchange([selectedAssignmentsClasses.id, selectedGroup.id]);
              }}
            >
              WYŚLIJ
            </SaveButton>
          </TransferStyled>
        </Fade>
      </Modal>
    </div>
  );
};

import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
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

interface TransferProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
});

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  background-color: #f1f2f5;
  height: 40px;
  max-height: 40px;
  width: 100%;
  border: none;
  margin-left: 5px;
  &:focus {
    outline: none;
  }
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
      JSON.stringify(groupsIds),
    );
    console.log('create exchange response is: ', response);
  } catch (e) {
    console.log(e);
  }
};

export const Transfer = ({ handleClose, isOpen }: TransferProps) => {
  const { selectGroups } = useContext(coursesContext)!;
  const classes = useStyles();
  const groups = selectGroups();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const [assignmentsGroups, setAssignmentsGroups] = useState<Array<any>>([]);
  const [selectedAssignmentsGroup, setSelectedAssignmentsGroup] = useState<any>('');
  const [selectedGroup, setSelectedGroup] = useState<any>('');
  const [exchanges, setExchanges] = useState<any>(null);
  // const allGroups
  const handleSelectedAssignmentsGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('it is: ', event.target.value);
    setSelectedAssignmentsGroup(event.target.value);
  };

  const handleSelectedGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as any);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
  const handleShowDropdown = () => setOpen(true);

  const handleCloseDropdown = () => setOpen(false);
  useEffect(() => {
    const getExchanges = async () => {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/exchanges/exchange/all`);
      console.log('exchanges: ', data);
      setExchanges(data);
    };
    const getAssignmentsGroups = async () => {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/commisions/user/assignments`);
      console.log('assignments: ', data);
      setAssignmentsGroups(data);
    };
    getExchanges();
    getAssignmentsGroups();
  }, []);

  return (
    <div>
      <Modal
        className={classes.wrapper}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={isOpen}>
          <TransferStyled>
            <TransferGiveStyled>
              <TransferTextStyled>Oddam</TransferTextStyled>
              <TransferInputStyled>
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="assignments-groups"
                    value={selectedAssignmentsGroup}
                    onChange={handleSelectedAssignmentsGroupChange}
                    placeholder="Wyszukaj..."
                    style={{ width: '200px' }}
                  >
                    {assignmentsGroups.map((el) => {
                      return (
                        <MenuItem key={el.id} value={el}>
                          {el.name}
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
                {/* <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="assignments-groups"
                  value={selectedGroups}
                  onChange={handleSelectedGroupsChange}
                  placeholder="Wyszukaj..."
                  style={{ width: '200px' }}
                >
                  {assignmentsGroups.map((el) => {
                    return (
                      <MenuItem key={el.id} value={el}>
                        {el.name}
                      </MenuItem>
                    );
                  })}
                </Select> */}
                <Input
                  placeholder={`Wyszukaj przedmioty...`}
                  onChange={handleChange}
                  value={input}
                  onFocus={() => {
                    handleShowDropdown();
                  }}
                />
                <DropdownModal
                  handleSelectedGroupChange={handleSelectedGroupChange}
                  open={open}
                  input={input}
                  handleCloseDropdown={handleCloseDropdown}
                  selectedOption={'przedmioty'}
                />
              </TransferInputStyled>
            </TransferReceiveStyled>
          </TransferStyled>
        </Fade>
      </Modal>
    </div>
  );
};

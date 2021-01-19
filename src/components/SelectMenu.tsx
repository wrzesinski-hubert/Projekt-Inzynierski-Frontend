import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ExpandIcon } from './CourseCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 15px;
  min-width:130px;
  font-family: 'Roboto', sans-serif;
  background-color: #f1f2f5;
  color: black;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  &:focus {
    outline: none;
  }
  padding-left: 15px;
  cursor: pointer;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  user-select: none;
`;
const Header = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
`;
const List = styled.ul`
  position: absolute;
  top: 50px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: -15px;
  background-color: #f2f4f7;
`;
const ListItem = styled.li`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  user-select: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 37px;
  font-weight: 400;
  :hover {
    background-color: #eceef4;
  }
  :first-child{
    margin-top:10px;
  }
`;
const ExpandIconSelect = styled(ExpandIcon)`
  width: 10px;
  height: 10px;
`;

interface SelectMenuProps {
  changeSelectedOption: (option: string) => void;
  changeDropdownOpen: (dropdownState: boolean) => void;
  selectedOption:string;
}

export const SelectMenu = ({changeSelectedOption,changeDropdownOpen, selectedOption}:SelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <Wrapper onClick={() => {changeDropdownOpen(false)}}>
        <Header
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <HeaderTitle>{selectedOption}</HeaderTitle>
          <ExpandIconSelect selected={isOpen} />
        </Header>
        {isOpen && (
          <List>
            <ListItem
              onClick={() => {
                changeSelectedOption('przedmioty');
                setIsOpen(false);
              }}
            >
              przedmioty
            </ListItem>
            <ListItem
              onClick={() => {
                changeSelectedOption('studenci');
                setIsOpen(false);
              }}
            >
              studenci
            </ListItem>
          </List>
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ExpandIcon } from './CourseCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 10%;
  margin-top: 15px;
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
  align-items: center;
`;
const HeaderTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
`;
const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f2f4f7;
`;
const ListItem = styled.li`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  user-select: none;
  font-weight: 400;
  :hover {
    background-color: #eceef4;
  }
`;
const ExpandIconSelect = styled(ExpandIcon)`
  width: 10px;
  height: 10px;
`;
export const SelectMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('przedmioty');
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <Wrapper>
        <Header
          onClick={() => {
            console.log('clicked');
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
                setSelectedOption('przedmioty');
              }}
            >
              przedmioty
            </ListItem>
            <ListItem
              onClick={() => {
                setSelectedOption('studenci');
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

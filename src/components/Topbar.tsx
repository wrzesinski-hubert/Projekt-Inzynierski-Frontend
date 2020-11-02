import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import Transfer from '../assets/transfer.png';
import Search from '../assets/search.svg';
import CloseIcon from '../assets/close.svg';
import ProfileIcon from '../assets/account.svg';
import { Profile } from './Profile';
import { Dropdown } from './Dropdown';
import PolishIcon from '../assets/poland.svg';
import EnglishIcon from '../assets/united-kingdom.svg';
import styled from 'styled-components/macro';
import ClickAwayListener from 'react-click-away-listener';

const Topbar = styled.div`
  background-color: #eceef4;
  height: 80px;
  padding: 5px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.5;
  justify-content: flex-start;
`;

const Logo = styled.img`
  flex-grow: 1;
  width: 70px;
  height: 70px;
  @media only screen and (max-width: 670px) {
    width: 60px;
    height: 60px;
  }
`;

const Text = styled.div`
  flex-grow: 2;
  @media only screen and (max-width: 670px) {
    display: none;
  }
`;

const FlexboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 9;
  max-width: 1400px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  background-color: #f2f4f7;
  border-radius: 6px;
`;

const Input = styled.input`
  background-color: #f1f2f5;
  font-size: 20px;
  height: 40px;
  width: 100%;
  margin-left: 5px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const InputIcon = styled.img`
  width: 30px;
  @media only screen and (max-width: 670px) {
    width: 25px;
  }
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 0.5;
`;

const Icon = styled.img`
  width: 40px;
  cursor: pointer;
  @media only screen and (max-width: 670px) {
    width: 35px;
  }
`;

const VerticalLine = styled.div`
  border-left: 1px solid black;
  height: 30px;
`;



interface TopbarProps {
  handleTransfer: (e: MouseEvent) => void;
}

export default function ({ handleTransfer }: TopbarProps) {
  const [clearInput, setClearInput] = useState(false);
  const [isPolish, setIsPolish] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const onLangChange = () => setIsPolish(!isPolish);

  const handleProfile = (event: MouseEvent<HTMLImageElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleClearInput = () => setClearInput(!clearInput);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

  const handleClick = () => setOpen(true);

  const handleCloseDropdown = () => setOpen(false);

  const handleClickAway = () => setOpen(false);

  useEffect(() => {
    clearInput && (setInput(''), handleClearInput());
  }, [clearInput]);

  return (
    <Topbar>
      <LogoWrapper>
        <Logo alt="logo" src="https://plannaplan.pl/img/logo.svg" />
        <Text> plan na plan </Text>
      </LogoWrapper>
      <FlexboxColumn>
        <ClickAwayListener onClickAway={handleClickAway}>
          <InputWrapper>
            <Input placeholder="Wyszukaj przedmiot..." onChange={handleChange} onClick={handleClick} value={input} />
            <InputIcon alt="close" src={CloseIcon} onClick={handleClearInput} />
            <VerticalLine />
            <InputIcon alt="search" src={Search} />
          </InputWrapper>
          <Dropdown open={open} input={input} handleCloseDropdown={handleCloseDropdown} />
        </ClickAwayListener>
      </FlexboxColumn>

      <IconWrapper>
        {/* <Icon alt="transfer" src={Transfer} onClick={handleTransfer} /> */}
        <Icon alt="change_language" src={isPolish ? EnglishIcon : PolishIcon} onClick={onLangChange} />
        <Icon alt="profile" src={ProfileIcon} onClick={handleProfile} />
        <Profile anchorEl={anchorEl} handleClose={handleClose} />
        <span>nasz student</span>
      </IconWrapper>
    </Topbar>
  );
}

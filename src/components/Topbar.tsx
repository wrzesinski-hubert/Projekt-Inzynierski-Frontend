import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { ReactComponent as Close } from '../assets/close.svg';
import ProfileIcon from '../assets/account.svg';
import { Profile } from './Profile';
import { Dropdown } from './Dropdown';
import PolishIcon from '../assets/poland.svg';
import EnglishIcon from '../assets/united-kingdom.svg';
import styled from 'styled-components/macro';
import ClickAwayListener from 'react-click-away-listener';

const Topbar = styled.div`
  background-color: #E3E5ED;
  height: 80px;
  padding: 5px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 2;
  margin-left: 10px;
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  @media only screen and (max-width: 670px) {
    width: 60px;
    height: 60px;
  }
`;

const Text = styled.div`
 margin-left: 10px;
 font-size: 1.4rem;
 user-select: none;
  @media only screen and (max-width: 670px) {
    display: none;
  }
`;

const FlexboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 12;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  background-color: #f2f4f7;
  border-radius: 6px;
  align-items: center;
`;

const Input = styled.input`
  background-color: #f1f2f5;
  font-size: 20px;
  height: 40px;
  width: 100%;
  border: none;
  margin-left: 5px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  &:focus {
    outline: none;
  }
`;

const CloseIcon = styled(Close)`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  @media only screen and (max-width: 670px) {
    width: 25px;
  }
  cursor: pointer;
  :hover {
    fill: grey;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 335px;
`;

const Icon = styled.img`
  width: 40px;
  margin: 5px;
  cursor: pointer;
  @media only screen and (max-width: 670px) {
    width: 35px;
  }
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
            <CloseIcon onClick={handleClearInput} />
          </InputWrapper>
          <Dropdown open={open} input={input} handleCloseDropdown={handleCloseDropdown} />
        </ClickAwayListener>
      </FlexboxColumn>

      <IconWrapper>
        {/* <Text>Maciej Głowacki</Text> */}
        {/* <Icon alt="transfer" src={Transfer} onClick={handleTransfer} /> */}
        <Icon alt="change_language" src={isPolish ? EnglishIcon : PolishIcon} onClick={onLangChange} />
        <Icon alt="profile" src={ProfileIcon} onClick={handleProfile} />
        <Profile anchorEl={anchorEl} handleClose={handleClose} />
      </IconWrapper>
    </Topbar>
  );
}

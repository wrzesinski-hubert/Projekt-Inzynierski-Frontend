import React, { useState, MouseEvent, ChangeEvent, useEffect, useCallback } from 'react';
import { ReactComponent as Close } from '../assets/close.svg';
import ProfileIcon from '../assets/account.svg';
import { Profile } from './Profile';
import { Dropdown } from './Dropdown';
import PolishIcon from '../assets/poland.svg';
import EnglishIcon from '../assets/united-kingdom.svg';
import styled from 'styled-components/macro';
import ClickAwayListener from 'react-click-away-listener';
import { SelectMenu } from './SelectMenu';

const Topbar = styled.div`
  background-color: #e3e5ed;
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
  @media only screen and (max-width: 1533px) {
    flex: auto;
  }
`;

const Text = styled.div`
  margin-left: 10px;
  font-size: 1.4rem;
  user-select: none;
  @media only screen and (max-width: 1533px) {
    display: none;
  }
  @media only screen and (max-width: 1828px) {
    margin-right: 10px;
    text-align: center;
  }
`;

const FlexboxColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 12;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  max-height: 40px;
  background-color: #f2f4f7;
  border-radius: 6px 6px 6px 6px;
  padding-left: 6px;
  &:hover {
    background-color: #ffffff;
  }
  &:hover > input {
    background-color: #ffffff;
  }
`;

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

const CloseIcon = styled(Close)`
  align-self: center;
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

export const Flexbox = styled.div`
  display: flex;
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

  const handleCloseProfile = () => setAnchorEl(null);

  const handleClearInput = useCallback(() => setClearInput((clearInput) => !clearInput), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

  const handleShowDropdown = () => setOpen(true);

  const handleCloseDropdown = () => setOpen(false);

  useEffect(() => {
    if (clearInput) {
      setInput('');
      handleClearInput();
    }
  }, [clearInput, handleClearInput]);

  return (
    <Topbar>
      <LogoWrapper>
        <Logo alt="logo" src="https://plannaplan.pl/img/logo.svg" />
        <Text> plan na plan </Text>
      </LogoWrapper>
      <FlexboxColumn>
        <ClickAwayListener onClickAway={handleCloseDropdown}>
          <Flexbox>
            {/* <SelectMenu /> */}

            <InputWrapper>
              {/* <SelectSearch value={value} onChange={Change}>
    <SelectOption value="przedmiot">Przedmiot</SelectOption>
    <SelectOption value="student">Student</SelectOption>
  </SelectSearch> */}
              <Input
                placeholder={`Wyszukaj...`}
                onChange={handleChange}
                value={input}
                onFocus={() => {
                  handleShowDropdown();
                }}
              />
              <CloseIcon onClick={handleClearInput} />
            </InputWrapper>
          </Flexbox>
          <Dropdown open={open} input={input} handleCloseDropdown={handleCloseDropdown} />
        </ClickAwayListener>
      </FlexboxColumn>

      <IconWrapper>
        {/* <Text>Maciej Głowacki</Text> */}
        {/* <Icon alt="transfer" src={Transfer} onClick={handleTransfer} /> */}
        <Icon alt="change_language" src={isPolish ? EnglishIcon : PolishIcon} onClick={onLangChange} />
        <Icon alt="profile" src={ProfileIcon} onClick={handleProfile} />
        <Profile anchorEl={anchorEl} handleClose={handleCloseProfile} />
      </IconWrapper>
    </Topbar>
  );
}

import React, { useState, MouseEvent, ChangeEvent, useEffect, useCallback, useContext, useRef } from 'react';
import { ReactComponent as Close } from '../assets/close.svg';
import ProfileIcon from '../assets/account.svg';
import { Profile } from './Profile';
import { Dropdown } from './Dropdown';
import styled from 'styled-components/macro';
import ClickAwayListener from 'react-click-away-listener';
import { SelectMenu } from './SelectMenu';
import { studentsContext } from '../contexts/StudentsProvider';
import { CASContext } from '../contexts/CASProvider';
import { render } from 'react-dom';

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

type InputWrapperProps = {
  isStudent: boolean;
};

const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  display: flex;
  margin-top: 15px;
  max-height: 40px;
  background-color: #f2f4f7;
  border-radius: ${({ isStudent }) => (isStudent ? ` 6px 6px 6px 6px` : ` 0px 6px 6px 0px`)};
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
  align-items: center;
  justify-content: flex-end;
  width: 335px;
  margin-right: 10px;
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

export const SelectedStudent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
`;

interface TopbarProps {
  handleTransfer: (e: MouseEvent) => void;
}

export default function ({ handleTransfer }: TopbarProps) {
  const { selectedStudent } = useContext(studentsContext)!;
  const { role } = useContext(CASContext)!;
  const [clearInput, setClearInput] = useState(false);
  const [isPolish, setIsPolish] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(role === 'STUDENT' ? 'przedmioty' : 'studenci');

  useEffect(() => {
    role && setSelectedOption(role === 'STUDENT' ? 'przedmioty' : 'studenci');
  }, [role]);

  const changeSelectedOption = (option: string) => setSelectedOption(option);

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
            {role !== 'STUDENT' && (
              <SelectMenu
                changeSelectedOption={changeSelectedOption}
                selectedOption={selectedOption}
                changeDropdownOpen={setOpen}
              />
            )}
            <InputWrapper isStudent={role === 'STUDENT'}>
              <Input
                placeholder={`Wyszukaj ${selectedOption === 'studenci' ? 'studentów...' : 'przedmioty...'}`}
                onChange={handleChange}
                value={input}
                onFocus={() => {
                  handleShowDropdown();
                }}
              />
              <CloseIcon onClick={handleClearInput} />
            </InputWrapper>
          </Flexbox>
          <Dropdown
            open={open}
            input={input}
            handleCloseDropdown={handleCloseDropdown}
            selectedOption={selectedOption}
          />
        </ClickAwayListener>
      </FlexboxColumn>
      <IconWrapper>
        <SelectedStudent>{selectedStudent?.email.replace(/@st.amu.edu.pl/, '')}</SelectedStudent>

        {/* <Text>Maciej Głowacki</Text> */}
        <Icon alt="transfer" src={ProfileIcon} onClick={handleTransfer} />
        {/* <Icon alt="change_language" src={isPolish ? EnglishIcon : PolishIcon} onClick={onLangChange} /> */}
        <Icon alt="profile" src={ProfileIcon} onClick={handleProfile} />
        <Profile anchorEl={anchorEl} handleClose={handleCloseProfile} />
      </IconWrapper>
    </Topbar>
  );
}

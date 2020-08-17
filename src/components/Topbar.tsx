import React, { useState } from 'react';
import Transfer from '../assets/transfer.png';
import Search from '../assets/search.svg';
import UK from '../assets/UK.png';
import PL from '../assets/PL.png';
import User from '../assets/user.png';
import CloseIcon from '../assets/close.svg';
import { Profile } from './Profile';
import { Results } from './Results';
import styled from 'styled-components';

const TopbarTextStyled = styled.div`
  @media only screen and (max-width: 670px) {
    display: none;
  }
`;

const TopbarStyled = styled.div`
  background-color: #ffdc61;
  height: 80px;
  padding: 5px;
  font-family: comic sans MS;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const TopbarLogoStyled = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.5;
  justify-content: flex-start;
`;

const TopbarLogoImageStyled = styled.img`
  width: 80px;
  height: 80px;
  @media only screen and (max-width: 670px) {
    width: 60px;
    height: 60px;
  }
`;

const TopbarInputDivStyled = styled.div`
  width: 70%;
  display: flex;
  flex-grow: 3;
`;

const TopbarInputFieldStyled = styled.div`
  width: 96%;
  margin-top: 10px;
`;

const TopbarInputIconStyled = styled.img`
  width: 35px;
  @media only screen and (max-width: 670px) {
    width: 25px;
  }
`;

const TopbarIcon = styled.img`
  width: 50px;
  cursor: pointer;
  @media only screen and (max-width: 670px) {
    width: 35px;
  }
`;

const TopbarIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1.5;
`;

interface TopbarProps {
  handleTransfer: (e: React.MouseEvent) => void;
  handleLogout: () => void;
}

export const Topbar = ({ handleTransfer, handleLogout }: TopbarProps) => {
  const [isPolish, setIsPolish] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

  const onLangChange = (event: React.MouseEvent) => setIsPolish(!isPolish);

  const handleProfile = (event: React.MouseEvent) => setAnchorEl(event.currentTarget as HTMLImageElement);

  const handleClose = () => setAnchorEl(null);

  return (
    <TopbarStyled>
      <TopbarLogoStyled>
        <TopbarLogoImageStyled alt="logo" src="https://plannaplan.pl/img/logo.svg" />
        <TopbarTextStyled> plan na plan </TopbarTextStyled>
      </TopbarLogoStyled>
      <TopbarInputDivStyled>
        <TopbarInputIconStyled alt="search" src={Search} />
        <TopbarInputFieldStyled>
          <Results />
        </TopbarInputFieldStyled>
        <TopbarInputIconStyled alt="close" src={CloseIcon} />
      </TopbarInputDivStyled>
      <TopbarIconBox>
        <TopbarIcon alt="transfer" src={Transfer} onClick={handleTransfer} />
        <TopbarIcon alt="change_language" src={isPolish ? UK : PL} onClick={onLangChange} />
        <TopbarIcon alt="profile" src={User} onClick={handleProfile} />
        <Profile anchorEl={anchorEl} handleClose={handleClose} handleLogout={handleLogout} />
      </TopbarIconBox>
    </TopbarStyled>
  );
};

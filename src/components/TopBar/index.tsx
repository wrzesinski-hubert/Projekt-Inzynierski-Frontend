import React from 'react';
import Transfer from './transfer.png';
import Search from './search.svg';
import UK from './UK.png';
import PL from './PL.png';
import User from './user.png';
import CloseIcon from './close.svg';
import { Profile } from './Profile';
import { Results } from './Results';
import styled from 'styled-components';

interface TopBarProps {
  handleTransfer: (e: React.MouseEvent) => void;
  onLangChange: (lang: boolean) => void;
  handleLogout: () => void;
}

interface TopBarState {
  isPolish: boolean;
  anchorEl: HTMLElement | null;
}

const TopBarTekstStyled = styled.div`
  @media only screen and (max-width: 670px) {
    display: none;
  }
`;

const TopBarStyled = styled.div`
  background-color: #ffdc61;
  height: 80px;
  padding: 5px;
  font-family: comic sans MS;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const TopBarLogoStyled = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.5;
  justify-content: flex-start;
`;

const TopBarLogoImageStyled = styled.img`
  width: 80px;
  height: 80px;
  @media only screen and (max-width: 670px) {
    width: 60px;
    height: 60px;
  }
`;

const TopBarInputDivStyled = styled.div`
  width: 70%;
  display: flex;
  flex-grow: 3;
`;

const TopBarInputFieldStyled = styled.div`
  width: 96%;
  margin-top: 10px;
`;

const TopBarInputIconStyled = styled.img`
  width: 35px;
  @media only screen and (max-width: 670px) {
    width: 25px;
  }
`;

const TopBarIcon = styled.img`
  width: 50px;
  cursor: pointer;
  @media only screen and (max-width: 670px) {
    width: 35px;
  }
`;

const TopBarIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1.5;
`;

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onLangChange = this.onLangChange.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
    this.state = {
      isPolish: true,
      anchorEl: null,
    };
  }

  handleTransfer(e: React.MouseEvent) {
    this.props.handleTransfer(e);
  }

  onLangChange(e: React.MouseEvent) {
    this.setState({
      isPolish: !this.state.isPolish,
    });
    this.props.onLangChange(this.state.isPolish);
  }

  handleProfile(event: React.MouseEvent<HTMLImageElement>) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    return (
      <TopBarStyled>
        <TopBarLogoStyled>
          <TopBarLogoImageStyled alt="logo" src="https://plannaplan.pl/img/logo.svg" />
          <TopBarTekstStyled> plan na plan </TopBarTekstStyled>
        </TopBarLogoStyled>
        <TopBarInputDivStyled>
          <TopBarInputIconStyled alt="search" src={Search} />
          <TopBarInputFieldStyled>
            <Results />
          </TopBarInputFieldStyled>
          <TopBarInputIconStyled alt="close" src={CloseIcon} />
        </TopBarInputDivStyled>
        <TopBarIconBox>
          <TopBarIcon alt="transfer" src={Transfer} onClick={this.handleTransfer} />
          <TopBarIcon alt="change_language" src={this.state.isPolish ? UK : PL} onClick={this.onLangChange} />
          <TopBarIcon alt="profile" src={User} onClick={this.handleProfile} />
          <Profile
            anchorEl={this.state.anchorEl}
            handleClose={this.handleClose}
            handleLogout={this.props.handleLogout}
          />
        </TopBarIconBox>
      </TopBarStyled>
    );
  }
}

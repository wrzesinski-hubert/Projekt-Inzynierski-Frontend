import React, { ChangeEvent } from "react";
import "./index.scss";
import Input from "@material-ui/core/Input";
import Transfer from "./transfer.png";
import Search from "./search.svg";
import UK from "./UK.png";
import PL from "./PL.png";
import User from "./user.png";
import CloseIcon from "./close.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface TopBarProps {
  handleTransfer: (e: React.MouseEvent) => void;
  handleProfile: (e: React.MouseEvent) => void;
  handleClose: (e: React.MouseEvent) => void;
  handleLanguage: (e: React.MouseEvent) => void;
  textChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpenTransfer: boolean;
  isOpenProfile: boolean;
  isPolish: boolean;
  anchorEl: null | HTMLElement;
}

interface TopBarState {}

export default class TopBar extends React.Component<
  TopBarProps,
  TopBarState
> {
  constructor(props: TopBarProps) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleClose = this.handleProfile.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.textChangeHandler(e);
  }

  handleTransfer(e: React.MouseEvent) {
    this.props.handleTransfer(e);
  }

  handleLanguage(e: React.MouseEvent) {
    this.props.handleLanguage(e);
  }

  handleProfile(e: React.MouseEvent) {
    this.props.handleProfile(e);
  }

  handleClose(e: React.MouseEvent) {
    this.props.handleClose(e);
  }

  render() {
    return (
      <div className="top-bar">
        <div className="top-bar__logo">
          <img
            className="top-bar__logo-image"
            alt="logo"
            src="https://plannaplan.pl/img/logo.svg"
          />
          <div className="top-bar__tekst"> plan na plan </div>
        </div>
        <div className="top-bar__input-div">
          <img className="top-bar__input-icon" alt="search" src={Search} />
          <Input
            placeholder="Wyszukaj..."
            inputProps={{ "aria-label": "description" }}
            className="top-bar__input-field"
            onChange={(e) =>
              this.handleChange(e as ChangeEvent<HTMLInputElement>)
            }
          />
          <img className="top-bar__input-icon" alt="close" src={CloseIcon} />
        </div>
        <div className="top-bar__icon-box">
          <img
            className="top-bar__icon"
            alt="transfer"
            src={Transfer}
            onClick={this.handleTransfer}
          />
          <img
            className="top-bar__icon"
            alt="change_language"
            src={this.props.isPolish ? UK : PL}
            onClick={this.handleLanguage}
          />
          <img
            className="top-bar__icon"
            alt="profile"
            src={User}
            onClick={this.handleProfile}
          />
          <Menu className="top-bar__menu"
            id="simple-menu"
            anchorEl={this.props.anchorEl}
            keepMounted
            open={this.props.isOpenProfile}
            onClose={this.handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
}

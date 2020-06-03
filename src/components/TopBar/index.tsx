import React, { ChangeEvent } from "react";
import "./index.scss";
import Input from "@material-ui/core/Input";
import Transfer from "./transfer.png";
import Search from "./search.svg";
import UK from "./UK.png";
import User from "./user.png";
import CloseIcon from "./close.svg";

interface TopBarProps {
  handleTransfer: (e: React.MouseEvent) => void;
  handleProfile: (e: React.MouseEvent) => void;
  handleLanguage: (e: React.MouseEvent) => void;
  textChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
}

interface TopBarState {}

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleTransfer(e: React.MouseEvent) {
    this.props.handleTransfer(e);
    this.setState({
      isOpen: true,
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.textChangeHandler(e);
  }

  handleProfile(e: React.MouseEvent) {
    this.props.handleProfile(e);
  }

  handleLanguage(e: React.MouseEvent) {
    this.props.handleLanguage(e);
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
        <img
            className="top-bar__input-icon"
            alt="search"
            src={Search}
          />
          <Input
            placeholder="Wyszukaj..."
            inputProps={{ "aria-label": "description" }}
            className="top-bar__input-field"
            onChange={(e) =>
              this.handleChange(e as ChangeEvent<HTMLInputElement>)
            }
          />
        <img
            className="top-bar__input-icon"
            alt="close"
            src={CloseIcon}
          />
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
            src={UK}
            onClick={this.handleLanguage}
          />
          <img
            className="top-bar__icon"
            alt="profile"
            src={User}
            onClick={this.handleProfile}
          />
        </div>
      </div>
    );
  }
}

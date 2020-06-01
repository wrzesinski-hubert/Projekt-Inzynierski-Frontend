import React from "react";
import "./index.scss";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

export default class TopBar extends React.Component {
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
            <SearchIcon fontSize="large"></SearchIcon>
            <Input
              placeholder="Wyszukaj..."
              inputProps={{ "aria-label": "description" }}
              className="top-bar__input-field"
            />
            <CloseIcon fontSize="large"></CloseIcon>
        </div>
        <div className="top-bar__icon-box">
          <img
            className="top-bar__icon"
            alt="logo"
            src="https://plannaplan.pl/img/transfer.png"
          />
          <img
            className="top-bar__icon"
            alt="logo"
            src="https://plannaplan.pl/img/UK.png"
          />
          <img
            className="top-bar__icon"
            alt="logo"
            src="https://plannaplan.pl/img/user.png"
          />
        </div>
      </div>
    );
  }
}

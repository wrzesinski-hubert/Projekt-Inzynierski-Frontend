import React from "react";
import "./index.css";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

export default class TopBar extends React.Component {
  render() {
    return (
      <div className="bar">
        <img
          className="logo"
          alt="logo"
          src="https://plannaplan.pl/img/logo.svg"
        />
        <div className="rest">
          <div className="tekst"> plan na plan </div>
          <div className="inputdiv">
            <div className="iconSearch">
              <SearchIcon fontSize="large"></SearchIcon>
            </div>
            <div className="search">
              <Input
                placeholder="Wyszukaj..."
                inputProps={{ "aria-label": "description" }}
                className="input"
              />
              <div className="iconClose">
                <CloseIcon fontSize="large"></CloseIcon>
              </div>
            </div>
          </div>
          <img
            className="transfer"
            alt="logo"
            src="https://plannaplan.pl/img/transfer.png"
          />
          <img
            className="UK"
            alt="logo"
            src="https://plannaplan.pl/img/UK.png"
          />
          <img
            className="iconUser"
            alt="logo"
            src="https://plannaplan.pl/img/user.svg"
          />
        </div>
      </div>
    );
  }
}

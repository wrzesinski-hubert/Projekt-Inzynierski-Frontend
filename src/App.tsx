import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";

function App() {
  const [isOpenTransfer, setOpenTransfer] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isPolish, setLanguage] = useState(true);
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div className="App">
      <TopBar
        textChangeHandler={(e) => {
          setText(e.target.value);
        }}
        handleTransfer={(e) => {
          setOpenTransfer(!isOpenTransfer);
        }}
        handleLanguage={(e) => {
          setLanguage(!isPolish);
        }}
        handleProfile={(e) => {
          setOpenProfile(!isOpenProfile);
          setAnchorEl(e.currentTarget as HTMLElement);
        }}
        handleClose={(e) => {
          setOpenProfile(!isOpenProfile);
        }}
        isOpenTransfer={isOpenTransfer}
        isOpenProfile={isOpenProfile}
        isPolish={isPolish}
        anchorEl={anchorEl}
      />
      <Transfer
        isOpen={isOpenTransfer}
        handleClose={(e) => {
          setOpenTransfer(!isOpenTransfer);
        }}
      />
      <div className="wraper">
        <div className="wraper__calendar">
          <Schedule data={appointments} />
        </div>
        <div className="wraper__rightbar">
          <RightBar />
        </div>
      </div>

      <h1>{text}</h1>
    </div>
  );
}

export default App;

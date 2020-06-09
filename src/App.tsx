import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";

function App() {
  const [isOpenTransfer, setOpenTransfer] = useState(false);
  const [isPolish, setLanguage] = useState(true);
  const [text, setText] = useState("");

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
        isOpenTransfer={isOpenTransfer}
        isPolish={isPolish}
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

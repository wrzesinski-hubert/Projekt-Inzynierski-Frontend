import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";

function App() {
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="App">
      <TopBar
        textChangeHandler={(e) => {
          setText(e.target.value);
        }}
        handleTransfer={(e) => {
          setOpen(!isOpen);
        }}
        handleLanguage={(e) => {
          alert("Language");
        }}
        handleProfile={(e) => {
          alert("Profile");
        }}
        isOpen={isOpen}
      />
      <Transfer
        isOpen={isOpen}
        handleClose={(e) => {
          setOpen(!isOpen);
        }}
      />
      <div className="wraper">
        <div className="wraper__calendar">
          <Schedule
            data={appointments}
            currentDate={new Date("2020-06-01")}
          ></Schedule>
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

import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";

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
        handleLanguage={(e)=>{
          alert("Language");
        }}
        handleProfile={(e)=>{
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
      <Schedule></Schedule>
	  <h1>{text}</h1>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";

function App() {
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="App">
      <TopBar
        textChangeHandler={(e) => {
          setText(e.target.value);
        }}
        handleOpen={(e) => {
          setOpen(!isOpen);
        }}
        isOpen={isOpen}
      />
      <Transfer
        isOpen={isOpen}
        handleClose={(e) => {
          setOpen(!isOpen);
        }}
      />
	  <h1>{text}</h1>
    </div>
  );
}

export default App;

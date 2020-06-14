import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";

function App() {
  const [isOpenTransfer, setOpenTransfer] = useState(false);
  const [text, setText] = useState("");

  var data = [
    {
      classname: "E-gospodarka - narzędzia i bezpieczeństwo",
      classgroups: [
        {
          group_id: "1CB",
          day: "Pn",
          time: "10:00",
          lecturer: "dr inż. Michał Ren",
          room: "A2-01",
        },
        {
          group_id: "1XD",
          day: "Wt",
          time: "12:00",
          lecturer: "dr inż. Michał Ren",
          room: "A3-01",
        },
      ],
    },
    {
      classname: "Statystyka",
      classgroups: [
        {
          group_id: "2CB",
          day: "Pn",
          time: "10:00",
          lecturer: "dr inż. Michał Ren",
          room: "A2-01",
        },
        {
          group_id: "2XD",
          day: "Wt",
          time: "12:00",
          lecturer: "dr inż. Michał Ren",
          room: "A3-01",
        },
      ],
    },
  ];

  return (
    <div className="App">
      <TopBar
        textChangeHandler={(e) => {
          setText(e.target.value);
        }}
        handleTransfer={(e) => {
          setOpenTransfer(!isOpenTransfer);
        }}
        onLangChange={(e) => {
          console.log(e);
        }}
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
          <RightBar onClassHover={(group_id,class_id)=>{console.log("group id: ",group_id,"class id",class_id)}} lectures={data}/>
        </div>
      </div>

      <h1>{text}</h1>
    </div>
  );
}

export default App;

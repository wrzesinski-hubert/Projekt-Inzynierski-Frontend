import React, { useState } from "react";
import axios from "axios";
import { Input } from "@material-ui/core";
import "./index.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface data {
  id: number;
  name: string;
  sym: string;
}

export const Results: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<Array<data>>([]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    //query should be updated on backend to not accept empty string
    if (event.target.value !== "") {
      console.log(event.target.value);
      search(event.target.value);
    } else {
      search("xxxxxxxxxxxxxxx");
    }
  };
  const search = (text: string) => {
    axios
      .get(`http://localhost:1287/getCourses?name=${text}`)
      .then((response) => setData(response.data));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Input
          placeholder="Wyszukaj..."
          inputProps={{ "aria-label": "description" }}
          className="top-bar__input-field"
          onChange={handleChange}
          onClick={handleClick}
        />
        {open ? (
          <div className="dropdown">
            {data.map((lecture, index) => (
              <div className="lecture" key={index}>
                <p>{lecture.name}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

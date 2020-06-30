import React, { useState, useContext } from "react";
import axios from "axios";
import { Input } from "@material-ui/core";
import "./index.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { LecturesContext } from "../../../businesslogic/LecturesProvider";
import { Lecture, Group } from "../../../lectures";
import { GroupingPanel } from "@devexpress/dx-react-scheduler";
import { group } from "console";

interface data {
  id: number;
  name: string;
  sym: string;
}





export const Results: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<Array<data>>([]);
  const [open, setOpen] = React.useState(false);

  const lecturesContext = useContext(LecturesContext);


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

	const onLectureClick = (e: React.MouseEvent) => {
		const target = e.currentTarget as HTMLElement;
    const id = target.id;

    const lecture = {name: "", groups: []} as Lecture;

    console.log(id);
    axios
    .get(`http://localhost:1287/getClassesByCourseId?id=${id}`)
    .then((response) => {
      for(let data of response.data){
        console.log("XDD");
        console.log(data);
        let group = {} as Group;
        lecture.name = data.course.name;
        group.id = data.id;
        group.day = data.day;
        group.time = data.time;
        group.lecturer =  `${data.lecturer.title} ${data.lecturer.name} ${data.lecturer.surname}`;
        group.room = data.room.trim();
        lecture.groups.push(group);
        console.log("XDDD");
        console.log(lecture.groups);
       lecturesContext.updateLectures(lecture);
      }
 
    setOpen(false);
    });
  }

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
            <div className="lecture" key={index} id={String(lecture.id)} onClick={onLectureClick}>
                <p>{lecture.name} </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
            

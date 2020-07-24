import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Input } from "@material-ui/core";
import "./index.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { LecturesContext } from "../../../businesslogic/LecturesProvider";
import {LectureInit} from "../../../businesslogic/types/lectureInit";


export const Results: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [lecturesData, setLecturesData] = useState<Array<LectureInit>>([]);
  const [open, setOpen] = React.useState(false);

  const lecturesContext = useContext(LecturesContext);

  //fetch lectures ids and lectures names
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {lecturesData } = await axios.get(
  //       `http://localhost:1287/getCourses?name=""`
  //     );
  //     setLecturesData(lecturesData);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:1287/getCourses?name=""`
      );
      const lecturesData = data.map((data: { name: any; id: any; })=> {name: data.name, id: data.id})
       
      setLecturesData(lecturesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterLectures = (value: string) => {
      return lecturesData.filter((lecture) => lecture.name.includes(value));
    };
    filterLectures(input);
  }, [input]);

  const getLecturesById = async (id: string): Promise<Lecture> => {
    const { data } = await axios.get(
      `http://localhost:1287/getClassesByCourseId?id=${id}`
    );
    return data;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const onLectureClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const id = target.id;
    const result = await getLecturesById(id);
    lecturesContext.updateLectures(result);
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
          value={input}
        />
        {open ? (
          <div className="dropdown">
            {lecturesData.map((lecture, index) => (
              <div
                className="lecture"
                key={index}
                id={String(lecture.id)}
                onClick={onLectureClick}
              >
                <p>{lecture.name} </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

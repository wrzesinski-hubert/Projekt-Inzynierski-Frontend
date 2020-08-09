import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Input } from "@material-ui/core";
import "./index.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { LecturesContext } from "../../../businesslogic/LecturesProvider";
import { Lecture } from "../../../businesslogic/types/lecture";
import { Group } from "../../../businesslogic/types/group";

interface LectureData {
  name: string;
  id: number;
}

export const Results: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [lecturesData, setLecturesData] = useState<Array<LectureData>>([]);
  const [filteredLecturesData, setFilteredLecturesData] = useState<
    Array<LectureData>
  >([]);
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
      const results = await axios.get(`http://localhost:1287/getCourses?name=`);
      const lecturesData = results.data.map(
        (result: { id: number; name: string }) => ({
          id: result.id,
          name: result.name,
        })
      );

      setLecturesData(lecturesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const names = lecturesContext.lectures.map((lecture) => lecture.name);
    const filterLectures = (value: string) => {
      let filteredLectures = lecturesData.filter((lecture) =>
        lecture.name.toLowerCase().includes(value.toLowerCase()) &&  !names.includes(lecture.name)
      );
      setFilteredLecturesData(filteredLectures);
    };
    filterLectures(input);
  }, [input, open]);

  const getLecturesById = async (id: string) => {
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

    let groups: Array<Group> = [];
    let lecture = { groups: groups } as Lecture;
    lecture.id = result[0].course.id;
    lecture.name = result[0].course.name;
    for (let i = 0; i < result.length; i++) {
      let group = {} as Group;
      group.id = result[i].id;
      group.day = result[i].day;
      group.time = result[i].time;
      group.lecturer =
        result[i].lecturer.title +
        " " +
        result[i].lecturer.name +
        " " +
        result[i].lecturer.surname;
      group.room = result[i].room.trim();
      lecture.groups.push(group);
    }

    lecturesContext.addLecture(lecture);
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
            {filteredLecturesData.map((lecture, index) => (
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

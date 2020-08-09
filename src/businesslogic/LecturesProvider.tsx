import React, { useState } from "react";
import { Lecture } from "./types/lecture";
import { Group } from "./types/group";
interface ILectureContext {
  lectures: Array<Lecture>;
  addLecture: (lectures: Lecture) => void;
}
export const LecturesContext = React.createContext({
  lectures: Array<Lecture>(),
  choosenGroups: Array<Group>(),
  addLecture: (lecture: Lecture) => {},
  addGroup: (group : Group) => {}
});

export const LecturesProvider: React.FC = (props) => {
  const [lectures, setLectures] = useState<Array<Lecture>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);
  const addLecture = (lecture: Lecture) => {
    setLectures([...lectures, lecture]);
  };
  const addGroup = (group : Group) => {
    setChoosenGroups([...choosenGroups, group]);
  };


  return (
    <LecturesContext.Provider
      value={{ lectures, choosenGroups, addLecture, addGroup }}
    >
      {props.children}
    </LecturesContext.Provider>
  );
};

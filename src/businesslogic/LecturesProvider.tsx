import React, { useState, useEffect } from "react";
import { lectures } from "./mockData/lectures";
import { Lecture } from "./types/lecture";
import { Group } from "./types/group";
interface ILectureContext {
  lectures: Array<Lecture>;
  updateLectures: (lectures: Lecture) => void;
}
export const LecturesContext = React.createContext({
  lectures: Array<Lecture>(),
  choosenGroups: Array<Group>(),
  updateLectures: (lecture: Lecture) => {},
  updateGroups: (group : Group) => {}
});

export const LecturesProvider: React.FC = (props) => {
  const [lectures, setLectures] = useState<Array<Lecture>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);
  const updateLectures = (lecture: Lecture) => {
    setLectures([...lectures, lecture]);
  };
  const updateGroups = (group : Group) => {
    setChoosenGroups([...choosenGroups, group]);
  };


  useEffect(()=>{console.log(`Groups have changed: ${JSON.stringify(choosenGroups)}`)},[choosenGroups]);

  return (
    <LecturesContext.Provider
      value={{ lectures, choosenGroups, updateLectures, updateGroups }}
    >
      {props.children}
    </LecturesContext.Provider>
  );
};

import React, { useState } from "react";
import { lectures } from "./mockData/lectures";
import { Lecture } from "./types/lecture";

interface ILectureContext {
  lectures: Array<Lecture>;
  updateLectures: (lectures: Lecture) => void;
}
export const LecturesContext = React.createContext({
  lectures: Array<Lecture>(),
  updateLectures: (lectures: Lecture) => {},
});

export const LecturesProvider: React.FC = (props) => {
  const [lectures, setLectures] = useState<Array<Lecture>>([]);

  const updateLectures = (lecture: Lecture) => {
    setLectures([...lectures, lecture]);
  };

  return (
    <LecturesContext.Provider
      value={{ lectures: lectures, updateLectures: updateLectures }}
    >
      {props.children}
    </LecturesContext.Provider>
  );
};

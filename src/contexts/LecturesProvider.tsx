import React, { useState, createContext } from 'react';
import { Lecture, Group } from '../types';

interface LectureContext {
  lectures: Array<Lecture>;
  choosenGroups: Array<Group>;
  addLecture: (lectures: Lecture) => void;
  addGroup: (group: Group) => void;
}
export const LecturesContext = createContext<LectureContext | null>(null);

interface LecturesProviderProps {
  children: React.ReactNode;
}

export const LecturesProvider = ({ children }: LecturesProviderProps) => {
  const [lectures, setLectures] = useState<Array<Lecture>>([]);
  const [choosenGroups, setChoosenGroups] = useState<Array<Group>>([]);

  const addLecture = (lecture: Lecture) => {
    setLectures([...lectures, lecture]);
  };
  const addGroup = (group: Group) => {
    setChoosenGroups([...choosenGroups, group]);
  };

  return (
    <LecturesContext.Provider value={{ lectures, choosenGroups, addLecture, addGroup }}>
      {children}
    </LecturesContext.Provider>
  );
};

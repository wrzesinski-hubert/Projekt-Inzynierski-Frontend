export interface Group {
  id: string;
  day: string;
  time: string;
  lecturer: string;
  room: string;
}
export interface Lecture {
  id?: number;
  name: string;
  groups: Array<Group>;
}
export interface LectureInit {
  name: string;
  id: number;
}
export interface User {
  name?: string;
  surname?: string;
  ticket: string | null;
}

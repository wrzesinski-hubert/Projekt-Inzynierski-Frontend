const COURSE = 'course';
const CLASS = 'class';

export type GroupType = typeof COURSE | typeof CLASS;

export interface CourseBasket {
  id: number;
  name: string;
  lecture: Group | null;
  class: Group | null;
}

export interface Group {
  id: number;
  day: number;
  time: string;
  lecturer: string;
  room: string;
  type: GroupType;
  capacity?: number;
}

export interface Course {
  id: number;
  name: string;
  groups: Array<Group>;
}

export interface User {
  name?: string;
  surname?: string;
  ticket: string | null;
}

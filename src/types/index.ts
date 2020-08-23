export enum GroupType {
  LECTURE = 'LECTURE',
  CLASS = 'CLASS',
}

export interface Basket {
  id: number;
  name: string;
  lecture: Group | null;
  classes: Group | null;
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

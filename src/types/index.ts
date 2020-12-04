export enum GroupType {
  LECTURE = 'LECTURE',
  CLASS = 'CLASS',
}

export interface Basket {
  id: number;
  name: string;
  lecture?: Group;
  classes?: Group;
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
  lectures?: Array<Group>;
  classes?: Array<Group>;
}

export interface User {
  email: string;
  id: number;
  name: string;
  surname: string;
}

export interface SchedulerEvent {
  id: number;
  day: number;
  time: [string, string];
  lecturer: string;
  room: string;
  type: GroupType;
  capacity?: number;
  name: string;
}

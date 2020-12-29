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
  endTime: string;
  lecturer: string;
  room: string;
  type: GroupType;
  capacity?: number;
  takenPlaces: number;
}

export interface Course {
  id: number;
  name: string;
  lectures?: Array<Group>;
  classes?: Array<Group>;
}

export interface LoggedUser {
  authorityRole: string;
  email: string;
  id: number;
}

export interface Student {
  email: string;
  id: number;
  name: string;
  surname: string;
}

export interface SchedulerEvent {
  id: number;
  day: number;
  time: string;
  endTime: string;
  lecturer: string;
  room: string;
  type: GroupType;
  capacity?: number;
  takenPlaces: number;
  name: string;
}

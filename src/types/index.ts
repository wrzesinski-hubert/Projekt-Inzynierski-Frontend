export enum GroupType {
  course = 'course',
  CLASS = 'class',
}

export interface Group {
  id: number;
  day: number;
  time: string;
  lecturer: string;
  room: string;
  groupType: GroupType;
  capacity?: number;
}

export interface Course {
  id: number;
  name: string;
  groups: Array<Group>;
}
export interface courseInit {
  name: string;
  id: number;
}
export interface User {
  name?: string;
  surname?: string;
  ticket: string | null;
}

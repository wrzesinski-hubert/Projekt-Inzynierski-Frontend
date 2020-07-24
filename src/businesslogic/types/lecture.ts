import { Group } from "./group";

export interface Lecture {
  id?: number;
  name: string;
  groups: Array<Group>;
}

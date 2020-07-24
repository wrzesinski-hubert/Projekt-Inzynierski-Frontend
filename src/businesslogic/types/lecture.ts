import { Group } from "./group";

export interface Lecture {
  name: string;
  groups: Array<Group>;
}

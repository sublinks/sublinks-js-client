
import type { ModAdd } from "./ModAdd";
import type { Person } from "./Person";

export interface ModAddView {
  mod_add: ModAdd;
  moderator?: Person;
  modded_person: Person;
}

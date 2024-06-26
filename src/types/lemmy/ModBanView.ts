
import type { ModBan } from "./ModBan";
import type { Person } from "./Person";

export interface ModBanView {
  mod_ban: ModBan;
  moderator?: Person;
  banned_person: Person;
}

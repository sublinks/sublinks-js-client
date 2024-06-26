
import type { PersonId } from "./PersonId";

export interface ModBan {
  id: number;
  mod_person_id: PersonId;
  other_person_id: PersonId;
  reason?: string;
  banned: boolean;
  expires?: string;
  when_: string;
}

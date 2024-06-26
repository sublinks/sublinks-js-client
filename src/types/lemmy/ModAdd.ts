
import type { PersonId } from "./PersonId";

export interface ModAdd {
  id: number;
  mod_person_id: PersonId;
  other_person_id: PersonId;
  removed: boolean;
  when_: string;
}

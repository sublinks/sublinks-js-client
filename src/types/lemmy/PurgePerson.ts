
import type { PersonId } from "./PersonId";

export interface PurgePerson {
  person_id: PersonId;
  reason?: string;
}


import type { PersonId } from "./PersonId";

export interface AddAdmin {
  person_id: PersonId;
  added: boolean;
}

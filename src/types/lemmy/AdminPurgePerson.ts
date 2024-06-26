
import type { PersonId } from "./PersonId";

export interface AdminPurgePerson {
  id: number;
  admin_person_id: PersonId;
  reason?: string;
  when_: string;
}

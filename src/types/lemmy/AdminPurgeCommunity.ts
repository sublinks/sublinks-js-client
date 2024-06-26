
import type { PersonId } from "./PersonId";

export interface AdminPurgeCommunity {
  id: number;
  admin_person_id: PersonId;
  reason?: string;
  when_: string;
}

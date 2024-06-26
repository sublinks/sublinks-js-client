
import type { PersonId } from "./PersonId";

export interface BanPerson {
  person_id: PersonId;
  ban: boolean;
  remove_data?: boolean;
  reason?: string;
  expires?: /* integer */ number;
}

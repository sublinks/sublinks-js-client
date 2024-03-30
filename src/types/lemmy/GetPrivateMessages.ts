
import type { PersonId } from "./PersonId";

export interface GetPrivateMessages {
  unread_only?: boolean;
  page?: /* integer */ number;
  limit?: /* integer */ number;
  creator_id?: PersonId;
}

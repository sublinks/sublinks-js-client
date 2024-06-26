
import type { PersonId } from "./PersonId";

export interface CreatePrivateMessage {
  content: string;
  recipient_id: PersonId;
}

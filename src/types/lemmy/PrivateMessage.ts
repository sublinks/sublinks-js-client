
import type { PersonId } from "./PersonId";
import type { PrivateMessageId } from "./PrivateMessageId";

export interface PrivateMessage {
  id: PrivateMessageId;
  creator_id: PersonId;
  recipient_id: PersonId;
  content: string;
  deleted: boolean;
  read: boolean;
  published: string;
  updated?: string;
  ap_id: string;
  local: boolean;
}

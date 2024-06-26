
import type { PersonMentionId } from "./PersonMentionId";

export interface MarkPersonMentionAsRead {
  person_mention_id: PersonMentionId;
  read: boolean;
}

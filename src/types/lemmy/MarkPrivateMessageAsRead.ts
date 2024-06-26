
import type { PrivateMessageId } from "./PrivateMessageId";

export interface MarkPrivateMessageAsRead {
  private_message_id: PrivateMessageId;
  read: boolean;
}

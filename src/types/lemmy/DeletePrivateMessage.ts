
import type { PrivateMessageId } from "./PrivateMessageId";

export interface DeletePrivateMessage {
  private_message_id: PrivateMessageId;
  deleted: boolean;
}


import type { PrivateMessageId } from "./PrivateMessageId";

export interface EditPrivateMessage {
  private_message_id: PrivateMessageId;
  content: string;
}

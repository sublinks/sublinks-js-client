
import type { PrivateMessageId } from "./PrivateMessageId";

export interface CreatePrivateMessageReport {
  private_message_id: PrivateMessageId;
  reason: string;
}

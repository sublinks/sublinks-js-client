import type { PrivateMessageView } from "./PrivateMessageView";

export interface PrivateMessagesResponse {
  private_messages: Array<PrivateMessageView>,
  error?: string,
  message?: string,
}

import type { PrivateMessageView } from "./PrivateMessageView";

export interface PrivateMessagesResponse {
  private_messages: Array<PrivateMessageView>,
  errors?: string[],
  message?: string,
}

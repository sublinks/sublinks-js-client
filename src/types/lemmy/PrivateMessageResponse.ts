import type { PrivateMessageView } from "./PrivateMessageView";

export interface PrivateMessageResponse {
  private_message_view: PrivateMessageView,
  error?: string,
  message?: string,
}

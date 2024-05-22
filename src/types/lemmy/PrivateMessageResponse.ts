import type { PrivateMessageView } from "./PrivateMessageView";

export interface PrivateMessageResponse {
  private_message_view: PrivateMessageView,
  errors?: string[],
  message?: string,
  status?: string,
}

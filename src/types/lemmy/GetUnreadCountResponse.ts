export interface GetUnreadCountResponse {
  replies: /* integer */ number,
  mentions: /* integer */ number,
  private_messages: /* integer */ number,
  error?: string,
  message?: string,
}


import type { CommentReplyView } from "./CommentReplyView";

export interface CommentReplyResponse {
  comment_reply_view: CommentReplyView,
  errors?: string[],
  message?: string,
  status?: string,
}

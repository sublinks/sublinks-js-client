
import type { CommentReplyId } from "./CommentReplyId";

export interface MarkCommentReplyAsRead {
  comment_reply_id: CommentReplyId;
  read: boolean;
}

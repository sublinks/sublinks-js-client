
import type { CommentId } from "./CommentId";
import type { CommentReplyId } from "./CommentReplyId";
import type { PersonId } from "./PersonId";

export interface CommentReply {
  id: CommentReplyId;
  recipient_id: PersonId;
  comment_id: CommentId;
  read: boolean;
  published: string;
}

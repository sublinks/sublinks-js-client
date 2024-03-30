
import type { CommentId } from "./CommentId";

export interface ListCommentLikes {
  comment_id: CommentId;
  page?: /* integer */ number;
  limit?: /* integer */ number;
}

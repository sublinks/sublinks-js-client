
import type { CommentId } from "./CommentId";

export interface CreateCommentLike {
  comment_id: CommentId;
  score: number;
}

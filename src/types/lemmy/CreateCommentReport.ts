
import type { CommentId } from "./CommentId";

export interface CreateCommentReport {
  comment_id: CommentId;
  reason: string;
}

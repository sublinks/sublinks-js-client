
import type { CommentId } from "./CommentId";

export interface PurgeComment {
  comment_id: CommentId;
  reason?: string;
}

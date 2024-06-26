
import type { CommentId } from "./CommentId";

export interface RemoveComment {
  comment_id: CommentId;
  removed: boolean;
  reason?: string;
}

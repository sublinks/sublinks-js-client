
import type { CommentId } from "./CommentId";

export interface DeleteComment {
  comment_id: CommentId;
  deleted: boolean;
}

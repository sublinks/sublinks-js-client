
import type { CommentId } from "./CommentId";

export interface SaveComment {
  comment_id: CommentId;
  save: boolean;
}

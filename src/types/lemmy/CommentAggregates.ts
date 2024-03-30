
import type { CommentId } from "./CommentId";

export interface CommentAggregates {
  comment_id: CommentId;
  score: /* integer */ number;
  upvotes: /* integer */ number;
  downvotes: /* integer */ number;
  published: string;
  child_count: number;
}

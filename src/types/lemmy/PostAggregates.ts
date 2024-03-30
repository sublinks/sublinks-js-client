
import type { PostId } from "./PostId";

export interface PostAggregates {
  post_id: PostId;
  comments: /* integer */ number;
  score: /* integer */ number;
  upvotes: /* integer */ number;
  downvotes: /* integer */ number;
  published: string;
  newest_comment_time: string;
}

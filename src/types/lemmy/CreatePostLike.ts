
import type { PostId } from "./PostId";

export interface CreatePostLike {
  post_id: PostId;
  score: number;
}

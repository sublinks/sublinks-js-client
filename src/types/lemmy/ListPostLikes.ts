
import type { PostId } from "./PostId";

export interface ListPostLikes {
  post_id: PostId;
  page?: /* integer */ number;
  limit?: /* integer */ number;
}

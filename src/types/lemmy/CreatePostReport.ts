
import type { PostId } from "./PostId";

export interface CreatePostReport {
  post_id: PostId;
  reason: string;
}

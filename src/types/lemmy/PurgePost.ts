
import type { PostId } from "./PostId";

export interface PurgePost {
  post_id: PostId;
  reason?: string;
}

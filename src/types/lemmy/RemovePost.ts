
import type { PostId } from "./PostId";

export interface RemovePost {
  post_id: PostId;
  removed: boolean;
  reason?: string;
}


import type { PostId } from "./PostId";

export interface LockPost {
  post_id: PostId;
  locked: boolean;
}

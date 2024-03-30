
import type { PostId } from "./PostId";

export interface MarkPostAsRead {
  post_ids: Array<PostId>;
  read: boolean;
}
